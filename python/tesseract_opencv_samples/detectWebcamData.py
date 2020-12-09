import cv2
import pytesseract
import numpy as np
from PIL import ImageGrab
import time

pytesseract.pytesseract.tesseract_cmd = 'C:\\Program Files\\Tesseract-OCR\\tesseract.exe'

cap = cv2.VideoCapture(0)
cap.set(3,640)
cap.set(4,480)

def captureScreen(bbox=(300,300,1500,1000)):
    capScr = np.array(ImageGrab.grab(bbox))
    capScr = cv2.cvtColor(capScr,cv2.COLOR_RGB2BGR)
    return capScr

while True:
    timer = cv2.getTickCount()
    _,img = cap.read()
    # img = captureScreen()
    imgHeight,imgWidth,_ = img.shape
    boxes = pytesseract.image_to_boxes(img)
    for b in boxes.splitlines():
        b = b.split(' ')
        x,y,h,w = int(b[1]),int(b[2]),int(b[3]),int(b[4])
        cv2.rectangle(img, (x,imgHeight- y), (w,imgHeight - h), (50, 50, 255), 2)
        cv2.putText(img, b[0], (x, imgHeight - y + 25), cv2.FONT_HERSHEY_SIMPLEX, 1, (50, 50, 255), 2)
    fps = cv2.getTickFrequency() / (cv2.getTickCount() - timer);

    cv2.imshow('img', img)
    cv2.waitKey(0)
