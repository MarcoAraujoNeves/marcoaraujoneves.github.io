---
cover: franck-cax85x-ddbk-unsplash.jpg
title: Connect a ESP32 board to Wi-Fi via Blluetooth
description: An approach to connect your custom IoT devices to the Internet
  without hard-coding your credentials.
category: iot
tags:
  - esp-32
  - ble
date: 2023-03-17T21:33:10.163Z
---
Hard-coded credentials are the fastest way to connect your ESP32 board to a Wi-Fi network. This method is straightforward and effective. However, if you need to use your device elsewhere or update your credentials, you must compile and re-upload the code to your board.

A better way to handle these situations is to incorporate a connection feature built using the BLE module. With this feature, you can use a smartphone to connect to your board, select a network, and enter its password. It is even more interesting when building custom IoT devices, which often run for extended periods with minimal maintenance.

I faced this problem when building an IoT platform for my final course project. One of the requirements was to allow the users to set up the system with minimal overhead, so hard-coded credentials were not an option.