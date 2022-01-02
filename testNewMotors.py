
import signal
import sys
import gpiozero

import RPi.GPIO as GPIO

import time

from gpiozero import Servo
from time import sleep

servoLeft = gpiozero.Servo(13)
servoRight = gpiozero.Servo(12)

servoLeft.value = 1
servoRight.value = -1

sensor = 19 # define the GPIO pin our sensor is attached to

GPIO.setmode(GPIO.BCM) # set GPIO numbering system to BCM
GPIO.setup(sensor,GPIO.IN) # set our sensor pin to an input

sample = 100 # how many half revolutions to time
tcycle = 0
count = 0

start = 0
end = 0

total_start = 0
total_end = 0

def set_start(c):
    global start
    print("inside start")
    start = round(time.time(), 2)
    GPIO.cleanup()
    GPIO.setmode(GPIO.BCM) # set GPIO numbering system to BCM
    GPIO.setup(sensor,GPIO.IN)
    GPIO.add_event_detect(sensor, GPIO.FALLING, callback=set_end)

def set_end(c):
    global end
    print("inside end")
    end = round(time.time(), 2)
    GPIO.cleanup()
    GPIO.setmode(GPIO.BCM) # set GPIO numbering system to BCM
    GPIO.setup(sensor,GPIO.IN)
    GPIO.add_event_detect(sensor, GPIO.RISING, callback=get_rpm)

def get_rpm(c):
    print("get_rpm")
    end_one = end
    global count
    end_two = round(time.time(), 2)
    thigh = end_one - start
    tlow = end_two - end_one
    tcycle = thigh + tlow
    duty_cycle = round(100*(thigh/tcycle), 2)
    print(duty_cycle)
    if(duty_cycle == 97.1):
        count = count + 1
        print("count")
        print(count)
        if(count == sample):
            end_total = round(time.time(), 2)
            rpm=0
            rpm = round(((60/(end_total - start_total))*sample), 2)
            print(rpm)
        else:
            main()
    else:
        main()
        
def signal_handler(sig, frame):
    GPIO.cleanup()
    sys.exit(0)
    
def button_pressed_callback(channel):
    global count
    global start
    global end
    currentTime = time.time()
    dc=0
    theta=0
    if count == 0 :
        start=currentTime
    if count == 1 :
        end=currentTime
    if count == 2 :
        if not (1000 < currentTime-start < 1200):
            dc=((100*((end-start)/(currentTime-start))-2.9)*360)/(97.1-2.9+1)
            theta=(360-1)-((dc-29)*360) / (971-29+1)
            if(theta<0):
                theta=0
            elif(theta>(360-1)):
                theta=360-1
            print(theta)
        count=-1
    count = count + 1
    
def main():
    print("inside main")
    total_start = round(time.time(), 2)
    GPIO.add_event_detect(sensor, GPIO.BOTH, callback=button_pressed_callback, bouncetime=50)
    signal.signal(signal.SIGINT, signal_handler)
    signal.pause()

main()

#try:
#    while True: # create an infinte loop to keep the script running
#        time.sleep(0.1)
#except KeyboardInterrupt:
#    print ("  Quit")
#    GPIO.cleanup()