@echo off
@echo Made by LitRanger
@echo For WiFi Users Only
netsh interface ipv4 set dns name="Wi-Fi" static 1.1.1.1
netsh interface ipv4 add dns name="Wi-Fi" 1.0.0.1 index=2
@echo
@pause