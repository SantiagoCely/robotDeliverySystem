from __future__ import absolute_import, division, print_function

import base64
import matplotlib
import matplotlib.pyplot as plt
import numpy as np
#import reverb

import tensorflow as tf
import time
from tf_agents.agents.dqn import dqn_agent
from tf_agents.drivers import py_driver
from tf_agents.environments import suite_gym
from tf_agents.environments import tf_py_environment
from tf_agents.eval import metric_utils
from tf_agents.metrics import tf_metrics
from tf_agents.networks import sequential
from tf_agents.policies import py_tf_eager_policy
from tf_agents.policies import random_tf_policy
from tf_agents.replay_buffers import reverb_replay_buffer
from tf_agents.replay_buffers import reverb_utils
from tf_agents.trajectories import trajectory
from tf_agents.specs import tensor_spec
from tf_agents.utils import common
from tf_agents.policies import policy_saver
from tf_agents.networks import q_network



import pybullet as p


import HighLevelController
from random import choice

d = HighLevelController.HighLeveLController()


for _ in range(0, 1000):
  m = choice(['cust_req', 'staff_req', 'host_req'])
  d.create_request(m)

import environment_v1
from environment_v1 import CustomEnv

#env = CustomEnv(d, p)
train_py_env = CustomEnv(d, p)
#eval_py_env = CustomEnv(d, p)
train_env = tf_py_environment.TFPyEnvironment(train_py_env)
#eval_env = tf_py_environment.TFPyEnvironment(eval_py_env)
fc_layer_params = (100, 50)
num_iterations = 50000 # @param {type:"integer"}

initial_collect_steps = 100  # @param {type:"integer"}
collect_steps_per_iteration =   1# @param {type:"integer"}
replay_buffer_max_length = 100000  # @param {type:"integer"}

batch_size = 64  # @param {type:"integer"}
learning_rate = 1e-3  # @param {type:"number"}
log_interval = 200  # @param {type:"integer"}

num_eval_episodes = 1  # @param {type:"integer"}
eval_interval = 2000  # @param {type:"integer"}


q_net = q_network.QNetwork(
    train_env.observation_spec(),
    train_env.action_spec(),
    fc_layer_params=fc_layer_params)

optimizer = tf.compat.v1.train.AdamOptimizer(learning_rate=learning_rate)

global_step = tf.compat.v1.train.get_or_create_global_step()

agent = dqn_agent.DqnAgent(
    train_env.time_step_spec(),
    train_env.action_spec(),
    q_network=q_net,
    optimizer=optimizer,
    td_errors_loss_fn=common.element_wise_squared_loss,
    train_step_counter=global_step)
agent.initialize()

tf_policy_saver = policy_saver.PolicySaver(agent.policy)
saved_policy = tf.saved_model.load("./policy")
p.setGravity(0, 0, -9.8)
def run_episodes(policy, eval_tf_env):
  num_episodes = 3
  frames = []
  p.setRealTimeSimulation(1)
  for _ in range(num_episodes):
    time.sleep(0.1)
    time_step = eval_tf_env.reset()
    #frames.append(eval_py_env.render())
    while not time_step.is_last():
      time.sleep(0.1)
      action_step = policy.action(time_step)
      print(action_step.action)
      time_step = eval_tf_env.step(action_step.action)

run_episodes(saved_policy, train_env)