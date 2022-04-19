#!/usr/bin/env python

from std_msgs.msg import Float32
from std_msgs.msg import String
from std_srvs.srv import SetBool,SetBoolResponse
import rospy


class LoadSensor(object):

    def __init__(self):
        # % of flutiations acceptable based on empirical experiments, but divided by 100
        # Calibrated, values flutuated max 221gr and min -5gr, of a load of 987gr, so around 22.0%
        self.max_load_delta = 5.0
        self.min_load_delta = 0.2
        self._load_value = 0.0
        self._tare = 0.0
        self._load_error_allowed = 10.0 # grams
        self._carrying_object = False
        rospy.Subscriber("/load_sensor", Float32, self.callback)
        s = rospy.Service('/load_sensor_calibrate_server', SetBool, self.calibrate_callback)
        self._pub = rospy.Publisher('/load_sensor_info', String, queue_size=1)
        self._pub_load_sensor_tared = rospy.Publisher('/load_sensor_tared', Float32, queue_size=1)

    def callback(self, msg):
        if self._carrying_object:
            self._load_value = msg.data - self._tare
        else:
            self._load_value = msg.data

        rospy.logdebug("Object="+str(self._carrying_object)+",Weight on Tray==>"+str(self._load_value))
        load_tared = Float32()
        load_tared.data = self._load_value
        self._pub_load_sensor_tared.publish(load_tared)

    def calibrate_callback(self, req):

        rospy.logdebug("Request of Load Sensor Calibration Received..Processing")
        self.calibrate(adding_object=req.data)
        rospy.logdebug("Load Sensor Calibration  complete!")
        response = SetBoolResponse()
        response.success = True
        response.message = "Calibration "+str(self._carrying_object)+" to weight="+str(self._tare)
        return response

    def get_load_value(self):
        return self._load_value

    def calibrate(self, adding_object=False):
        """
        Stores the current weight and untill called adding_object = False it will
        remove that value from the original readings
        :return:
        """
        if adding_object:
            rospy.logerr("Adding Object...Calibrating...")
            # We first have to set self._carrying_object to false to avoid reading
            # previously tared values
            self._carrying_object = False
            # Noe we read the values as they are
            self._tare = self.get_load_value()
        else:
            rospy.logerr("RESETING...Calibrating...")
            self._tare = 0.0

        rospy.logerr("Tare Value ==" + str(self._tare))
        self._carrying_object = adding_object

    def publish_load_info(self):
        """
        Publishes if we picked an object and its weight.
        It also evaluates if the object has been lost or
        something extra was added.
        Its very important that it averages reading because by movements and
        so on the weight may vary a lot.
        :return:
        """

        current_load = self.get_load_value()
        # In max and min we consider current load calibrated,
        #  so around 0.0 + self._load_error_allowed and 0.0 - self._load_error_allowed
        # Max load from which we consider some extra object has been added that shouldnt be there
        max_load = (self._tare - self._load_error_allowed)*self.max_load_delta
        # Min load from which we consider some carried object has been added removed
        min_load = (-1*self._tare + self._load_error_allowed)*self.min_load_delta
        rospy.logdebug("CurrentLoad="+str(current_load)+"MAX="+str(max_load)+",MIN="+str(min_load))
        if self._carrying_object:
            if current_load > (max_load):
                # Something extra has been added
                info_msg = "Extra Object was Added,0"
            elif current_load < (min_load):
                # The Object was removed
                info_msg = "Object was removed,1"
            else:
                # It has a calibrated object on top
                info_msg = "Object loaded,2"
        else:
            if abs(current_load) > self._load_error_allowed:
                # The Loade sensor needs a calibration
                info_msg = "Detected Object or Load Sensor needs a calibration through ARDUINO/SimDriver calibration program,3"
            else:
                # The Loading tray is empty
                info_msg = "Loading tray empty,4"

        self._pub.publish(info_msg)


    def start_loop_load_info(self):

        rate = rospy.Rate(2)
        while not rospy.is_shutdown():
            self.publish_load_info()
            rate.sleep()



def load_value_test():
    rospy.init_node('load_value_test_node', log_level=rospy.WARN)
    load_sensor_obj = LoadSensor()
    load_sensor_obj.start_loop_load_info()

if __name__ == "__main__":
    load_value_test()