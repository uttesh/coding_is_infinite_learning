import cv2
import pytesseract

pytesseract.pytesseract.tesseract_cmd = 'C:\\Program Files\\Tesseract-OCR\\tesseract.exe'
img = cv2.imread("sample1.png")
img = cv2.cvtColor(img,cv2.COLOR_BGR2RGB)
# print(pytesseract.image_to_boxes(img))
height,width,_ = img.shape

def detectCharactors():
    boxes = pytesseract.image_to_boxes(img)
    for b in boxes.splitlines():
        # print(b) # get all the values
        b = b.split(' ')
        # print(b)
        x, y, w, h = int(b[1]), int(b[2]), int(b[3]), int(b[4])
        cv2.rectangle(img, (x, height - y), (w, height - h), (0, 0, 255), 1)
        # cv2.putText(img, b[0], (x, height - y), cv2.FONT_HERSHEY_COMPLEX, 1, (50, 50, 255), 3)

def detectWords():
    boxes = pytesseract.image_to_data(img)
    for x,b in enumerate(boxes.splitlines()):
        if x!=0:
         b = b.split()
         if len(b)==12:
             print(b)
             x, y, w, h = int(b[6]), int(b[7]), int(b[8]), int(b[9])
             cv2.rectangle(img, (x, y), (w+x, h+y), (0, 0, 255), 1)
             cv2.putText(img, b[11], (x,y), cv2.FONT_HERSHEY_PLAIN, 1, (50, 50, 255), 1)

def detectByConfig(config):
    boxes = pytesseract.image_to_data(img,config=config)
    for x,b in enumerate(boxes.splitlines()):
        if x!=0:
         b = b.split()
         if len(b)==12:
             print(b)
             x, y, w, h = int(b[6]), int(b[7]), int(b[8]), int(b[9])
             cv2.rectangle(img, (x, y), (w+x, h+y), (0, 0, 255), 1)
             cv2.putText(img, b[11], (x,y), cv2.FONT_HERSHEY_PLAIN, 1, (50, 50, 255), 1)



# detectCharactors()
# detectWords()
digit_config = r'--oem 3 --psm 6 outputbase digits'
detectByConfig(digit_config)
cv2.imshow('image',img)
cv2.waitKey(0)


