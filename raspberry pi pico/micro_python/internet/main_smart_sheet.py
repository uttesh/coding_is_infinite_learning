from machine import UART
import machine
import _thread
import time
from smart_sheet import postDeviceData
from smart_sheet import printIp
from wifi_service import wifi_init, wifi_connect, wifi_is_connected

uart = UART(1, 115200)
print('-- UART Serial --')
print('>', end='')
# Define all constants
SSID = ""
PASSWORD = ""
DEVICE_LABEL = "raspberry-pi-pico"
VARIABLE_LABEL = "temperature"
USER_AGENT = "randomstring"

wifi_init(uart, SSID, PASSWORD)
# temperature reading
sensor_temp = machine.ADC(4)
conversion_factor = 3.3 / (65535)

while True:
    # temperature reading

    reading_temp = sensor_temp.read_u16() * conversion_factor
    temperature = 27 - (reading_temp - 0.706) / 0.001721
    state = wifi_is_connected(uart)
    print("wifi_is_connected: state: " + str(state))
    if state == "No AP":
        time.sleep(10)
        wifi_connect(uart, SSID, PASSWORD)
    print("temperature: ", temperature)
    postDeviceData(temperature, "temperature", "PICO", uart)
    time.sleep(3)



