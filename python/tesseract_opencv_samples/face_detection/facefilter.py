import cv2
import dlib
import numpy as np

# img  = cv2.imread('../images/person/Uttesh.jpg')
cap = cv2.VideoCapture(0)

# img =  cv2.resize(img,(0,0),None,3,3)
# imgOriginal = img.copy()

detector = dlib.get_frontal_face_detector()
predictor = dlib.shape_predictor('conf/shape_predictor_68_face_landmarks.dat')
predictor5 = dlib.shape_predictor('conf/shape_predictor_5_face_landmarks.dat')

def createBox(img,points,scale=5,masked=False,cropped=True):

    if masked:
        mask = np.zeros_like(img)
        mask = cv2.fillPoly(mask,[points],(255,255,255))
        img = cv2.bitwise_and(img,mask)
        # cv2.imshow('mask', img)

    if cropped:
        bbox = cv2.boundingRect(points)
        x, y, w, h = bbox
        imgCrop = img[y:y + h, x:x + w]
        imgCrop = cv2.resize(imgCrop, (0, 0), None, scale, scale)
        return imgCrop

    else:
        return mask



def predictorDraw(count,img,myPoints,showMarkings=True):
    landmarks = predictor5(imgGray, face) if (count == 5) else predictor(imgGray, face)
    for n in range(count):
        x = landmarks.part(n).x
        y = landmarks.part(n).y
        myPoints.append([x,y])
        if showMarkings:
            cv2.circle(img, (x, y), 5, (50, 50, 255), cv2.FILLED)
            cv2.putText(img, str(n), (x, y - 10), cv2.FONT_HERSHEY_COMPLEX_SMALL, 0.8, (0, 0, 255))


while True:
    success,img = cap.read()
    img = cv2.resize(img, (0,0), None, 1, 1)
    imgOriginal = img
    imgGray =  cv2.cvtColor(img,cv2.COLOR_BGR2GRAY)
    faces =  detector(imgGray)
    myPoints = []
    for face in faces:
        x1,y1 = face.left(),face.top()
        x2,y2 =  face.right(),face.bottom()
        # imgOriginal = cv2.rectangle(img,(x1,y1),(x2,y2),(0,255,0),2 )
        predictorDraw(68,imgOriginal,myPoints,False)
    print(myPoints)
    myPoints = np.array(myPoints)
    if len(myPoints) > 0:
        imgLips = createBox(img,myPoints[48:61],3,masked=True,cropped=False)
        imgColorLips =  np.zeros_like(imgLips)
        imgColorLips[:] = 153,0,157
        imgColorLips = cv2.bitwise_and(imgLips,imgColorLips)
        imgColorLips = cv2.GaussianBlur(imgColorLips,(7,7),10)
        imgOriginalGray = cv2.cvtColor(imgOriginal,cv2.COLOR_BGR2GRAY)
        imgOriginalGray = cv2.cvtColor(imgOriginalGray, cv2.COLOR_GRAY2BGR)
        imgColorLips = cv2.addWeighted(imgOriginalGray,1,imgColorLips,0.4,0)
        cv2.imshow("imgColorLips", imgColorLips)



        cv2.imshow("imgLips",imgLips)
    cv2.imshow("img",imgOriginal)
    cv2.waitKey(1)

