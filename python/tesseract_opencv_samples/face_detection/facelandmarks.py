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

def createBox(img,points,scale=5):
    bbox = cv2.boundingRect(points)
    x,y,w,h = bbox
    imgCrop =  img[y:y+h,x:x+w]
    imgCrop = cv2.resize(imgCrop,(0,0),None,scale,scale)
    return imgCrop

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
    img = cv2.resize(img, (0,0), None, 2, 2)
    imgOriginal = img
    imgGray =  cv2.cvtColor(img,cv2.COLOR_BGR2GRAY)
    faces =  detector(imgGray)
    myPoints = []
    for face in faces:
        x1,y1 = face.left(),face.top()
        x2,y2 =  face.right(),face.bottom()
        imgOriginal = cv2.rectangle(img,(x1,y1),(x2,y2),(0,255,0),2 )
        predictorDraw(68,imgOriginal,myPoints,True)
    print(myPoints)
    myPoints = np.array(myPoints)
    if len(myPoints) > 0:
        # imgLeftEye = createBox(img,myPoints[36:42])
        imgLips = createBox(img,myPoints[48:61])
        cv2.imshow("imgLips",imgLips)
        # imgEyes = createBox(img, myPoints[36:47])
        # cv2.imshow("eyes", imgEyes)
    cv2.imshow("img",imgOriginal)
    cv2.waitKey(1)

