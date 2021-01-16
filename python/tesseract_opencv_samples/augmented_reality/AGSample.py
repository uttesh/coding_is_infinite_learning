import cv2
import numpy as np

cap = cv2.VideoCapture(0)
imageTarget = cv2.imread('card_1.png')
myVid = cv2.VideoCapture('sample.mp4')

success,imgVideo = myVid.read()
hT,wT,cT = imageTarget.shape
imgVideo = cv2.resize(imgVideo,(wT,hT))

orb = cv2.ORB_create(nfeatures=1000)
kp1, des1 = orb.detectAndCompute(imageTarget,None)
# imageTarget = cv2.drawKeypoints(imageTarget,kp1,None)
sampleImg =  cv2.imread('card_1.png')
while True:
    success,imgWebcam = cap.read()
    kp2, des2 = orb.detectAndCompute(imgWebcam,None)
    # imgWebcam = cv2.drawKeypoints(imgWebcam,kp2,None)
    bf =  cv2.BFMatcher()
    matches = bf.knnMatch(des1,des2,k=2)
    good = []
    for m,n in matches:
        if m.distance < 0.75 *n.distance:
            good.append(m)
    print(len(good))
    imgFeatures = cv2.drawMatches(imageTarget,kp1,imgWebcam,kp2,good,None,flags=2)

    if len(good) > 20:
        srcPts = np.float32([kp1[m.queryIdx].pt for m in good]).reshape(-1,1,2)
        dstPts = np.float32([kp2[m.trainIdx].pt for m in good]).reshape(-1, 1, 2)
        matrix,musk = cv2.findHomography(srcPts,dstPts,cv2.RANSAC,5)
        print(matrix)

        pts = np.float32([[0,0],[0,hT],[wT,hT],[wT,0]]).reshape(-1,1,2)
        dst = cv2.perspectiveTransform(pts,matrix)
        img2 =  cv2.polylines(imgWebcam,[np.int32(dst)],True,(255,0,255),3)
        cv2.imshow("img2", img2)
        imgWarp = cv2.warpPerspective(imgVideo,matrix,(imgWebcam.shape[1],imgWebcam.shape[0]))
        cv2.imshow("imgWarp", imgWarp)

    # cv2.imshow("imgFeatures", imgFeatures)

    # cv2.imshow("imageTarget",imageTarget)
    # cv2.imshow("imgVideo",imgVideo)
    # cv2.imshow("imgWebcam", imgWebcam)
    cv2.waitKey(1)
