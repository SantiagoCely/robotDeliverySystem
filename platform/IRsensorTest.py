import RPi.GPIO as GPIO
import time

from gpiozero import Servo
from time import sleep

sensor = 2 # define the GPIO pin our sensor is attached to

GPIO.setmode(GPIO.BCM) # set GPIO numbering system to BCM
GPIO.setup(sensor,GPIO.IN) # set our sensor pin to an input

sample = 1000 # how many half revolutions to time
count = 0

start = 0
end = 0

def set_start():
 	global start
 	start = time.time()

def set_end():
 	global end
 	end = time.time()

def get_rpm(c):
 	global count # delcear the count variable global so we can edit it

 	if not count:
 	 	set_start() # create start time
 	 	count = count + 1 # increase counter by 1
 	else:
 	 	count = count + 1

 	if count==sample:
 	 	set_end() # create end time
 	 	delta = end - start # time taken to do a half rotation in seconds
 	 	delta = delta / 60 # converted to minutes
 	 	rpm = (sample / delta) / 32 # converted to time for a full single rotation
 	 	print rpm
 	 	count = 0 # reset the count to 0

servoLeft = Servo(14)
servoLeft.value = -1

servoRight = Servo(15)
servoRight.value = 1

GPIO.add_event_detect(sensor, GPIO.RISING, callback=get_rpm) # execute the get_rpm function when a HIGH signal is detected

try:
 	while True: # create an infinte loop to keep the script running
 	 	time.sleep(0.1)
except KeyboardInterrupt:
 	print "  Quit"
 	GPIO.cleanup()
