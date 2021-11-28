import time


class Bot:
    def __init__(self):
        self.battery_level = 50
        self.RIGHT_JOINT = 1
        self.LEFT_JOINT = 2
        self.MAX_FORCE = 30
        self.TARGET_VEL = 10
        self.start_time=time.time()

    def get_battery_level(self):
        temp= time.time()
        temp2= temp - self.start_time
        if temp2>600:
            self.battery_level= 15
        return self.battery_level

    def set_battery_level(self, val):
        self.battery_level = val

    def move_left(self, p, robot_id):
        p.setJointMotorControl2(robot_id, 2, p.VELOCITY_CONTROL, targetVelocity=0,
                                force=self.MAX_FORCE)
        p.setJointMotorControl2(robot_id, 3, p.VELOCITY_CONTROL, targetVelocity=0,
                                force=self.MAX_FORCE)
        p.setJointMotorControl2(robot_id, 6, p.VELOCITY_CONTROL, targetVelocity=self.TARGET_VEL,
                                force=self.MAX_FORCE)
        p.setJointMotorControl2(robot_id, 7, p.VELOCITY_CONTROL, targetVelocity=self.TARGET_VEL,
                                force=self.MAX_FORCE)

    def move_right(self, p, robot_id):
        p.setJointMotorControl2(robot_id, 2, p.VELOCITY_CONTROL, targetVelocity=self.TARGET_VEL,
                                force=self.MAX_FORCE)
        p.setJointMotorControl2(robot_id, 3, p.VELOCITY_CONTROL, targetVelocity=self.TARGET_VEL,
                                force=self.MAX_FORCE)
        p.setJointMotorControl2(robot_id, 6, p.VELOCITY_CONTROL, targetVelocity=0,
                                force=self.MAX_FORCE)
        p.setJointMotorControl2(robot_id, 7, p.VELOCITY_CONTROL, targetVelocity=0,
                                force=self.MAX_FORCE)
    def move_up(self, p, robot_id):
        p.setJointMotorControl2(robot_id, 2, p.VELOCITY_CONTROL, targetVelocity=self.TARGET_VEL,
                                force=self.MAX_FORCE)
        p.setJointMotorControl2(robot_id, 3, p.VELOCITY_CONTROL, targetVelocity=self.TARGET_VEL,
                                force=self.MAX_FORCE)
        p.setJointMotorControl2(robot_id, 6, p.VELOCITY_CONTROL, targetVelocity=self.TARGET_VEL,
                                force=self.MAX_FORCE)
        p.setJointMotorControl2(robot_id, 7, p.VELOCITY_CONTROL, targetVelocity=self.TARGET_VEL,
                                force=self.MAX_FORCE)

    def move_down(self, p, robot_id):
        p.setJointMotorControl2(robot_id, 2, p.VELOCITY_CONTROL, targetVelocity=-self.TARGET_VEL,
                                force=self.MAX_FORCE)
        p.setJointMotorControl2(robot_id, 3, p.VELOCITY_CONTROL, targetVelocity=-self.TARGET_VEL,
                                force=self.MAX_FORCE)
        p.setJointMotorControl2(robot_id, 6, p.VELOCITY_CONTROL, targetVelocity=-self.TARGET_VEL,
                                force=self.MAX_FORCE)
        p.setJointMotorControl2(robot_id, 7, p.VELOCITY_CONTROL, targetVelocity=-self.TARGET_VEL,
                                force=self.MAX_FORCE)
    def wait(self, p, robot_id):
        p.setJointMotorControl2(robot_id, 2, p.VELOCITY_CONTROL, targetVelocity=0,
                                force=self.MAX_FORCE)
        p.setJointMotorControl2(robot_id, 3, p.VELOCITY_CONTROL, targetVelocity=0,
                                force=self.MAX_FORCE)
        p.setJointMotorControl2(robot_id, 6, p.VELOCITY_CONTROL, targetVelocity=0,
                                force=self.MAX_FORCE)
        p.setJointMotorControl2(robot_id, 7, p.VELOCITY_CONTROL, targetVelocity=0,
                                force=self.MAX_FORCE)
