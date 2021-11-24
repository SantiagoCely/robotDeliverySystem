from __future__ import absolute_import
from __future__ import division
from __future__ import print_function
import image_space
import hardware_state
import abc
import tensorflow as tf
import numpy as np
import pybullet_data
import pybullet as pb
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

class PyEnvironment(object):

  def __init__(self):
    pb.DIRECT
    pb.setAdditionalSearchPath(pybullet_data.getDataPath())
    pb.loadURDF('plane.urdf')
    for x in range(-5, 5, 2):
      for y in range(-5, 5, 2):
        startPos = [y, x, 0]
        startOrientation = pb.getQuaternionFromEuler([0, 0, 0])
        pb.loadURDF(PATH_TO_TABLE,startPos, startOrientation)
    startPos = [0, 1, 1]
    pb.loadURDF(PATH_TO_TRAY, startPos,
                startOrientation)
    pb.setGravity(0, 0, -9.8)
    startPos = [0, 0, 3]
    pb.loadURDF(PATH_TO_ROBOT, startPos,
                startOrientation)
    self.bot=hardware_state.Bot()
    if self.bot.get_battery_level()>20:
      self._state='high'
    else:
      self._state='low'
    self._episode_ended = False

  def _reset(self):
    if self.bot.get_battery_level() > 20:
      self._state = 'high'
    else:
      self._state = 'low'
    self._episode_ended = False
    return ts.restart(np.array([self._state], dtype=np.int32))

  def reset(self):
    """Return initial_time_step."""

    self._current_time_step = self._reset()
    return self._current_time_step

  def step(self, action):
    """Apply action and return new time_step."""

    #if self.state=='staff_req' and action=='move_up':



    if self._current_time_step is None:
        return self.reset()
    self._current_time_step = self._step(action)
    return self._current_time_step

  def current_time_step(self):
    return self._current_time_step

  def time_step_spec(self):
    """Return time_step_spec."""

  @abc.abstractmethod
  def observation_spec(self):
    """Return observation_spec."""

  @abc.abstractmethod
  def action_spec(self):
    """Return action_spec."""

  @abc.abstractmethod
  def _reset(self):
    """Return initial_time_step."""

  @abc.abstractmethod
  def _step(self, action):
    """Apply action and return new time_step."""
