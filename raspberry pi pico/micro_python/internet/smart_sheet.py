import time

HOST = "192.168.0.160"
PORT = "3000"
USER_AGENT = "smart-sheet-agent"


def debug_command_response(uart, command):
    recv = bytes()
    while uart.any() > 0:
        recv += uart.read(1)
    res = recv.decode('utf-8')
    erase_len = len(command) + 3
    res = res[erase_len:]
    res = res[:5]
    print("CMD: " + command + " --->  execution response::: " + res)
    return res


def printIp(uart):
    ins = 'AT+CIFSR'
    executeInstruction(uart, ins)
    debug_command_response(uart, ins)
    time.sleep(2)

def executeInstruction(uart,instruction,debug=False):
    uart.write(instruction + '\r\n')
    time.sleep(0.6)
    if debug:
        debug_command_response(uart, instruction)
        time.sleep(2)


def prepareRequestHandler(uart,payload_length):
    ins = "Host:" + HOST + ""
    executeInstruction(uart,ins)
    ins = "User-Agent:" + USER_AGENT
    executeInstruction(uart, ins)
    ins = "Content-Type:application/json"
    executeInstruction(uart, ins)
    ins = "Content-Length:" + str(payload_length)
    executeInstruction(uart, ins)
    executeInstruction(uart, "")

def sendDataHandler(uart,payload,deviceName):
    payload_length = len(payload)
    # find request length
    req_length = 147
    req_length += len(deviceName + str(payload_length) + payload + USER_AGENT)
    ins = "AT+CIPSEND=" + str(req_length)
    executeInstruction(uart, ins,True)
    ins = "POST /devices/"+deviceName+"/data HTTP/1.1"
    executeInstruction(uart, ins,True)


def postDeviceData(value, paramName, deviceName, uart):
    print("new ... postDeviceData ::value: ", value)
    ins = 'AT+CIPSTART="TCP","' + HOST + '",' + PORT + ''
    print(':::::: send TCP command::::::' + ins)
    executeInstruction(uart, ins,True)

    # build payload and find its length
    payload = '{"' + paramName + '":' + str(value) + '}'
    sendDataHandler(uart,payload,deviceName)
    prepareRequestHandler(uart,len(payload))
    uart.write(payload + '\r\n')
    executeInstruction(uart, "")
    print("Data sent: " + payload)

