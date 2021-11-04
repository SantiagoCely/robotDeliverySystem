from gpiozero import Servo
from time import sleep

servoLeft = Servo(3)
servoLeft.value = -1

servoRight = Servo(2)
servoRight.value = 1
