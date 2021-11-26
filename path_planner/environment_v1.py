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
from tf_agents.environments import py_environment
from tf_agents.environments import tf_environment
from tf_agents.environments import tf_py_environment
from tf_agents.environments import utils
from tf_agents.specs import array_spec
from tf_agents.environments import wrappers
from tf_agents.environments import suite_gym
from tf_agents.trajectories import time_step as ts

PATH_TO_TABLE = "./table/table.urdf"
PATH_TO_TRAY = "./tray/tray.urdf"
PATH_TO_ROBOT = "./robotv1.urdf"
PATH_TO_CHARGER= './cube.urdf'
PATH_TO_HUMANOID= './nao.urdf'

class CustomEnv(py_environment.PyEnvironment, ABC):

    def __init__(self):

        self.all_states = {
            "high": 0,
            "low": 1,
            "staff_req": 2,
            "cust_req": 3,
            "host_req": 4,
            "done": 5,
            "collision": 6,

        }
        self.all_actions = {
            "move_left": 0,
            "move_right": 1,
            "move_up": 2,
            "move_down": 3,
            "capture": 4,
            "wait": 5,
            "recharge": 6,
            "accept_req_c" : 7,
            "accept_req_h": 8,
            "accept_req_s": 9,
        }
        self.all_rewards = {
            "REWARD_WAIT": -3,
            "REWARD_CAPTURE": -3,
            "REWARD_MOVE_UP": -1,
            "REWARD_MOVE_DOWN": -1,
            "REWARD_MOVE_LEFT": -1,
            "REWARD_MOVE_RIGHT": -1,
            "REWARD_COLLISION": -50,
            "REWARD_ACCEPT_H": -1,
            "REWARD_ACCEPT_C": -1,
            "REWARD_ACCEPT_S": -1,

        }

        self._p = p
        self._p.connect(self._p.DIRECT)  # no GUI
        self._p.setAdditionalSearchPath(pybullet_data.getDataPath())
        self._p.loadURDF('plane.urdf')
        for x in range(-5, 5, 2):  # generate table
            for y in range(-5, 5, 2):
                startPos = [y, x, 0]
                startOrientation = p.getQuaternionFromEuler([0, 0, 0])
                self._p.loadURDF(PATH_TO_TABLE, startPos, startOrientation)
        startPos = [0, 1, 1]
        self.target_id = self._p.loadURDF(PATH_TO_TRAY, startPos,
                                          startOrientation)  # generate tray
        self._p.setGravity(0, 0, -9.8)
        startPos = [0, 0, 3]
        self.bot_id = self._p.loadURDF(PATH_TO_ROBOT, startPos,
                                       startOrientation)
        self.projectionMatrix = self._p.computeProjectionMatrixFOV(
            fov=45.0,
            aspect=1.0,
            nearVal=0.1,
            farVal=3.1)

        self.viewMatrix = self._p.computeViewMatrix(
            cameraEyePosition=[0, 0, 3],
            cameraTargetPosition=[0, 0, 0],
            cameraUpVector=[0, 1, 0])

        self.bot = hardware_state.Bot()
        self._p.saveBullet("initial_state.bullet")
        self.hlc = HighLevelController.HighLeveLController()
        if self.bot.get_battery_level() > 20:
            self._state = self.all_states["high"]
        else:
            self._state = self.all_states["low"]
        self._action_spec = array_spec.BoundedArraySpec(
            shape=(), dtype=np.int32, minimum=0, maximum=9, name='action')
        self._observation_spec = array_spec.BoundedArraySpec(
            shape=(224, 224), dtype=np.float, minimum=0, name='observation')
        self.reward = -5
        self._episode_ended = False
        self._envStepCounter = 0

    def observation_spec(self):
        _, _, _, depthImg, _ = self._p.getCameraImage(
            width=224,
            height=224,
            viewMatrix=self.viewMatrix,
            projectionMatrix=self.projectionMatrix)
        self._observation_spec = depthImg
        """Return observation_spec."""
        return self._observation_spec

    def action_spec(self):
        return self._action_spec
        """Return action_spec."""

    def _reset(self):

        if self.bot.get_battery_level() > 20:
            self._state = 1
        else:
            self._state = 2
        self._episode_ended = False
        self._p.restoreState(fileName="initial_state.bullet")
        self._p.setTimeStep(self._time)
        return ts.restart(np.array([self._state], dtype=np.int32))

    def _step(self, action):
        """Apply action and return new time_step."""
        self.closest_point = self._p.getClosestPoints(self.target_id, self.bot_id, 1000)
        self._p.performCollisionDetection()
        self.collision = self._p.getClosestPoints(self.bot_id)

        if self.collision[0][8] < 0:
            self.state = self.all_states["collision"]
            self.reward = self.all_rewards["REWARD_COLLISION"]

        elif self.state == self.all_states['staff_req'] and action == self.all_actions['move_up']:
            self.state = self.all_states['staff_req']
            self.bot.move_up(self._p, self.bot_id)
            self.reward = self.all_rewards["REWARD_MOVE_UP"] - self.closest_point[0][8]
        elif self.state == self.all_states['staff_req'] and action == self.all_actions['move_down']:
            self.state = self.all_states['staff_req']
            self.bot.move_down(self._p, self.bot_id)
            self.reward = self.all_rewards["REWARD_MOVE_DOWN"] - self.closest_point[0][8]
        elif self.state == self.all_states['staff_req'] and action == self.all_actions['move_left']:
            self.state = self.all_states['staff_req']
            self.bot.move_down(self._p, self.bot_id)
            self.reward = self.all_rewards["REWARD_MOVE_LEFT"] - self.closest_point[0][8]
        elif self.state == self.all_states['staff_req'] and action == self.all_actions['move_right']:
            self.state = self.all_states['staff_req']
            self.bot.move_right(self._p, self.bot_id)
            self.reward = self.all_rewards["REWARD_MOVE_RIGHT"] - self.closest_point[0][8]
        elif self.state == self.all_states['staff_req'] and action == self.all_actions['wait']:
            self.state = self.all_states['staff_req']
            self.bot.wait(self._p, self.bot_id)
            self.reward = self.all_rewards["REWARD_WAIT"] - self.closest_point[0][8]

        elif self.state == self.all_states['cust_req'] and action == self.all_actions['move_up']:
            self.state = self.all_states['cust_req']
            self.bot.move_up(self._p, self.bot_id)
            self.reward = self.all_rewards["REWARD_MOVE_UP"] - self.closest_point[0][8]
        elif self.state == self.all_states['cust_req'] and action == self.all_actions['move_down']:
            self.state = self.all_states['cust_req']
            self.bot.move_down(self._p, self.bot_id)
            self.reward = self.all_rewards["REWARD_MOVE_DOWN"] - self.closest_point[0][8]
        elif self.state == self.all_states['cust_req'] and action == self.all_actions['move_left']:
            self.state = self.all_states['cust_req']
            self.bot.move_down(self._p, self.bot_id)
            self.reward = self.all_rewards["REWARD_MOVE_LEFT"] - self.closest_point[0][8]
        elif self.state == self.all_states['cust_req'] and action == self.all_actions['move_right']:
            self.state = self.all_states['cust_req']
            self.bot.move_right(self._p, self.bot_id)
            self.reward = self.all_rewards["REWARD_MOVE_RIGHT"] - self.closest_point[0][8]
        elif self.state == self.all_states['cust_req'] and action == self.all_actions['wait']:
            self.state = self.all_states['cust_req']
            self.bot.wait(self._p, self.bot_id)
            self.reward = self.all_rewards["REWARD_WAIT"] - self.closest_point[0][8]

        elif self.state == self.all_states['host_req'] and action == self.all_actions['move_up']:
            self.state = self.all_states['host_req']
            self.bot.move_up(self._p, self.bot_id)
            self.reward = self.all_rewards["REWARD_MOVE_UP"] - self.closest_point[0][8]
        elif self.state == self.all_states['host_req'] and action == self.all_actions['move_down']:
            self.state = self.all_states['host_req']
            self.bot.move_down(self._p, self.bot_id)
            self.reward = self.all_rewards["REWARD_MOVE_DOWN"] - self.closest_point[0][8]
        elif self.state == self.all_states['host_req'] and action == self.all_actions['move_left']:
            self.state = self.all_states['host_req']
            self.bot.move_down(self._p, self.bot_id)
            self.reward = self.all_rewards["REWARD_MOVE_LEFT"] - self.closest_point[0][8]
        elif self.state == self.all_states['host_req'] and action == self.all_actions['move_right']:
            self.state = self.all_states['host_req']
            self.bot.move_right(self._p, self.bot_id)
            self.reward = self.all_rewards["REWARD_MOVE_RIGHT"] - self.closest_point[0][8]
        elif self.state == self.all_states['host_req'] and action == self.all_actions['wait']:
            self.state = self.all_states['host_req']
            self.bot.wait(self._p, self.bot_id)
            self.reward = self.all_rewards["REWARD_WAIT"] - self.closest_point[0][8]

        if self.hlc.new_request:
            if self.state == self.all_states['high'] and action == self.all_actions['accept_req_s']:
                self.state = self.all_states['staff_req']
                self.reward = self.all_rewards["REWARD_ACCEPT_S"] - 5
            elif self.state == self.all_states['high'] and action == self.all_actions['accept_req_c']:
                self.state = self.all_states['cust_req']
                self.reward = self.all_rewards["REWARD_ACCEPT_C"] - 5
            elif self.state == self.all_states['high'] and action == self.all_actions['accept_req_h']:
                self.state = self.all_states['host_req']
                self.reward = self.all_rewards["REWARD_ACCEPT_H"] - 5

            elif self.state == self.all_states['low'] and action == self.all_actions['accept_req_s']:
                self.state = self.all_states['staff_req']
                self.reward = self.all_rewards["REWARD_ACCEPT_S"] - 5
            elif self.state == self.all_states['low'] and action == self.all_actions['accept_req_c']:
                self.state = self.all_states['cust_req']
                self.reward = self.all_rewards["REWARD_ACCEPT_C"] - 5
            elif self.state == self.all_states['low'] and action == self.all_actions['accept_req_h']:
                self.state = self.all_states['host_req']
                self.reward = self.all_rewards["REWARD_ACCEPT_H"] - 5

        if self.state==self.all_states['high'] and action ==self.action['wait']:
            self.state = self.all_states['high']
            self.reward = self.all_rewards["WAIT"]
            self.bot.wait(self._p, self.bot_id)
        if self.state==self.all_states['low'] and action ==self.action['wait']:
            self.state = self.all_states['low']
            self.reward = self.all_rewards["WAIT"]
            self.bot.wait(self._p, self.bot_id)


