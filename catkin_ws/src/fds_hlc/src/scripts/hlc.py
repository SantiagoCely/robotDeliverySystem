#!/usr/bin/env python

import rospy
from data_manager import DatabaseClass
from std_srvs.srv import SetBool, SetBoolRequest
from save_waypoint import SaveWaypointClass
import actionlib
from actionlib_msgs.msg import *
from move_base_msgs.msg import MoveBaseAction, MoveBaseGoal
from actionlib_msgs.msg import GoalStatus
from actionlib.msg import TestFeedback, TestResult, TestAction
from geometry_msgs.msg import Pose
from gazebo_msgs.srv import SpawnModel, SpawnModelRequest, SpawnModelResponse
from gazebo_msgs.srv import GetModelState, GetModelStateRequest, GetModelStateResponse
import time
from std_msgs.msg import String, UInt8

food_items = {"HKmPa5WhxT8pxS1pvSat": "plastic_cup",
              "Jt8mb5V7p9ZGaDFhTeZV": "bowl",
              "MvMFYPpJFQa3Z3jsEiIQ": "bowl",
              "NZGeqAayLIv3654VKaD4": "bowl",
              "OX7lyWo4DJVjaa3Ee3mu": "standard_apple",
              "cTDbGUEG6VRG9POjjkQe": "bowl",
              "ikWwiUG7a0X0agRjgTGz": "bowl",
              "poXYmb2WjlucPDHkGvUP": "plastic_cup"}


class SpawnDelete(object):
    def __init__(self):
        rospy.logwarn("Waiting for /spawndelete_models_server...")
        rospy.wait_for_service('/spawndelete_models_server')
        rospy.logwarn("Waiting for /spawndelete_models_server...READY")
        # To acll the server that manages spawn and delete
        self._spawndelete_client = rospy.ServiceProxy(
            '/spawndelete_models_server', SpawnModel)

        # To know the exact position of the barista model to spawn the object just on top
        # This is needed because navigation is not exact, the robot wont stop everytime in the same place
        self._model_client = rospy.ServiceProxy(
            '/gazebo/get_model_state', GetModelState)

        self._z_height_spawn = 0.7

        self.pose = Pose()
        self.pose.position.x = 0.0
        self.pose.position.y = 0.0
        self.pose.position.z = self._z_height_spawn

    def get_current_robot_pose(self, robot_name="fds", relative_entity_name="world"):

        request = GetModelStateRequest()
        request.model_name = robot_name
        request.relative_entity_name = relative_entity_name
        response = self._model_client(request)

        return response.success, response.status_message, response.pose

    def update_object_pose_dict(self):
        """
        It updates the objects poses with the current robots position
        :return:
        """

        result_ok, msg, robot_pose = self.get_current_robot_pose()

        self.pose = Pose()
        self.pose.position.x = robot_pose.position.x
        self.pose.position.y = robot_pose.position.y
        self.pose.position.z = self._z_height_spawn

    def spawn_object(self, id):

        request = SpawnModelRequest()
        response = SpawnModelResponse()
        response.success = False
        response.status_message = "No Object in list"
        request.robot_namespace = "SPAWN"

        model_name = food_items[id]
        rospy.logdebug("Spawning object Manager ==>"+str(model_name))
        request.model_name = model_name
        self.update_object_pose_dict()
        request.initial_pose = self.pose
        request.reference_frame = "models"
        request.model_xml = "fds_menu_spawn"
        response = self._spawndelete_client(request)

        return response.success, response.status_message

    def delete_object(self, id):

        request = SpawnModelRequest()
        request.robot_namespace = "DELETE"
        delete_ok = True
        delete_msg = ""
        model_name = food_items[id]
        rospy.logdebug("Deleting object MODEL==>" + str(model_name))
        request.model_name = model_name
        request.initial_pose = self.pose
        response = self._spawndelete_client(request)

        delete_ok = delete_ok and response.success
        delete_msg += "Model="+str(model_name) + \
            ", MSG="+str(response.status_message)

        return delete_ok, delete_msg


class LoadSensor(object):
    def __init__(self):
        service_name = '/load_sensor_calibrate_server'
        rospy.logwarn("Waiting for "+service_name+"...")
        rospy.wait_for_service(service_name)
        rospy.logwarn("Waiting for "+service_name+"...READY")
        self._spawndelete_client = rospy.ServiceProxy(service_name, SetBool)

    def _update_newest_load_sensor_info(self):
        """

        :return: loadsensor_info_id
        Extra Object was Added,0
        Object was removed,1
        Object loaded,2
        Load Sensor needs a calibration through ARDUINO calibration program,3
        Loading tray empty,4
        """
        rospy.logdebug("Getting Newest Load Sensor Info")
        self.load_sensor_info = None
        self.loadsensor_info_topic_name = "/load_sensor_info"

        while self.load_sensor_info is None and not rospy.is_shutdown():
            try:
                self.load_sensor_info = rospy.wait_for_message(self.loadsensor_info_topic_name,
                                                               String,
                                                               timeout=1.0)
            except:
                rospy.logerr(
                    "Current "+self.loadsensor_info_topic_name+" not ready yet, retrying...")

        rospy.logdebug("Getting Newest Load Sensor Info..DONE")
        loadsensor_info_data = self.load_sensor_info.data
        loadsensor_info_list = loadsensor_info_data.split(",")

        rospy.logdebug("loadsensor_info_list==>" + str(loadsensor_info_list))

        loadsensor_info_msg = loadsensor_info_list[0]
        loadsensor_info_id = int(loadsensor_info_list[1])
        return loadsensor_info_id, loadsensor_info_msg

    def calibrate(self):
        """
        Calibrate for object on top
        :return:
        """
        request = SetBoolRequest()
        request.data = True
        response = self._spawndelete_client(request)
        return response.success, response.message

    def reset(self):
        """
        Reset to Original no objects value
        :return:
        """
        request = SetBoolRequest()
        request.data = False
        response = self._spawndelete_client(request)
        return response.success, response.message

    def check_load_ok(self):
        """
        Special fucntion to check that the object loaded is ok
        This means that from these messages, only the index 2 is
        accepted.
        "Extra Object was Added,0"
        "Object was removed,1"
        "Object loaded,2"
        :return:
        """
        id, msg = self._update_newest_load_sensor_info()
        return id == 2, msg


class MoveRobot(object):
    def __init__(self, loadsensor_obj):
        self._move_max_time = 60.0
        self.loadsensor_obj = loadsensor_obj

        self._table_waypoints_object = SaveWaypointClass(init_check_for_waypoints=False, new_markers=True)
        rospy.loginfo('Done Loading Waypoints')
        rospy.logdebug(str(self._table_waypoints_object.get_waypoint_dict()))

        self.move_base = actionlib.SimpleActionClient(
            "move_base", MoveBaseAction)
        rospy.loginfo("Waiting for move_base action server...")

        # Wait 60 seconds for the action server to become available
        self.move_base.wait_for_server(rospy.Duration(60))

        self.init_move_to_table_action_server()

        rospy.loginfo("Connected to move base server")

    def init_move_to_table_action_server(self):
        """
        Initialises the action server and all its variables
        :return:
        """
        self.reset_as_vars()
        self._as_move_ok = True
        self._as_move_msg = ""

        self._feedback = TestFeedback()
        self._result = TestResult()
        self._as = actionlib.SimpleActionServer(
            "/move_to_table_as", TestAction, self.move_to_table_goal_callback, False)
        self._as.start()

    def reset_as_vars(self):
        self._as_flag_check_load_ok = True
        self._as_flag_talk = False
        self._NOTABLE = "NO-TABLE"
        self.table_to_go = self._NOTABLE

    def get_waypoints_list(self):
        waypoints_dict = self._table_waypoints_object.get_waypoint_dict()
        return list(waypoints_dict.keys())

    def move_to_table_goal_callback(self, move_to_table_goal):
        waypoints_list = self.get_waypoints_list()
        table_name = "T" + str(move_to_table_goal.goal)
        flag_check_load_ok = self._as_flag_check_load_ok

        if table_name in waypoints_list:
            self_table_to_go = table_name
            rospy.loginfo("Received Commad: Go to Table " +
                          str(self.table_to_go))

            table_waypoint = self._table_waypoints_object.get_waypoint_dict().get(
                self.table_to_go, "none")
            rospy.logdebug("Found Table " + str(table_name) +
                           ",P=" + str(table_waypoint))

            # Initialize the waypoint goal
            goal = MoveBaseGoal()
            goal.target_pose.header.frame_id = 'map'
            goal.target_pose.header.stamp = rospy.Time.now()

            percentage_path_done = 0

            self._feedback.feedback = percentage_path_done
            self._as.publish_feedback(self._feedback)

            self._feedback.feedback = percentage_path_done
            self._as.publish_feedback(self._feedback)

            # Send the goal pose to the MoveBaseAction server
            self.move_base.send_goal(goal)

            # Allow 1 minute to get there
            # finished_within_time = self.move_base.wait_for_result(rospy.Duration(60))
            state_result = self.move_base.get_state()
            move_rate = rospy.Rate(20)
            rospy.loginfo("state_result: " + str(state_result))
            init_time = rospy.get_time()
            time_moving = 0
            while state_result <= GoalStatus.ACTIVE and time_moving <= self._move_max_time:
                rospy.logdebug("Moving...Checking Load and Talking....")

                if self._as.is_preempt_requested() or rospy.is_shutdown():
                    rospy.loginfo('The goal has been cancelled/preempted')
                    # the following line, sets the client in preempted state (goal cancelled)
                    self._as.set_preempted()
                    break

                if flag_check_load_ok:
                    load_ok, load_msg = self.loadsensor_obj.check_load_ok()
                    if not load_ok:
                        msg = "CHECK LOAD WHILE MOVING ERROR..." + load_msg
                        rospy.logerr(msg)
                        self.move_base.cancel_goal()
                        self._as.set_preempted()
                        break

                percentage_path_done = int(
                    (time_moving / self._move_max_time) * 100)
                self._feedback.feedback = percentage_path_done
                self._as.publish_feedback(self._feedback)

                move_rate.sleep()
                state_result = self.move_base.get_state()
                rospy.logdebug("state_result: " + str(state_result))
                now_time = rospy.get_time()
                time_moving = now_time - init_time

            # If we don't get there in time, abort the goal
            finished_within_time = time_moving < self._move_max_time

            if not finished_within_time:
                self.move_base.cancel_goal()
                msg = "Timed out achieving goal"
                rospy.loginfo(msg)
                self._as.set_preempted()
                self._as_move_ok = False
                self._as_move_msg = msg
            else:
                # We made it! But Ok, or something happened?
                if state_result == GoalStatus.SUCCEEDED:
                    self._result.result = 100
                    msg = 'Goal succeeded!, Percentage Path Done' + \
                        str(self._result.result)
                    rospy.loginfo(msg)
                    self._as.set_succeeded(self._result)
                    self._as_move_ok = True
                    self._as_move_msg = msg
                else:
                    msg = "Move DIDN'T succeed..."
                    rospy.logerr(msg)
                    self.move_base.cancel_goal()
                    self._as.set_preempted()
                    self._as_move_ok = False
                    self._as_move_msg = msg
        else:
            msg = "TABLE=" + str(table_name) + \
                ", NOT FOUND in ==>>" + str(waypoints_list)
            rospy.logerr(msg)
            self.table_to_go = self._NOTABLE
            self._as.set_preempted()
            self._as_move_ok = False
            self._as_move_msg = msg

        self.reset_as_vars()
    def move_to_waypoint(self, table_name, flag_check_load_ok=True, flag_talk=False, flag_as=False):

        # We retrieve waypoint of the table_name given
        table_waypoint_dict = self._table_waypoints_object.get_waypoint_dict()
        if table_name in table_waypoint_dict.keys():
            rospy.loginfo("Found "+table_name+"table Waypoint")
            table_waypoint = table_waypoint_dict.get(table_name, "none")
            rospy.logdebug("Table "+str(table_name)+",P="+str(table_waypoint))
        else:
            error_msgs = "Table "+str(table_name)+" is NOT in Database =>"+str(self._table_waypoints_object)
            rospy.logerr(error_msgs)
            return False, error_msgs

        # Intialize the waypoint goal
        goal = MoveBaseGoal()

        goal.target_pose.header.frame_id = 'map'
        goal.target_pose.header.stamp = rospy.Time.now()
        goal.target_pose.pose = table_waypoint.pose
        move_final_result, msg = self.move(goal, flag_check_load_ok, flag_talk)

        return move_final_result, msg

    def move(self, goal, flag_check_load_ok, flag_talk):

        # Send the goal pose to the MoveBaseAction server
        self.move_base.send_goal(goal)

        # Allow 1 minute to get there
        #finished_within_time = self.move_base.wait_for_result(rospy.Duration(60))
        state_result = self.move_base.get_state()
        move_rate = rospy.Rate(20)
        rospy.loginfo("state_result: " + str(state_result))
        init_time = rospy.get_time()
        time_moving = 0
        while state_result <= GoalStatus.ACTIVE and time_moving <= self._move_max_time:
            rospy.logdebug("Moving...Checking Load and Talking....")
            if flag_check_load_ok:
                load_ok, load_msg = self.loadsensor_obj.check_load_ok()
                if not load_ok:
                    msg = "CHECK LOAD WHILE MOVING ERROR..." + load_msg
                    rospy.logerr(msg)
                    self.move_base.cancel_goal()
                    break
            

            move_rate.sleep()
            state_result = self.move_base.get_state()
            rospy.logdebug("state_result: " + str(state_result))
            now_time = rospy.get_time()
            time_moving = now_time - init_time
         # If we don't get there in time, abort the goal
        finished_within_time = time_moving < self._move_max_time

        move_final_result = True
        if not finished_within_time:
            self.move_base.cancel_goal()
            move_final_result = False
            msg = "Timed out achieving goal"
            rospy.loginfo(msg)
        else:
            # We made it! But Ok, or something happened?
            if state_result == GoalStatus.SUCCEEDED:
                msg = "Goal succeeded!"
                rospy.loginfo(msg)
            else:
                msg = "Move DIDN'T succeed..."
                rospy.logerr(msg)
                self.move_base.cancel_goal()
                move_final_result = False

        return move_final_result, msg

def go_to_kitchen(move_robot_obj):
    rospy.loginfo("Moving To Kitchen...")
    move_robot_obj.move_to_waypoint(table_name="K0",flag_check_load_ok=False)
    rospy.loginfo("Moving To Kitchen...Done")
def go_to_table(move_robot_obj, table_num):
    rospy.loginfo("Moving To Table"+ str(table_num)+ "...")
    move_robot_obj.move_to_waypoint(table_name="T"+str(table_num),flag_check_load_ok=False)
    rospy.loginfo("Moving To Table"+ str(table_num)+ "...DONE")
def go_to_charging_station(move_robot_obj):
    rospy.loginfo("Moving To Charging Station ...")
    move_robot_obj.move_to_waypoint(table_name="C0",flag_check_load_ok=False)
    rospy.loginfo("Moving To Charging Station ...Done")

def calibrate_common(load_sensor_obj, rate, data_id):
    while not rospy.is_shutdown():
        idx, msg= load_sensor_obj._update_newest_load_sensor_info()
        rospy.loginfo("Msg="+ str(msg) + ",Id="+ str(idx))
        rate.sleep()
        if idx==data_id:
            break
def calibrate_tray_load(load_sensor_obj, rate):

    #Check that the tray needs calibration
    calibrate_common(load_sensor_obj, rate, 3)

    #Calibrate tray
    ok, message = load_sensor_obj.calibrate()
    if not ok:
        rospy.logerr("Error in Calibration="+str(message))
        assert True, "Error In Calibration"
    rospy.logerr("Result Calibration=" + str(ok)+", msg="+str(message))

    #Check that the object was loaded
    calibrate_common(load_sensor_obj, rate, 2)


def calibrate_tray_delete(load_sensor_obj,rate):

    calibrate_common(load_sensor_obj, rate, 3)
    ok, message = load_sensor_obj.reset()
    if not ok:
        rospy.logerr("Error in Calibration="+str(message))
        assert True, "Error In Calibration"



def wait_for_100():
    while True:
        pass
def main():
    rospy.init_node("high_level_controller", log_level=rospy.INFO)
    database_obj = DatabaseClass()
    load_sensor_obj = LoadSensor()
    move_robot_obj=MoveRobot(load_sensor_obj)
    spawn_delete_obj = SpawnDelete()
    refresh_rate = 10.0
    rate = rospy.Rate(refresh_rate)
    

    while not rospy.is_shutdown():
        data_id, table_num, food_id = database_obj.get_req()
        rospy.loginfo("Database Loaded...")
        if data_id is not None and food_id is not None : 
            rospy.loginfo("Database Loaded...Food To Table Request")
            go_to_kitchen(move_robot_obj)
            spawn_delete_obj.spawn_object(food_id)
            calibrate_tray_load(load_sensor_obj, rate)
            go_to_table(move_robot_obj, table_num)
            time.sleep(5)
            spawn_delete_obj.delete_object(food_id)
            calibrate_tray_delete(load_sensor_obj, rate)
            database_obj.finished_req(data_id)

        elif data_id is not None and food_id is None: 
            rospy.loginfo("Database Loaded...NLP Request")
            go_to_table(move_robot_obj, table_num)
            database_obj.finished_req(data_id)
            
        else: 
            rospy.loginfo("Database Loaded...Charge Request")
            go_to_charging_station(move_robot_obj)
            wait_for_100()
            

    
    


if __name__ == "__main__":
    main()
