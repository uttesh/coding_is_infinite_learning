import machine
import utime
from lcd_pico import *
from machine import Pin

led = Pin(25,Pin.OUT)
led.high()

setupLCD()

displayString(1,0,"WELCOME")
displayString(2,0,"TO")
led.low()
longDelay(4000)
while(True):
    displayString(1,0,"TEST")
    displayString(2,0,"ROW")
    longDelay(1000)
    clearScreen()
    longDelay(500)
