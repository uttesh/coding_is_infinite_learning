# Setup ESP8266 with Raspberry Pi Pico

Follow the following connection to get the WIFI for the PICO.

1. Pico board pin 36 -> ESP8266 (3V3)
2. Pico board pin 36 -> ESP8266 (EN)
3. Pico board pin 3  -> ESP8266 (GND)
4. Pico board pin 6 (GP4) UART1 Tx ->  ESP8266 (Rx)
4. Pico board pin 7 (GP5) UART1 Rx ->  ESP8266 (Tx)

Connection diagram:

![PICO-ESP8266](https://github.com/uttesh/coding_is_infinite_learning/blob/master/raspberry%20pi%20pico/micro_python/internet/pico_esp8266.png)