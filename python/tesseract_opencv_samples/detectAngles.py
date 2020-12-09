import cv2
import math

img = cv2.imread('how-to-measure-angles.jpg')
points = []
def mousePoints(event,x,y,flags,params):
    if event == cv2.EVENT_FLAG_LBUTTON:
        cv2.circle(img,(x,y),5,(0,0,255),cv2.FILLED)
        points.append([x,y])

while True:
    cv2.imshow('image',img)
    cv2.setMouseCallback('image',mousePoints)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        points = []
        img = cv2.imread('how-to-measure-angles.jpg')