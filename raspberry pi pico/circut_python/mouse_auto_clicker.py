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

def mouse_click():
    led.value = True
    mouse.click(Mouse.LEFT_BUTTON)
    led.value = False
    time.sleep(5)
    

while True:
    mouse_click()
    
