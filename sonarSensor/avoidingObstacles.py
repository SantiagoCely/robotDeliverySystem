#!/usr/bin/python

import time
import RPi.GPIO as GPIO

from gpiozero import Servo
from time import sleep

import time

# Use board based pin numbering
GPIO.setmode(GPIO.BOARD)

def ReadDistance(pin):
   GPIO.setup(pin, GPIO.OUT)
   GPIO.output(pin, 0)

   time.sleep(0.000002)

   #send trigger signal

   GPIO.output(pin, 1)

   time.sleep(0.000005)

   GPIO.output(pin, 0)
   GPIO.setup(pin, GPIO.IN)

   while GPIO.input(pin)==0:
      starttime=time.time()

   while GPIO.input(pin)==1:
      endtime=time.time()

   duration=endtime-starttime

   # Distance is defined as time/2 (there and back) * speed of sound 34000 cm/s

   distance=duration*34000/2

   return distance

def main():
   avoidingObstacle = False
   servoLeft = Servo(23)
   servoRight = Servo(26)
   start_time = 0
   end_time = 0

   while True:
      # Make the robot go forward
      servoLeft.value = -1
      servoRight.value = 1

      distance = ReadDistance(11)
      print("Distance to object is ",distance," cm or ",distance*.3937, " inches")
      if distance < 15:
         servoRight.value = 0
         time.sleep(1)
         servoRight.value = 1
         start_time = time.time()
         avoidingObstacle = True

      if avoidingObstacle:
         end_time = time.time()
         total_time = end_time - start_time

      if total_time > 5:
         servoLeft.value = 0
         time.sleep(1)
         servoLeft.value = -1

         avoidingObstacle = False

      time.sleep(.5) # Take readings every 0.5s


if __name__ == "__main__":
   main()
