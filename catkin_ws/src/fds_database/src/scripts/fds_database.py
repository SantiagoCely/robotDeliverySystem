#!/usr/bin/env python 
import rospy 
import sys 
import firebase_admin
import json
from rospy_message_converter import message_converter
from std_msgs.msg import String
from firebase_admin import credentials
from firebase_admin import firestore

# Use a service account
cred = credentials.Certificate('/home/user/catkin_ws/src/fds_database/src/scripts/ceg4912-3-firebase-adminsdk-85wn5-15b154d6f8.json')
firebase_admin.initialize_app(cred)

db = firestore.client()

users_ref = db.collection(u'Orders')
docs = users_ref.stream()
rospy.init_node('database')
pub=rospy.Publisher('/test', String, queue_size=100)
rate= rospy.Rate(5)
while not rospy.is_shutdown():
    for dictionary in docs:
        mm=dictionary.to_dict()
        message = json.dumps(mm)
        pub.publish(message)
        rate.sleep()
    