import pybullet_data
import pybullet as pb
import time
physicsClient = pb.connect(pb.GUI)
pb.setAdditionalSearchPath(pybullet_data.getDataPath())
pb.restoreState(fileName='/Users/amenabshir/PycharmProjects/capstone/robotDeliverySystem/path_planner/test.bullet')
