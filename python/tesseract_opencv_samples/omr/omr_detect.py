import cv2
import numpy as np
import utility

path = '../images/omr/1.jpg'
imageWidth = 600
imageHeight = 600
questions = 5
choices = 5
ans = [1,2,0,1,4]
#################################
img = cv2.imread(path)
img = cv2.resize(img,(imageWidth,imageHeight))
imgContours = img.copy()
imgFinal = img.copy()
imgBiggestContours = img.copy()
imgGray = cv2.cvtColor(img,cv2.COLOR_BGR2GRAY)
imgBlur = cv2.GaussianBlur(imgGray,(5,5),1)
imgCanny = cv2.Canny(imgBlur,10,50)

# Find all contours (corners in the image
contours,hierarchy = cv2.findContours(imgCanny,cv2.RETR_EXTERNAL,cv2.CHAIN_APPROX_NONE)
cv2.drawContours(imgContours,contours,-1,(0,255,0),10)

# find all rectangle in the contours
rectCon = utility.rectContour(contours)
biggerContour = utility.getCornerPoint(rectCon[0])
gradePoints = utility.getCornerPoint(rectCon[1])
print(biggerContour.shape)

if biggerContour.size!= 0 and gradePoints.size!=0:
    cv2.drawContours(imgBiggestContours,biggerContour,-1,(0,255,0),20)
    cv2.drawContours(imgBiggestContours,gradePoints,-1,(255,0,0),20)

    biggerContour = utility.reorder(biggerContour)
    gradePoints = utility.reorder(gradePoints)

    pt1 = np.float32(biggerContour)
    pt2 = np.float32([[0,0],[imageWidth,0],[0,imageHeight],[imageWidth,imageHeight]])
    matrix = cv2.getPerspectiveTransform(pt1,pt2)
    imgWarpColored = cv2.warpPerspective(img,matrix,(imageWidth,imageHeight))

    ptG1 = np.float32(gradePoints)
    ptG2 = np.float32([[0,0],[355,0],[0,150],[325,150]])
    matrixG = cv2.getPerspectiveTransform(ptG1,ptG2)
    imgGradDisplay = cv2.warpPerspective(img,matrixG,(325,150))
    # cv2.imshow("grade",imgGradDisplay)

    imgWarpGray = cv2.cvtColor(imgWarpColored,cv2.COLOR_BGR2GRAY)
    imgThresh = cv2.threshold(imgWarpGray,150,255,cv2.THRESH_BINARY_INV)[1]
    boxes = utility.splitBoxes(imgThresh)
    # cv2.imshow("boxes",boxes[4])
    # print(cv2.countNonZero(boxes[0]),cv2.countNonZero(boxes[1]),cv2.countNonZero(boxes[2]))

    myPixelValues = np.zeros((questions,choices))
    countCols=0
    countRows=0

    for image in boxes:
        totalPixel = cv2.countNonZero(image)
        myPixelValues[countRows][countCols]= totalPixel
        countCols+=1
        if countCols ==choices:
            countRows+=1
            countCols = 0
    # print(myPixelValues)

    # Finding the index values of the markings
    myIndex = []
    for x in range(0,questions):
        arr = myPixelValues[x]
        # print('arr',arr)
        # print('max', np.argmax(arr))
        myIndexValue =  np.argmax(arr)
        # print(myIndexValue)
        myIndex.append(myIndexValue)
    # print(myIndex)

    # Grading
    grading = []
    for x in range(0,questions):
        if ans[x] == myIndex[x]:
            grading.append(1)
        else:
            grading.append(0)
    # print(grading)

    score = (sum(grading)/questions)*100 # Final Grading
    print(score)

    #display answers
    imgResult = imgWarpColored.copy()
    imgResult = utility.showAnswers(imgResult, myIndex, grading, ans, questions, choices)

    imgRawDrawing = np.zeros_like(imgWarpColored)
    imgRawDrawing = utility.showAnswers(imgRawDrawing, myIndex, grading, ans, questions, choices)

    invMatrix = cv2.getPerspectiveTransform(pt2,pt1)
    imgInvWarp = cv2.warpPerspective(imgRawDrawing,invMatrix,(imageWidth,imageHeight))

    imgRawGrade = np.zeros_like(imgGradDisplay)
    cv2.putText(imgRawGrade,str(int(score))+"%",(50,100),cv2.FONT_HERSHEY_SIMPLEX,3,(0,255,0),3)
    # cv2.imshow("grade",imgRawGrade)
    invMatrixG = cv2.getPerspectiveTransform(ptG2,ptG1)
    imgInvGradDisplay = cv2.warpPerspective(imgRawGrade,invMatrixG,(imageWidth,imageHeight))


    imgFinal = cv2.addWeighted(imgFinal,1,imgInvWarp,1,0)
    imgFinal = cv2.addWeighted(imgFinal, 1, imgInvGradDisplay, 1, 0)



imgBlank = np.zeros_like(img)
imgArray = ([img,imgGray,imgBlur,imgCanny],
            [imgContours,imgBiggestContours,imgWarpColored,imgThresh],
            [imgResult,imgRawDrawing,imgInvWarp,imgFinal])
lables = [["Original","Gray","Blur","Canny"],
          ["Contours","Biggest Con","Warp","Threshold"],
          ["Result","Raw","Inv Warp","Final"]]

imgStacked = utility.stackImages(imgArray,0.3)


cv2.imshow("imgStacked",imgStacked)
cv2.waitKey(0)