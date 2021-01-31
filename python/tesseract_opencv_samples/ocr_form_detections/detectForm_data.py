import cv2
import pytesseract
import os
import numpy as np

pixelThreshold=500

roi = [[(98, 984), (680, 1074), 'text', 'Name'],
       [(740, 980), (1320, 1078), 'text', 'Phone'],
       [(98, 1154), (150, 1200), 'box', 'Sign'],
       [(738, 1152), (790, 1200), 'box', 'Allergic'],
       [(100, 1418), (686, 1518), 'text', 'Email'],
       [(740, 1416), (1318, 1512), 'text', 'ID'],
       [(110, 1598), (676, 1680), 'text', 'City'],
       [(748, 1592), (1328, 1686), 'text', 'Country']]

pytesseract.pytesseract.tesseract_cmd = 'C:\\Program Files\\Tesseract-OCR\\tesseract.exe'

imgQuery = cv2.imread("images/Query.png")
h,w,c = imgQuery.shape
imgQuery =  cv2.resize(imgQuery,(w//3,h//3))


orb = cv2.ORB_create(nfeatures=1000)
kp1,desc1 = orb.detectAndCompute(imgQuery,None)
# imgKpts = cv2.drawKeypoints(imgQuery,kp1,None)

path = "images/UserForms"
userFormList = os.listdir(path)
print(userFormList)
per = 25
for index,form in enumerate(userFormList):
    img = cv2.imread(f'{path}/{form}')
    # img = cv2.resize(img, (w // 3, h // 3))
    # cv2.imshow(str(index),img)
    kp2,desc2 = orb.detectAndCompute(img,None)
    bf = cv2.BFMatcher(cv2.NORM_HAMMING)
    matches = bf.match(desc2,desc1)
    matches.sort(key= lambda x: x.distance)
    good = matches[:int(len(matches)*(per/100))]
    imgMatch = cv2.drawMatches(img,kp2,imgQuery,kp1,good[:100],None,flags=2)
    # imgMatch = cv2.resize(imgMatch, (w // 3, h // 3))
    # cv2.imshow(str(index),imgMatch)

    srcPoints = np.float32([kp2[m.queryIdx].pt for m in good]).reshape(-1,1,2)
    dstPoints = np.float32([kp1[m.trainIdx].pt for m in good]).reshape(-1, 1, 2)

    M,_ = cv2.findHomography(srcPoints,dstPoints,cv2.RANSAC,5.0)
    imgScan = cv2.warpPerspective(img,M,(w,h))
    # cv2.imshow(str(index),imgScan)
    imgShow = imgScan.copy()
    imgMask = np.zeros_like(imgShow)

    myData = []

    print(f'################## Extracting Data from Form {index}  ##################')

    for x,r in enumerate(roi):

        cv2.rectangle(imgMask, (r[0][0],r[0][1]),(r[1][0],r[1][1]),(0,255,0),cv2.FILLED)
        imgShow = cv2.addWeighted(imgShow,0.99,imgMask,0.1,0)

        imgCrop = imgScan[r[0][1]:r[1][1], r[0][0]:r[1][0]]
        # cv2.imshow(str(x), imgCrop)

        if r[2] == 'text':
            print('{} :{}'.format(r[3], pytesseract.image_to_string(imgCrop)))
            myData.append(pytesseract.image_to_string(imgCrop))
        if r[2] == 'box':
            imgGray = cv2.cvtColor(imgCrop, cv2.COLOR_BGR2GRAY)
            imgThresh = cv2.threshold(imgGray, 170, 255, cv2.THRESH_BINARY_INV)[1]
            totalPixels = cv2.countNonZero(imgThresh)
            if totalPixels > pixelThreshold:
                totalPixels = 1;
            else:
                totalPixels = 0
            print(f'{r[3]} :{totalPixels}')
            myData.append(totalPixels)
        cv2.putText(imgShow, str(myData[x]), (r[0][0], r[0][1]),
                    cv2.FONT_HERSHEY_PLAIN, 2.5, (0, 0, 255), 4)

    with open('DataOutput.csv', 'a+') as f:
        for data in myData:
            f.write((str(data) + ','))
        f.write('\n')

    # imgShow = cv2.resize(imgShow, (w // 3, h // 3))
    print(myData)

# cv2.imshow("imgQuery",imgKpts)
cv2.waitKey(0)
