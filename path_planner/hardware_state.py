class Bot:
    def __init__(self):
        self.battery_level = 50

    def get_battery_level(self):
        return self.battery_level

    def set_battery_level(self, val):
        self.battery_level = val
