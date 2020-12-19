import cv2
from pyzbar.pyzbar import decode
import numpy as np

cap = cv2.VideoCapture(0)
cap.set(3,640)
cap.set(4,480)

while True:
    # img = cv2.imread("qr_sample1.png");
    success,img = cap.read()
    for qrcode in decode(img):
        data = qrcode.data.decode('utf-8')
        print(data)
        pts = np.array([qrcode.polygon],np.int32)
        print('pts array: ',pts)
        pts = pts.reshape((-1,1,2))
        print('pts reshape: ', pts)
        pts2 = qrcode.rect
        cv2.polylines(img,[pts],True,(255,0,255),5)
        cv2.putText(img,data,(pts2[0],pts2[1]),cv2.FONT_HERSHEY_COMPLEX,0.9,(255,0,255),2)
    cv2.imshow("qr_code",img)
    cv2.waitKey(1)
