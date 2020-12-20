import cv2
import numpy as np
import face_recognition
import os
from datetime import datetime

path = '..\images/users'
userImages = []
userNames = []
usersList = os.listdir(path)

for cl in usersList:
    curImg = cv2.imread(f'{path}\{cl}')
    userImages.append(curImg)
    userNames.append(os.path.splitext(cl)[0])


def findEncodings(images):
    encodings = []
    for img in images:
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        encode = face_recognition.face_encodings(img)[0]
        encodings.append(encode)
    return  encodings

def checkLogin(name):
    with open('Logins.csv', 'r+') as f:
        dataList = f.readlines()
        nameList = []
        for line in dataList:
            entry = line.split(',')
            nameList.append(entry[0])
        if(name not in nameList):
            now = datetime.now()
            dateStr = now.strftime('%H:%M:%S')
            f.writelines(f'\n{name},{dateStr}')

encodeListKnown = findEncodings(userImages)

cap = cv2.VideoCapture(0)

while True:
    success,img = cap.read()
    imgSmall = cv2.resize(img,(0,0),None,0.25,0.25)
    imgSmall = cv2.cvtColor(imgSmall,cv2.COLOR_BGR2RGB)

    faceCurFrame = face_recognition.face_locations(imgSmall)
    encodesCurFrame = face_recognition.face_encodings(imgSmall,faceCurFrame)

    for encodeFace,faceLoc in zip(encodesCurFrame,faceCurFrame):
        matches =  face_recognition.compare_faces(encodeListKnown,encodeFace)
        faceDis = face_recognition.face_distance(encodeListKnown,encodeFace)

        matchIndex = np.argmin(faceDis)

        if matches[matchIndex]:
            name = userNames[matchIndex].upper()
            # print(name)
            y1, x2, y2, x1 = faceLoc
            y1, x2, y2, x1 = y1 * 4, x2 * 4, y2 * 4, x1 * 4
            cv2.rectangle(img, (x1, y1), (x2, y2), (0, 255, 0), 2)
            cv2.rectangle(img, (x1, y2 - 35), (x2, y2), (0, 255, 0), cv2.FILLED)
            cv2.putText(img, name, (x1 + 6, y2 - 6), cv2.FONT_HERSHEY_COMPLEX, 1, (255, 255, 255), 2)
            checkLogin(name)

    cv2.imshow('Webcam', img)
    cv2.waitKey(1)

