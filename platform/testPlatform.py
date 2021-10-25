from gpiozero import Servo
from time import sleep

servo1 = Servo(23)
servo1.value = -1

servo2 = Servo(26)
servo2.value = 1
