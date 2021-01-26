import cv2
import numpy as np

img1 = cv2.imread('queryimages/the-best-ps5-games_aqfs.1080.jpg',0)
img2 = cv2.imread('trainimages/ps5-game-boxes.jpg',0)
# img2 = cv2.imread('trainimages/91KZJEFXHYL._AC_SY450_.jpg',0)

img1 = cv2.resize(img1,(600,600),None)

orb = cv2.ORB_create(nfeatures=1000)

kp1,des1 = orb.detectAndCompute(img1,None)
kp2,des2 = orb.detectAndCompute(img2,None)
# imgKp1 = cv2.drawKeypoints(img1,kp1,None)
# imgKp2 = cv2.drawKeypoints(img2,kp2,None)
# print(des1[0])

bf = cv2.BFMatcher()
matches = bf.knnMatch(des1,des2,k=2)

good = []

for m,n in matches:
    if m.distance < 0.75*n.distance:
        good.append([m])
print(len(good))
img3 = cv2.drawMatchesKnn(img1,kp1,img2,kp2,good,None,flags=2)

cv2.imshow("img3",img3)


# cv2.imshow('imgKp1',imgKp1)
# cv2.imshow('imgKp2',imgKp2)
# cv2.imshow('img1',img1)
# cv2.imshow('img2',img2)
cv2.waitKey(0)