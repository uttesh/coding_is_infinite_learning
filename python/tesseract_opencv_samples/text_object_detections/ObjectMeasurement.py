import cv2
import numpy as np
from common.UtilsService import UtilService

path = '../images/cards.png'
webCam = False
cap = cv2.VideoCapture(0)
cap.set(10,160)
cap.set(3,1920)
cap.set(4,1080)
scale = 3
wP = 210 * scale
hP = 297 * scale



utils = UtilService()
while True:
    if webCam: success,img = cap.read()
    else: img = cv2.imread(path)
    img,conts = utils.getContours(img,minArea=50000,filter=4)
    # print('conts' ,conts)
    if len(conts)!=0:
        biggest =  conts[0][2]
        print(biggest)
        imgWarp = utils.warpImg(img,biggest,wP,hP)
        # cv2.imshow("A4", imgWarp)
        imgContours2,conts2 = utils.getContours(imgWarp,minArea=2000,filter=4,cThr=[50,50],draw=True)
        if len(conts) != 0:
            for obj in conts2:
                cv2.polylines(imgContours2,[obj[2]],True,(0,255,0),2)
                nPoints = utils.reorder(obj[2])
                nW = round((utils.findDis(nPoints[0][0]//scale,nPoints[1][0]//scale)/10),1)
                nH = round((utils.findDis(nPoints[0][0]//scale,nPoints[2][0]//scale)/10),1)
                cv2.arrowedLine(imgContours2, (nPoints[0][0][0], nPoints[0][0][1]), (nPoints[1][0][0], nPoints[1][0][1]),
                                (255, 0, 255), 3, 8, 0, 0.05)
                cv2.arrowedLine(imgContours2, (nPoints[0][0][0], nPoints[0][0][1]), (nPoints[2][0][0], nPoints[2][0][1]),
                                (255, 0, 255), 3, 8, 0, 0.05)
                x, y, w, h = obj[3]
                cv2.putText(imgContours2, '{}cm'.format(nW), (x + 30, y - 10), cv2.FONT_HERSHEY_COMPLEX_SMALL, 1.5,
                            (255, 0, 255), 2)
                cv2.putText(imgContours2, '{}cm'.format(nH), (x - 70, y + h // 2), cv2.FONT_HERSHEY_COMPLEX_SMALL, 1.5,
                            (255, 0, 255), 2)
        cv2.imshow('A4', imgContours2)

    img = cv2.resize(img,(0,0),None,0.5,0.5)
    cv2.imshow("image",img)
    cv2.waitKey(1)