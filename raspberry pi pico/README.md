# Raspberry Pi Pico setup
Learning steps of Raspberry Pi Pico

### Initial setup and boot Pico
Press the BOOTSEL button, connect to the USB to computer and Pico will connect as pendrive.

## Micropython

### Setup MicroPython
1. Download the MicroPython UF2 file from official Raspberry Pi Pico website.
2. Drag and Drop to the Pico drive.
3. Add any MicroPython code to the code.py.

### Setup Thonny Editor
1. Install Thonny editor.
2. select proper interpreter i.e. Run -> Select Interpreter -> MicroPython (Raspberry Pi Pico)
3. from Menu selcted view -> File for the pico and system files view.

### Run and Stop execution
1. Ctrl + D to soft run of the python code
2. Ctrl + C to stop the execution.

### Micropython Samples.

1. Simple Blinking board led to test the board and micro python.

----------------------------------------------------------------

## CircuitPython Setup

CircuitPython is subset from MicroPython, which provide the lot of devices control using the python coding and modules.

### Setup CircuitPython
1. Download the CircuitPython UF2 file from official CircuitPython website (https://circuitpython.org/downloads).
2. Drag and Drop to the Pico drive.

### Setup Thonny Editor
1. Install Thonny editor.
2. select proper interpreter i.e. Run -> Select Interpreter -> MicroPython (Raspberry Pi Pico)
3. from Menu selcted view -> File for the pico and system files view.

### Install required libraries.

1. Tools -> Manage Packages... -> Search the required libraries and install


## CircuitePython Samples.

1. Mouse Jiggler:
This simple program will move the mouse on the usb connected computer or mobile without install any software on the computer/mobile.

Step1: Download the "adafruit_hid" library and install on the Pico through Thonny.
Step2: Copy the mouse_jiggler.py code to the "code.py" and execute.
