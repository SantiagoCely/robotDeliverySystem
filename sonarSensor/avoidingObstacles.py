#!/usr/bin/python

import gpiozero
from time import sleep

import time
import RPi.GPIO as GPIO



import time

# Use board based pin numbering
#GPIO.setmode(GPIO.BOARD)

def ReadDistance(pin):
   GPIO.setup(pin, GPIO.OUT)
   GPIO.output(pin, 0)

   time.sleep(0.000002)

   #send trigger signal

   GPIO.output(pin, 1)

   time.sleep(0.000005)

   GPIO.output(pin, 0)
   GPIO.setup(pin, GPIO.IN)
    
   starttime=time.time()
   while GPIO.input(pin)==0:
      continue

   while GPIO.input(pin)==1:
      endtime=time.time()

   duration=endtime-starttime

   # Distance is defined as time/2 (there and back) * speed of sound 34000 cm/s

   distance=duration*34000/2

   return distance

def mainQueue(mainQueue, alternateQueue):
    return 0

def main():
   queue = []
   avoidingObstacle = False
   servoLeft = gpiozero.Servo(3)
   servoRight = gpiozero.Servo(2)
   start_time = 0
   end_time = 0
   total_time = 0
   
   # Make the robot go forward
   servoLeft.value = -1
   servoRight.value = 1
   
   distance = 300
      
   print("Robot moving forward")

   while True:
       
      singleReading = ReadDistance(17)
      print("single reading is ",singleReading," cm or ",singleReading*.3937, " inches")
      
      queue.append(singleReading)
      
      
      if len(queue) >= 2:
         distance = queue[1]
         #print("Average distance to object is ",distance," cm or ",distance*.3937, " inches")
         queue.pop(0)
          
          
      if distance < 20:
         servoLeft.value = 1
         
         time.sleep(1)
         servoLeft.value = -1
         start_time = time.time()
         avoidingObstacle = True

      if avoidingObstacle:
         end_time = time.time()
         total_time = end_time - start_time

      if total_time > 1.5:
         servoRight.value = -1
         time.sleep(1)
         servoRight.value = 1
         total_time = 0

         avoidingObstacle = False

      time.sleep(0.1) # Take readings every 0.5s


if __name__ == "__main__":
   main()
