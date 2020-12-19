import cv2

class DetectObjectService:
    def __init__(self):
       self.setUpWebCam()
       self.configDetector()

    def setUpImagePath(self):
        img = cv2.imread('../images/gadgets.png')
        self.img = img


    def setUpWebCam(self):
        cap = cv2.VideoCapture(0)
        cap.set(3, 640)
        cap.set(4, 480)
        self.cap = cap

    def configDetector(self):
        classNames = []
        classFile = 'object_detection_conf/coco.names'
        with open(classFile, 'rt') as f:
            classNames = f.read().rstrip('\n').split('\n')
        print(classNames)
        configPath = 'object_detection_conf/ssd_mobilenet_v3_large_coco_2020_01_14.pbtxt'
        weightsPath = 'object_detection_conf/frozen_inference_graph.pb'
        net = cv2.dnn_DetectionModel(weightsPath, configPath)
        net.setInputSize(320, 320)
        net.setInputScale(1.0 / 127.5)
        net.setInputMean((127.5, 127.5, 127.5))
        net.setInputSwapRB(True)
        self.classNames = classNames
        self.net = net

    def normalDetect(self):
        success, img = self.cap.read()
        classIds, confd, bbox = self.net.detect(img, confThreshold=0.5)
        # print(classIds,bbox)
        if len(classIds) != 0:
            for classId, confidence, box in zip(classIds.flatten(), confd.flatten(), bbox):
                cv2.rectangle(img, box, color=(0, 255, 0), thickness=3)
                cv2.putText(img, self.classNames[classId - 1].upper(), (box[0] + 10, box[1] + 50), cv2.FONT_HERSHEY_COMPLEX,
                            1,
                            (0, 255, 0), 2)
        cv2.imshow('object', img)
        cv2.waitKey(1)

    def execute(self):
        while True:
            self.normalDetect()

detectObjectService = DetectObjectService()
detectObjectService.execute()


