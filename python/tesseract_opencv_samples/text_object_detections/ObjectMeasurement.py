import cv2
import numpy as np
from common.UtilsService import UtilService

path = '../images/cards.jpg'
webCam = False
cap = cv2.VideoCapture(0)
cap.set(10,160)
cap.set(3,1920)
cap.set(4,1080)
utils = UtilService()
while True:
    if webCam: success,img = cap.read()
    else: img = cv2.imread(path)
    img,conts = utils.getContours(img)
    # print('conts' ,conts)
    if len(conts)!=0:
        biggest =  conts[0][2]
        print(biggest)
        utils.warpImg(img,biggest,100,100)

    img = cv2.resize(img,(0,0),None,0.5,0.5)
    cv2.imshow("image",img)
    cv2.waitKey(1)