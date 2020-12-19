import cv2
import numpy as np
import face_recognition

imgTrain =  face_recognition.load_image_file('..\images\person\Elon-Musk-2010.jpg')
imgTrain = cv2.cvtColor(imgTrain,cv2.COLOR_BGR2RGB)

imgTest =  face_recognition.load_image_file('..\images\person\Elon_Musk_Test.jpg')
imgTest = cv2.cvtColor(imgTest,cv2.COLOR_BGR2RGB)


faceLocationTrainImg = face_recognition.face_locations(imgTrain)[0]
encodeTrainImage = face_recognition.face_encodings(imgTrain)[0]

faceLocationTestImg = face_recognition.face_locations(imgTest)[0]
encodeTestImage = face_recognition.face_encodings(imgTest)[0]

result = face_recognition.compare_faces([encodeTrainImage],encodeTestImage)
faceDist = face_recognition.face_distance([encodeTrainImage],encodeTestImage)
print(result,faceDist)
cv2.putText(imgTest,f'{result} {round(faceDist[0],2)}',(50,50),cv2.FONT_HERSHEY_COMPLEX,1,(0,0,255),2)
cv2.rectangle(imgTrain,(faceLocationTrainImg[3],faceLocationTrainImg[0]),(faceLocationTrainImg[1],faceLocationTrainImg[2]),(255,0,255),2)
cv2.imshow('Image Train',imgTrain)
cv2.rectangle(imgTest,(faceLocationTestImg[3],faceLocationTestImg[0]),(faceLocationTestImg[1],faceLocationTestImg[2]),(255,0,255),2)
cv2.imshow('Image Test',imgTest)
cv2.waitKey(0)