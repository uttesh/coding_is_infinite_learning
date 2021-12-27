import time
import usb_hid
from adafruit_hid.mouse import Mouse
import board
import digitalio


mouse = Mouse(usb_hid.devices)

led = digitalio.DigitalInOut(board.GP25)
led.direction =  digitalio.Direction.OUTPUT

led.value = False
time.sleep(5)

def jiggle(xcordinates):
    led.value = True
    mouse.move(x=xcordinates)
    led.value = False
    time.sleep(0.5)
    

while True:
    jiggle(100)
    jiggle(-100)
    