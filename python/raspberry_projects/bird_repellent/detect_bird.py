import cv2
import numpy as np
from playsound import playsound
from pygame import mixer
import os
import random
# for real time objects
cap = cv2.VideoCapture(0)
cap.set(3,640)
cap.set(4,480)

mixer.init(44100, -16, 2, 2048)

classNames =[]
classFile = 'object_detection_conf/coco.names'
with open(classFile,'rt') as f:
    classNames = f.read().rstrip('\n').split('\n')
# print(classNames)
configPath = 'object_detection_conf/ssd_mobilenet_v3_large_coco_2020_01_14.pbtxt'
weightsPath = 'object_detection_conf/frozen_inference_graph.pb'
net = cv2.dnn_DetectionModel(weightsPath, configPath)
net.setInputSize(320, 320)
net.setInputScale(1.0 / 127.5)
net.setInputMean((127.5, 127.5, 127.5))
net.setInputSwapRB(True)

soundList = []
soundsPath='sounds'
soundsFiles = os.listdir(soundsPath)
for sound in soundsFiles:
    soundFile = soundsPath+'/'+sound
    print('soundFile',soundFile)
    soundList.append(soundFile)

def isBirdDetected(objectName):
    if 'bird' in objectName:
        print("its bird")
        # playsound(random.choice(soundList))
        # playsound('sounds/applause2.wav')
        sound = mixer.Sound('sounds/bark.wav')
        # sound = mixer.Sound(random.choice(soundList))
        sound.play()

while True:
    success,img = cap.read()
    classIds,confd,bbox = net.detect(img,confThreshold=0.5)
    # print(classIds,bbox)
    bbox = list(bbox)
    confd = list(np.array(confd).reshape(1,-1)[0])
    confd = list(map(float,confd))
    # print(type(confd[0]))
    # print(confd)
    indices = cv2.dnn.NMSBoxes(bbox,confd,0.5,0.5)
    for i in indices:
        i = i[0]
        box = bbox[i]
        x,y,w,h = box[0],box[1],box[2],box[3]
        cv2.rectangle(img, (x,y),(x+w,h+y), color=(0, 255, 0), thickness=3)
        cv2.putText(img, classNames[classIds[i][0]-1].upper(), (box[0] + 10, box[1] + 50), cv2.FONT_HERSHEY_COMPLEX, 1,
                    (0, 255, 0), 2)
        dectectedObjectClass = classNames[classIds[i][0]-1]
        print('dectectedObjectClass ',dectectedObjectClass)
        isBirdDetected(dectectedObjectClass)
    # print(indices)
    # if len(classIds)!=0:
    #     for classId,confidence,box in zip(classIds.flatten(),confd.flatten(),bbox):
    #         cv2.rectangle(img,box,color=(0,255,0),thickness=3)
    #         cv2.putText(img,classNames[classId-1].upper(),(box[0]+10,box[1]+50),cv2.FONT_HERSHEY_COMPLEX,1,(0,255,0),2)
    cv2.imshow('object',img)
    cv2.waitKey(1)