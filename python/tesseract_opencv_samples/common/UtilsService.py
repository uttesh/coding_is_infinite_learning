import cv2
import numpy as np

class UtilService:

    def getContours(self,img,cThr=[100,100],showcanny=False,minArea=1000,filter=0,draw=False):
        imgGray = cv2.cvtColor(img,cv2.COLOR_BGR2GRAY)
        imgBlur = cv2.GaussianBlur(imgGray,(5,5),1)
        imgCany = cv2.Canny(imgBlur,cThr[0],cThr[1])
        kernel = np.ones((5,5))
        imgDial = cv2.dilate(imgCany,kernel,iterations=3)
        imgThr = cv2.erode(imgDial,kernel,iterations=2)
        if showcanny: cv2.imshow('canny', imgThr)
        contours,hierchy = cv2.findContours(imgThr,cv2.RETR_EXTERNAL,cv2.CHAIN_APPROX_SIMPLE)
        finalContours = []
        for i in contours:
            area = cv2.contourArea(i)
            if area > minArea:
                peri = cv2.arcLength(i,True)
                approx = cv2.approxPolyDP(i,0.02*peri,True)
                bbox = cv2.boundingRect(approx)
                if filter > 0:
                    if len(approx) == filter:
                        finalContours.append([len(approx),area,approx,bbox,i])
                else:
                    finalContours.append([len(approx),area,approx,bbox,i])

        finalContours = sorted(finalContours,key = lambda x:x[1],reverse=True)
        if draw:
            for con in finalContours:
                cv2.drawContours(img,con[4],-1,(0,0,255),3)

        return img, finalContours


    def reorder(self,points):
        print(points.shape)
        points = points.reshape((4,2))
        add = points.sum(1)

    def warpImg(self,img,points,w,h):
        self.reorder(points)






