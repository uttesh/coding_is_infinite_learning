from machine import UART
import machine
import _thread
import time
from smart_sheet import postDeviceData
from smart_sheet import printIp

uart = UART(1, 115200)

print('-- UART Serial --')
print('>', end='')

# Define all constants
SSID = ""
PASSWORD = ""
DEVICE_LABEL = "raspberry-pi-pico"
VARIABLE_LABEL = "temperature"
USER_AGENT = "randomstring"

def uartSerialRxMonitor(command):
    print('command:: ', command)
    recv = bytes()
    while uart.any() > 0:
        recv += uart.read(1)
    res = recv.decode('utf-8')
    erase_len = len(command) + 5
    res = res[erase_len:]
    print("uartSerialRxMonitor :: res::", res)
    return res


def wifi_is_connected():
    res = ""
    send = "AT+CWJAP?"
    uart.write(send + '\r\n')
    time.sleep(4)
    res = wifi_is_connected_response(send)
    if res == "No AP":
        print("WiFi Status:" + res)
    return res

def wifi_is_connected_response(command):
    recv = bytes()
    while uart.any() > 0:
        recv += uart.read(1)
    res = recv.decode('utf-8')
    erase_len = len(command) + 3
    res = res[erase_len:]
    res = res[:5]
    return res

def wifi_connect(SSID, PASSWORD):
    res = ""
    send = "AT+CWJAP=\"" + SSID + "\",\"" + PASSWORD + "\""
    uart.write(send + '\r\n')
    time.sleep(7)
    res = uartSerialRxMonitor(send)
    print("Attempting to connect to WiFi..." + res)
    return res

# Here the code begins to run (Similar to arduino's setup())

wifi_connect(SSID, PASSWORD)
time.sleep(10)
send = 'AT+CWMODE=1'
uart.write(send + '\r\n')
time.sleep(1)
send = 'AT+CIPMUX=0'
uart.write(send + '\r\n')
time.sleep(1)
# temperature reading
sensor_temp = machine.ADC(4)
conversion_factor = 3.3 / (65535)
print("Setup done")


while True:
    # temperature reading
    reading_temp = sensor_temp.read_u16() * conversion_factor
    temperature = 27 - (reading_temp - 0.706) / 0.001721
    state = wifi_is_connected()
    print("wifi_is_connected: state: " + str(state))
    if state == "No AP":
        time.sleep(10)
        wifi_connect(SSID, PASSWORD)
    print("temperature: ", temperature)
    postDeviceData(temperature,"temperature","PICO",uart)
    time.sleep(3)


