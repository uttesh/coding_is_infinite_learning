import cv2
import math

img = cv2.imread('../images/how-to-measure-angles.jpg')
points = []
def mousePoints(event,x,y,flags,params):
    if event == cv2.EVENT_LBUTTONDOWN:
        size = len(points)
        if size != 0 and size % 3 != 0:
            cv2.line(img,tuple(points[round((size-1)/3)*3]),(x,y),(0,0,255),2)
        cv2.circle(img,(x,y),5,(0,0,255),cv2.FILLED)
        points.append([x,y])

#
# Get the gradient of points.
# point1 = (x1,y1)
# point2 = (x2,y2)
def gradient(pt1,pt2):
    return (pt2[1]-pt1[1])/(pt2[0]-pt1[0])

def getAngle(pointerList):
    pt1,pt2,pt3 = pointerList[-3:]
    m1 = gradient(pt1,pt2)
    m2 = gradient(pt1,pt3)
    angR = math.atan((m2-m1)/(1+(m2*m1)))
    angD = round((math.degrees(angR)))
    cv2.putText(img, str(angD), (pt1[0] - 40, pt1[1] - 20), cv2.FONT_HERSHEY_COMPLEX,
                1.5, (0, 0, 255), 2)

while True:

    if len(points) % 3 == 0 and len(points) !=0:
        getAngle(points)
    cv2.imshow('image',img)
    cv2.setMouseCallback('image',mousePoints)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        points = []
        img = cv2.imread('../images/how-to-measure-angles.jpg')