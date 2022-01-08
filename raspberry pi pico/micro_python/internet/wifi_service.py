import time


def uartSerialRxMonitor(uart,command):
    print('command:: ', command)
    recv = bytes()
    while uart.any() > 0:
        recv += uart.read(1)
    res = recv.decode('utf-8')
    erase_len = len(command) + 5
    res = res[erase_len:]
    print("uartSerialRxMonitor :: res::", res)
    return res

def wifi_is_connected(uart):
    res = ""
    send = "AT+CWJAP?"
    uart.write(send + '\r\n')
    time.sleep(4)
    res = wifi_is_connected_response(uart,send)
    if res == "No AP":
        print("WiFi Status:" + res)
    return res

def wifi_is_connected_response(uart,command):
    recv = bytes()
    while uart.any() > 0:
        recv += uart.read(1)
    res = recv.decode('utf-8')
    erase_len = len(command) + 3
    res = res[erase_len:]
    res = res[:5]
    return res

def wifi_init(uart,SSID, PASSWORD):
    print('wifi_init............')
    wifi_connect(uart, SSID, PASSWORD)
    time.sleep(10)
    send = 'AT+CWMODE=1'
    uart.write(send + '\r\n')
    time.sleep(1)
    send = 'AT+CIPMUX=0'
    uart.write(send + '\r\n')
    time.sleep(1)
    print("Wifi setup done")

def wifi_connect(uart,SSID, PASSWORD):
    res = ""
    send = "AT+CWJAP=\"" + SSID + "\",\"" + PASSWORD + "\""
    uart.write(send + '\r\n')
    time.sleep(7)
    res = uartSerialRxMonitor(uart,send)
    print("Attempting to connect to WiFi..." + res)
    return res
