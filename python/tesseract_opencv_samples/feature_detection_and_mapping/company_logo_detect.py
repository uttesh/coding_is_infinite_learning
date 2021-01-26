import cv2
import os

path = 'logos_train'
logos = os.listdir(path)
logoImgs = []
companyNames = []
for logo in logos:
    logoImg = cv2.imread(f'{path}/{logo}')
    companyNames.append(os.path.splitext(logo)[0])
    logoImgs.append(logoImg)
#######################
orb = cv2.ORB_create(nfeatures=1000)

def findDescriptions(images):
    descriptionList = []
    for img in images:
        kp,desc = orb.detectAndCompute(img,None)
        descriptionList.append(desc)
    return descriptionList
descList = findDescriptions(logoImgs)

def findName(img,thre=20):
    kp2,des2 = orb.detectAndCompute(img,None)
    bf = cv2.BFMatcher()
    matchList = []
    finalVal = -1
    try:
        for des in descList:
            matches = bf.knnMatch(des,des2,k=2)
            good = []
            for m,n in matches:
                if m.distance < 0.75*n.distance:
                    good.append([m])
            matchList.append(len(good))
    except:
        pass
    # print(matchList)
    if len(matchList)!=0:
        if max(matchList) > thre:
            finalVal = matchList.index(max(matchList))
    return finalVal

cap = cv2.VideoCapture(0)

while True:
    success,img = cap.read()
    imgOriginal = img.copy()
    imgGray = cv2.cvtColor(img,cv2.COLOR_BGR2GRAY)
    name = findName(imgGray)
    if name!=-1:
        cv2.putText(imgOriginal,companyNames[name],(50,50),cv2.FONT_HERSHEY_SIMPLEX,2,(255,0,255),2)
    cv2.imshow("image",imgOriginal)
    cv2.waitKey(1)



