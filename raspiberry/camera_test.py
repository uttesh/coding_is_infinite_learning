import picamera
import time

camera = picamera.PiCamera()
camera.vflip = True
#camera.capture('sample.jpg')
#camera.start_recording('samplevid.h264')
#time.sleep(10)
#camera.stop_recording()
camera.start_preview()
time.sleep(10)
camera.stop_preview()
print('done')

