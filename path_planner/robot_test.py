

import pybullet_data
import pybullet as pb
import time

physicsClient = pb.connect(pb.GUI)
pb.setAdditionalSearchPath(pybullet_data.getDataPath())
planeId = pb.loadURDF('plane.urdf')
startOrientation = pb.getQuaternionFromEuler([0, 0, 0])
startPos = [0, 0, 1]
pb.loadURDF("/Users/amenabshir/PycharmProjects/capstone/robotDeliverySystem/path_planner/robotv1.urdf", startPos,
            startOrientation)

pb.setGravity(0, 0, -9.8)
pb.setRealTimeSimulation(1)
while 1:
    keys = pb.getKeyboardEvents()
    print(keys)
    # print(viewMatrix)
    time.sleep(1)
