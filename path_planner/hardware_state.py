import time


class Bot:
    def __init__(self):
        self.battery_level = 50
        self.RIGHT_JOINT = 1
        self.LEFT_JOINT = 2
        self.MAX_FORCE = 500
        self.TARGET_VEL = 10

    def get_battery_level(self):
        return self.battery_level

    def set_battery_level(self, val):
        self.battery_level = val

    def move_left(self, p, robot_id):
        p.sendJointMotorControl2(robot_id, self.RIGHT_JOINT, p.VELOCITY_CONTROL, targetVelocity=self.TARGET_VEL,
                                 force=self.MAX_FORCE)
        time.sleep(0.5)
        p.sendJointMotorControl2(robot_id, self.RIGHT_JOINT, p.VELOCITY_CONTROL, targetVelocity=self.TARGET_VEL,
                                 force=0)

    def move_right(self, p, robot_id):
        p.sendJointMotorControl2(robot_id, self.LEFT_JOINT, p.VELOCITY_CONTROL, targetVelocity=self.TARGET_VEL,
                                 force=self.MAX_FORCE)
        time.sleep(0.5)
        p.sendJointMotorControl2(robot_id, self.LEFT_JOINT, p.VELOCITY_CONTROL, targetVelocity=self.TARGET_VEL,
                                 force=self.MAX_FORCE)

    def move_up(self, p, robot_id):
        p.sendJointMotorControl2(robot_id, self.LEFT_JOINT, p.VELOCITY_CONTROL, targetVelocity=self.TARGET_VEL,
                                 force=self.MAX_FORCE)
        p.sendJointMotorControl2(robot_id, self.RIGHT_JOINT, p.VELOCITY_CONTROL, targetVelocity=self.TARGET_VEL,
                                 force=self.MAX_FORCE)
        time.sleep(0.5)
        p.sendJointMotorControl2(robot_id, self.LEFT_JOINT, p.VELOCITY_CONTROL, targetVelocity=self.TARGET_VEL,
                                 force=0)
        p.sendJointMotorControl2(robot_id, self.RIGHT_JOINT, p.VELOCITY_CONTROL, targetVelocity=self.TARGET_VEL,
                                 force=0)

    def move_down(self, p, robot_id):
        p.sendJointMotorControl2(robot_id, self.RIGHT_JOINT, p.VELOCITY_CONTROL, targetVelocity=self.TARGET_VEL,
                                 force=self.MAX_FORCE)
        time.sleep(0.25)
        p.sendJointMotorControl2(robot_id, self.RIGHT_JOINT, p.VELOCITY_CONTROL, targetVelocity=self.TARGET_VEL,
                                 force=0)
        p.sendJointMotorControl2(robot_id, self.LEFT_JOINT, p.VELOCITY_CONTROL, targetVelocity=self.TARGET_VEL,
                                 force=self.MAX_FORCE)
        p.sendJointMotorControl2(robot_id, self.RIGHT_JOINT, p.VELOCITY_CONTROL, targetVelocity=self.TARGET_VEL,
                                 force=self.MAX_FORCE)
        time.sleep(0.5)
