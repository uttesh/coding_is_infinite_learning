# Raspberry Pi 
Raspberry Pi related samples and projects using python.

## Setup:
Initial headless mode setup the raspberry pi.
 
Hardware:
1. Raspberry Pi 4.
2. USB type-c cable.
3. sd card with the card reader.

Software:
1. Imager by Raspberry foundation to get the latest PI os or NOOBs(https://www.raspberrypi.org/software/(Win: https://downloads.raspberrypi.org/imager/imager_1.4.exe))
2. VNC viewer.
3. Advance IP scanner( to find the connected raspi IP address for ssh).
4. Putty.exe or PowerShell ssh

Steps:
1. Install the imager downloaded from the raspberry pi official site.
2. Burn the respective OS to the SD card, the imager will provide all the options like choose sd card and OS.
3. On completion of the sd card bootable, open the boot sd card folder i.e. root folder in the sd card.
4. Create a file 'wpa_supplicant.conf' and provide the wifi details. (https://www.raspberrypi.org/documentation/configuration/wireless/headless.md).
5. Create an 'ssh' without any file extension.

Execution:
1. Insert the sd card to the Pi and connect the USB cable.
2. Open the advance IP scanner and find the raspberry IP address.
3. Using the IP address ssh to the Pi by putty/PowerShell using the default user name "pi" and password "raspberry".
4. On success ssh run the below commands.

```
pi > sudo raspi-config.

``` 
Select "Interfacing Options" and enable the "VNC" and "SSH" option and reboot the raspi.

5. Now connect through the VNC with the IP address provided on the advance pi scanner. if the VNC complain about "image can't be display desktop", run
```
pi > sudo raspi-config.

``` 
Select the "Advanced Option" and "Resolution" and set the resolution to the highest.
Now re-connect the VNC which will provide the Raspi view.

## Samples
1. LED blink: simple hello world to kick start the raspberry.
2. Camera module testing.
