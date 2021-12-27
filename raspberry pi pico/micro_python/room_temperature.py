"""
PICO board provide the on board temperature sensor that can be used to get the room temperature
"""

import machine
from machine import Pin
import utime as time

sensor_time = machine.ADC(4)
conversion_factor = 3.3 /(65535)

led = Pin(25, Pin.OUT)
led.low()
def get_room_temperature():
    led.high()
    reading = sensor_time.read_u16() * conversion_factor
    temperature = 27 - (reading - 0.706) / 0.001721
    print(temperature)
    led.low()
    time.sleep(5)
