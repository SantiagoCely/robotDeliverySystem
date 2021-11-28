from __future__ import absolute_import
from __future__ import division
from __future__ import print_function

from abc import ABC

import hardware_state
import HighLevelController
import abc
import tensorflow as tf
import numpy as np
import pybullet_data
import pybullet as p
import time
import math
from tf_agents.environments import py_environment
from tf_agents.environments import tf_environment
from tf_agents.environments import tf_py_environment
from tf_agents.environments import utils
from tf_agents.specs import array_spec
from tf_agents.environments import wrappers
from tf_agents.environments import suite_gym
from tf_agents.trajectories import time_step as ts


PATH_TO_TABLE = "./table/table.urdf"
PATH_TO_CUSTOMER = "./tray/tray.urdf"
PATH_TO_ROBOT = "./robotv2.urdf"
PATH_TO_CHARGER = './cube.urdf'
PATH_TO_STAFF = './cube.urdf'
PATH_TO_HOST = './cube.urdf'


class CustomEnv(py_environment.PyEnvironment, ABC):

    def __init__(self, hlc):

        super().__init__()
        self.all_states = {
            "high": 0,
            "low": 1,
            "staff_req": 2,
            "cust_req": 3,
            "host_req": 4,
            "done": 5,
            "collision": 6,
            "recharge_req": 7,

        }
        self.all_actions = {
            "move_left": 0,
            "move_right": 1,
            "move_up": 2,
            "move_down": 3,
            "capture": 4,
            "wait": 5,
            "recharge": 6,
            "accept_req": 7,
        }
        self.all_rewards = {
            "REWARD_WAIT": -3,
            "REWARD_CAPTURE": -3,
            "REWARD_MOVE_UP": -1,
            "REWARD_MOVE_DOWN": -1,
            "REWARD_MOVE_LEFT": -1,
            "REWARD_MOVE_RIGHT": -1,
            "REWARD_COLLISION": -50,
            "REWARD_ACCEPT_R": -1,
            "REWARD_RECHARGE": -1,

        }

        self._p = p
        self._p.connect(self._p.DIRECT)  # no GUI
        self._p.setAdditionalSearchPath(pybullet_data.getDataPath())
        self.plane_id= self._p.loadURDF('plane.urdf')
        self.table_id = []
        startOrientation = p.getQuaternionFromEuler([0, 0, 0])
        for x in range(-5, 5, 2):  # generate table
            for y in range(-5, 5, 2):
                startPos = [y, x, 0]
                f = self._p.loadURDF(PATH_TO_TABLE, startPos, startOrientation)
                self.table_id.append(f)
        startPos = [0, 1, 1]
        self.cust_id = self._p.loadURDF(PATH_TO_CUSTOMER, startPos,
                                          startOrientation)  # generate tray

        self.host_id = self._p.loadURDF(PATH_TO_HOST, startPos,
                                        startOrientation)  # generate cube

        self.staff_id = self._p.loadURDF(PATH_TO_STAFF, startPos,
                                        startOrientation)  # generate cube

        self.charger_id = self._p.loadURDF(PATH_TO_CHARGER, startPos,
                                         startOrientation)  # generate cube
        self._p.setGravity(0, 0, -9.8)
        startPos = [0, 0, 3]
        self.bot_id = self._p.loadURDF(PATH_TO_ROBOT, startPos,
                                       startOrientation)
        self.update_cam()
        self.bot = hardware_state.Bot()
        self._p.saveBullet("initial_state.bullet")
        self.hlc = hlc
        if self.bot.get_battery_level() > 20:
            self._state = self.all_states["high"]
        else:
            self._state = self.all_states["low"]
        self._action_spec = array_spec.BoundedArraySpec(
            shape=(), dtype=np.int32, minimum=0, maximum=7, name='action')
        self._observation_spec = array_spec.BoundedArraySpec(
            shape=(224, 224), dtype=np.float, minimum=0,maximum=1 ,name='observation')
        _, _, _, self.observation, _ = list(self._p.getCameraImage(
            width=224,
            height=224,
            viewMatrix=self.viewMatrix,
            projectionMatrix=self.projectionMatrix))
        self.reward = -5
        self._episode_ended = False
        self._envStepCounter = 0

    def observation_spec(self):
        """_, _, _, depthImg, _ = self._p.getCameraImage(
            width=224,
            height=224,
            viewMatrix=self.viewMatrix,
            projectionMatrix=self.projectionMatrix)
        self._observation_spec = np.asarray(depthImg)
        Return observation_spec."""
        return self._observation_spec

    def action_spec(self):
        return self._action_spec
        """Return action_spec."""

    def _reset(self):

        if self.bot.get_battery_level() > 20:
            self._state = self.all_states['high']
        else:
            self._state = self.all_states['low']
        self._episode_ended = False
        self._p.restoreState(fileName="/initial_state.bullet")
        return ts.restart(self.observation)

    def _step(self, action):
        """Apply action and return new time_step."""

        self._p.performCollisionDetection()
        self.collision = self._p.getContactPoints(self.bot_id)

        only_plane=True
        for x in range(0,len(self.collision)-1):
                if self.collision[x][2] != self.plane_id:
                        only_plane=False

        if not only_plane :
            for x in range(0,len(self.collision)-1):
                if self.collision[x][8]<0:
                    self._state = self.all_states["collision"]
                    self.reward = self.all_rewards["REWARD_COLLISION"]
                    self._episode_ended = True
                    self.reset()
                    return ts.termination(self.observation, self.reward)




        if self._state == self.all_states['staff_req']:
            s= self._p.getClosestPoints(self.bot_id, self.staff_id,  1000)
            temp = []
            for x in range(0, len(s) - 1):
                temp.append(s[x][8])
            self.closest_point= min(temp)
            if action == self.all_actions['move_up']:
                self._state = self.all_states['staff_req']
                self.bot.move_up(self._p, self.bot_id)
                self.reward = self.all_rewards["REWARD_MOVE_UP"] - self.closest_point[0][8]
                self.update_cam()
                return ts.transition(self.observation, self.reward, 0.95)
            elif action == self.all_actions['move_down']:
                self._state = self.all_states['staff_req']
                self.bot.move_down(self._p, self.bot_id)
                self.reward = self.all_rewards["REWARD_MOVE_DOWN"] - self.closest_point[0][8]
                self.update_cam()
                return ts.transition(self.observation, self.reward, 0.95)
            elif action == self.all_actions['move_left']:
                self._state = self.all_states['staff_req']
                self.bot.move_left(self._p, self.bot_id)
                self.reward = self.all_rewards["REWARD_MOVE_LEFT"] - self.closest_point[0][8]
                self.update_cam()
                return ts.transition(self.observation, self.reward, 0.95)
            elif action == self.all_actions['move_right']:
                self._state = self.all_states['staff_req']
                self.bot.move_right(self._p, self.bot_id)
                self.reward = self.all_rewards["REWARD_MOVE_RIGHT"] - self.closest_point[0][8]
                self.update_cam()
                return ts.transition(self.observation, self.reward, 0.95)
            elif action == self.all_actions['wait']:
                self._state = self.all_states['staff_req']
                self.bot.wait(self._p, self.bot_id)
                self.reward = self.all_rewards["REWARD_WAIT"] - self.closest_point[0][8]
                self.update_cam()
                return ts.transition(self.observation, self.reward, 0.95)
            elif action == self.all_actions['capture']:
                if 0<self.closest_point<0.5:
                    self._state = self.all_states['done']
                    self.reward = self.all_rewards["REWARD_CAPTURE"] + 10
                    return ts.transition(self.observation, self.reward, 0.95)
                else :
                    self._state = self.all_states['staff_req']
                    self.reward = self.all_rewards["REWARD_CAPTURE"] - 10
                    return ts.transition(self.observation, self.reward, 0.95)

        elif self._state == self.all_states['cust_req']:
            s = self._p.getClosestPoints(self.bot_id, self.cust_id, 1000)
            temp = []
            for x in range(0, len(s) - 1):
                temp.append(s[x][8])
            self.closest_point = min(temp)
            if action == self.all_actions['move_up']:
                self._state = self.all_states['cust_req']
                self.bot.move_up(self._p, self.bot_id)
                self.reward = self.all_rewards["REWARD_MOVE_UP"] - self.closest_point[0][8]
                self.update_cam()
                return ts.transition(self.observation, self.reward, 0.95)
            elif action == self.all_actions['move_down']:
                self._state = self.all_states['cust_req']
                self.bot.move_down(self._p, self.bot_id)
                self.reward = self.all_rewards["REWARD_MOVE_DOWN"] - self.closest_point[0][8]
                self.update_cam()
                return ts.transition(self.observation, self.reward, 0.95)
            elif action == self.all_actions['move_left']:
                self._state = self.all_states['cust_req']
                self.bot.move_left(self._p, self.bot_id)
                self.reward = self.all_rewards["REWARD_MOVE_LEFT"] - self.closest_point[0][8]
                self.update_cam()
                return ts.transition(self.observation, self.reward, 0.95)
            elif action == self.all_actions['move_right']:
                self._state = self.all_states['cust_req']
                self.bot.move_right(self._p, self.bot_id)
                self.reward = self.all_rewards["REWARD_MOVE_RIGHT"] - self.closest_point[0][8]
                self.update_cam()
                return ts.transition(self.observation, self.reward, 0.95)
            elif action == self.all_actions['wait']:
                self._state = self.all_states['cust_req']
                self.bot.wait(self._p, self.bot_id)
                self.reward = self.all_rewards["REWARD_WAIT"] - self.closest_point[0][8]
                return ts.transition(self.observation, self.reward, 0.95)
            elif action == self.all_actions['capture']:
                if 0 < self.closest_point < 0.5:
                    self._state = self.all_states['done']
                    self.reward = self.all_rewards["REWARD_CAPTURE"] + 10
                    return ts.transition(self.observation, self.reward, 0.95)
                else :
                    self._state = self.all_states['cust_req']
                    self.reward = self.all_rewards["REWARD_CAPTURE"] - 10
                    return ts.transition(self.observation, self.reward, 0.95)

        elif self._state == self.all_states['host_req']:
            s = self._p.getClosestPoints( self.bot_id, self.host_id, 1000)
            temp = []
            for x in range(0, len(s) - 1):
                temp.append(s[x][8])
            self.closest_point = min(temp)
            if action == self.all_actions['move_up']:
                self._state = self.all_states['host_req']
                self.bot.move_up(self._p, self.bot_id)
                self.reward = self.all_rewards["REWARD_MOVE_UP"] - self.closest_point[0][8]
                self.update_cam()
                return ts.transition(self.observation, self.reward, 0.95)
            elif action == self.all_actions['move_down']:
                self._state = self.all_states['host_req']
                self.bot.move_down(self._p, self.bot_id)
                self.reward = self.all_rewards["REWARD_MOVE_DOWN"] - self.closest_point[0][8]
                self.update_cam()
                return ts.transition(self.observation, self.reward, 0.95)
            elif action == self.all_actions['move_left']:
                self._state = self.all_states['host_req']
                self.bot.move_left(self._p, self.bot_id)
                self.reward = self.all_rewards["REWARD_MOVE_LEFT"] - self.closest_point[0][8]
                self.update_cam()
                return ts.transition(self.observation, self.reward, 0.95)
            elif action == self.all_actions['move_right']:
                self._state = self.all_states['host_req']
                self.bot.move_right(self._p, self.bot_id)
                self.reward = self.all_rewards["REWARD_MOVE_RIGHT"] - self.closest_point[0][8]
                self.update_cam()
                return ts.transition(self.observation, self.reward, 0.95)
            elif action == self.all_actions['wait']:
                self._state = self.all_states['host_req']
                self.bot.wait(self._p, self.bot_id)
                self.reward = self.all_rewards["REWARD_WAIT"] - self.closest_point[0][8]
                return ts.transition(self.observation, self.reward, 0.95)

            elif action == self.all_actions['capture']:
                if 0 < self.closest_point < 0.5:
                    self._state = self.all_states['done']
                    self.reward = self.all_rewards["REWARD_CAPTURE"] + 10
                    return ts.transition(self.observation, self.reward, 0.95)
                else :
                    self._state = self.all_states['host_req']
                    self.reward = self.all_rewards["REWARD_CAPTURE"] - 10
                    return ts.transition(self.observation, self.reward, 0.95)

        elif self._state == self.all_states['recharge_req']:
            s = self._p.getClosestPoints(self.bot_id, self.charger_id, 1000)
            temp = []
            for x in range(0, len(s) - 1):
                temp.append(s[x][8])
            self.closest_point = min(temp)
            if action == self.all_actions['move_up']:
                self._state = self.all_states['recharge_req']
                self.bot.move_up(self._p, self.bot_id)
                self.reward = self.all_rewards["REWARD_MOVE_UP"] - self.closest_point[0][8]
                self.update_cam()
                return ts.transition(self.observation, self.reward, 0.95)
            elif action == self.all_actions['move_down']:
                self._state = self.all_states['recharge_req']
                self.bot.move_down(self._p, self.bot_id)
                self.reward = self.all_rewards["REWARD_MOVE_DOWN"] - self.closest_point[0][8]
                self.update_cam()
                return ts.transition(self.observation, self.reward, 0.95)
            elif action == self.all_actions['move_left']:
                self._state = self.all_states['recharge_req']
                self.bot.move_left(self._p, self.bot_id)
                self.reward = self.all_rewards["REWARD_MOVE_LEFT"] - self.closest_point[0][8]
                self.update_cam()
                return ts.transition(self.observation, self.reward, 0.95)
            elif action == self.all_actions['move_right']:
                self._state = self.all_states['recharge_req']
                self.bot.move_right(self._p, self.bot_id)
                self.reward = self.all_rewards["REWARD_MOVE_RIGHT"] - self.closest_point[0][8]
                self.update_cam()
                return ts.transition(self.observation, self.reward, 0.95)
            elif action == self.all_actions['wait']:
                self._state = self.all_states['recharge_req']
                self.bot.wait(self._p, self.bot_id)
                self.reward = self.all_rewards["REWARD_WAIT"] - self.closest_point[0][8]
                return ts.transition(self.observation, self.reward, 0.95)

            elif action == self.all_actions['capture']:
                if 0 < self.closest_point < 0.5:
                    self._state = self.all_states['high']
                    self.reward = self.all_rewards["REWARD_CAPTURE"] + 10
                    self.bot.set_battery_level(100)
                    return ts.transition(self.observation, self.reward, 0.95)
                else:
                    self._state = self.all_states['recharge_req']
                    self.reward = self.all_rewards["REWARD_CAPTURE"] - 10
                    return ts.transition(self.observation, self.reward, 0.95)

        if not self.hlc.is_empty:
            if self._state == self.all_states['high']:
                if action == self.all_actions['accept_req']:
                    request = self.hlc.pop_request
                    if request == 'staff_req':
                        self._state = self.all_states['staff_req']
                        self.reward = self.all_rewards["REWARD_ACCEPT_R"] - 5
                        return ts.transition(self.observation, self.reward, 0.95)
                    elif request == 'cust_req':
                        self._state = self.all_states['cust_req']
                        self.reward = self.all_rewards["REWARD_ACCEPT_R"] - 5
                        return ts.transition(self.observation, self.reward, 0.95)
                    elif request == 'host_req':
                        self._state = self.all_states['host_req']
                        self.reward = self.all_rewards["REWARD_ACCEPT_R"] - 5
                        return ts.transition(self.observation, self.reward, 0.95)
            elif self._state == self.all_states['low']:
                if action == self.all_actions['accept_req']:
                    request = self.hlc.pop_request
                    if request == 'staff_req':
                        self._state = self.all_states['staff_req']
                        self.reward = self.all_rewards["REWARD_ACCEPT_R"] - 50
                        return ts.transition(self.observation, self.reward, 0.95)
                    elif request == 'cust_req':
                        self._state = self.all_states['cust_req']
                        self.reward = self.all_rewards["REWARD_ACCEPT_R"] - 50
                        return ts.transition(self.observation, self.reward, 0.95)
                    elif request == 'host_req':
                        self._state = self.all_states['host_req']
                        self.reward = self.all_rewards["REWARD_ACCEPT_R"] - 50
                        return ts.transition(self.observation, self.reward, 0.95)

        if self._state == self.all_states['high'] :
            if action == self.all_actions['wait']:
                self._state = self.all_states['high']
                self.reward = self.all_rewards["REWARD_WAIT"]
                self.bot.wait(self._p, self.bot_id)

            return ts.transition(self.observation, self.reward, 0.95)
        elif self._state == self.all_states['low']:
            if action == self.all_actions['wait']:
                self._state = self.all_states['low']
                self.reward = self.all_rewards["REWARD_WAIT"]
                self.bot.wait(self._p, self.bot_id)
            elif action == self.all_actions['recharge']:
                self._state = self.all_states['recharge_req']
                self.reward = self.all_rewards["REWARD_RECHARGE"]
                self.bot.wait(self._p, self.bot_id)
            return ts.transition(self.observation, self.reward, 0.95)
        elif self._state == self.all_state['done']:
            if self.bot.get_battery_level() > 20:
                self._state = self.all_states['high']
                return ts.transition(self.observation, self.reward, 0.95)
            else:
                self._state = self.all_states['low']
                return ts.transition(self.observation, self.reward, 0.95)

        if self._state == self.all_states['high'] and self.hlc.is_empty():
            return ts.termination(self.observation, 0)


    def update_cam(self):
        distance = 100000
        img_w, img_h = 224, 224
        agent_pos, agent_orn = \
            self._p.getBasePositionAndOrientation(self.bot_id)

        yaw = self._p.getEulerFromQuaternion(agent_orn)[-1]
        xA, yA, zA = agent_pos
        zA = zA + 0.45  # make the camera a little higher than the robot

        # compute focusing point of the camera
        xB = xA + math.cos(yaw) * distance
        yB = yA + math.sin(yaw) * distance + 0.3
        zB = zA

        self.viewMatrix = self._p.computeViewMatrix(
            cameraEyePosition=[xA, yA, zA],
            cameraTargetPosition=[xB, yB, zB],
            cameraUpVector=[0, 0, 1.0]
        )

        self.projectionMatrix = self._p.computeProjectionMatrixFOV(
            fov=90, aspect=1.5, nearVal=0.02, farVal=3.5)

        _, _, _, self.observation, _ = list(self._p.getCameraImage(img_w, img_h,
                                 self.viewMatrix,
                                 self.projectionMatrix))
