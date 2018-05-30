---
title: 自制机器人系列（一）：简单轮式机器人
date: 2018-05-15 22:20:00
tags:
  - DIY
  - Robot
categories: 自制机器人系列
description: 本篇文章介绍自制简单轮式机器人的相关内容。
feature: /images/robot/robot.png
toc: true
comments: true
---

## 前言

制作这个项目的起因是大一下学期那会儿我通过学校图书馆里的《无线电》杂志开始接触Raspberry Pi卡片式计算机和Arduino微控制器，其中Raspberry Pi给当初什么都不懂的我留下了非常深刻的印象：**一个信用卡大小的板子竟然可以跑带有图形界面的GNU/Linux操作系统**。在强烈探索欲的驱使下，我从网上购买了两块Element14的Raspberry Pi一代Model B（现在早已经绝版了）板子以及其他相关配件，开始在Raspbian系统上自学Python和各种传感器的使用方法，后来为了检验一下自己的学习成果，于是我便花费几周的时间做了这个简单的轮式机器人。虽然它涉及的原理并不复杂，但是对于那会儿刚开始接触嵌入式的我来说，能成功搭建一个完整的机器人系统还是挺有挑战性的。

<!--more-->

## 概述

该简单轮式机器人是一个比较传统的入门级智能小车项目，它拥有遥控、避障、和等功能

最后，该机器人的代码可以从我的GitHub[仓库](https://github.com/myyerrol/raspberry_pi_simple_car)获得

## 原理

### 硬件

该轮式机器人的硬件核心由Arduino和Raspberry Pi组成，这里先简要介绍一下：Arduino是基于ATmega系列芯片的8位微控制器，开发团队对其硬件和软件进行了封装，大大简化用户的二次开发难度；Raspberry Pi则是基于ARM Cortex-A系列的微型计算机，它拥有强大的处理能力，可以在较短的时间内完成对大量数据的计算工作。这里我选择Arduino和Raspberry Pi首先是因为它们在国内外DIY界非常流行，有很多资料可以参考。此外，Arduino官方提供有很多库，方便读取硬件传感器的数据，非常适合作为机器人系统的下位机，而Raspberry Pi可以运行GNU/Linux操作系统，实时性虽差但是却拥有友好的用户界面，并且可以使用Python来做数据计算，作为上位机顺理成章。

当然，最初我是想只用Raspberry Pi来作为机器人的感知和控制核心，毕竟自己之前从来没有在GNU/Linux操作系统上使用高级编程语言来控制过底层硬件，不过后来经测试Raspberry Pi只能通过软件模拟出并不稳定的PWM后，我还是放弃了这个想法。。。以下是该机器人的硬件系统连接图：

![raspberry_pi_simple_car_fritzing](http://media.myyerrol.io/images/raspberry_pi_simple_car/raspberry_pi_simple_car_fritzing.png)

- #### Raspberry Pi

  从上图可以比较清晰地看到：硬件系统以Raspberry Pi和Arduino为核心，其中Raspberry Pi连接有L293D电机扩展板，可通过配置相应GPIO引脚的高低电平来控制四个直流减速电机旋转的方向和快慢；此外，Raspberry Pi还连接有SR04超声波模块和带有IIC接口的LCD1602显示屏，用于检测机器人与前方障碍物之间的距离并将数值显示在LCD1602上；最后，Raspberry Pi还连接有两个LED灯和一个有源蜂鸣器，两个LED灯被用作机器人左右转向的指示，而有源蜂鸣器则可以在机器人出现紧急情况时发出警报（如机器人距离前方或左右的障碍物非常近）。

- #### Arduino

  Arduino部分就比较简单了，它连接有三个LED灯，一个舵机和两个红外测距模块，其中三色LED灯用于表征机器人距离障碍物的距离（绿色表示距离在正常范围之外，黄色表示距离比较接近，红色则表示距离已经非常接近），舵机被用来控制超声波模块的探测范围，而两个红外测距模块则被安装在机器人的两侧，可以实时检测机器人距离左右障碍物的距离，从而达到避障的功能。

### 软件

该软件已经实现的功能有：蓝牙远程遥控、超声波避障、红外边缘检测等。虽然机器人已经加装有四路红外循迹模块，但是由于时间紧迫（那会儿已经临近期末考试，再不复习就该挂科了），所以红外循迹功能并未完成。

- #### Raspberry Pi

  > raspberry_pi_simple_car_lib.py

  ```py
  import time
  import smbus
  import RPi.GPIO as gpio

  motor_run_left        = 17
  motor_run_right       = 10
  motor_direction_left  = 4
  motor_direction_right = 25
  led_left              = 7
  led_right             = 8
  ultrasonic_trig       = 23
  ultrasonic_echo       = 24
  servo                 = 11
  buzzer                = 18
  lcd_address           = 0x27
  data_bus = smbus.SMBus(1)

  class RaspberryPiSimpleCar:
      def __init__(self):
          gpio.setmode(gpio.BCM)
          gpio.setup(motor_run_left, gpio.OUT)
          gpio.setup(motor_run_right, gpio.OUT)
          gpio.setup(motor_direction_left, gpio.OUT)
          gpio.setup(motor_direction_right, gpio.OUT)
          gpio.setup(led_left, gpio.OUT)
          gpio.setup(led_right, gpio.OUT)

      def set_motors(self, run_left, direction_left, run_right, direction_right):
          gpio.output(motor_run_left, run_left)
          gpio.output(motor_run_right, run_right)
          gpio.output(motor_direction_left, direction_left)
          gpio.output(motor_direction_right, direction_right)

      def set_led_left(self, state):
          gpio.output(led_left, state)

      def set_led_right(self, state):
          gpio.output(led_right, state)

      def go_forward(self, seconds):
          if seconds == 0:
              self.set_motors(1, 1, 1, 1)
              self.set_led_left(1)
              self.set_led_right(1)
          else:
              self.set_motors(1, 1, 1, 1)
              time.sleep(seconds)
              gpio.cleanup()

      def go_reverse(self, seconds):
          if seconds == 0:
              self.set_motors(1, 0, 1, 0)
              self.set_led_left(0)
              self.set_led_right(0)
          else:
              self.set_motors(1, 0, 1, 0)
              time.sleep(seconds)
              gpio.cleanup()

      def go_left(self, seconds):
          if seconds == 0:
              self.set_motors(0, 0, 1, 1)
              self.set_led_left(1)
              self.set_led_right(0)
          else:
              self.set_motors(0, 0, 1, 1)
              time.sleep(seconds)
              gpio.cleanup()

      def go_right(self, seconds):
          if seconds == 0:
              self.set_motors(1, 1, 0, 0)
              self.set_led_left(0)
              self.set_led_right(1)
          else:
              self.set_motors(1, 1, 0, 0)
              time.sleep(seconds)
              gpio.cleanup()

      def go_pivot_left(self, seconds):
          if seconds == 0:
              self.set_motors(1, 0, 1, 1)
              self.set_led_left(1)
              self.set_led_right(0)
          else:
              self.set_motors(1, 0, 1, 1)
              time.sleep(seconds)
              gpio.cleanup()

      def go_pivot_right(self, seconds):
          if seconds == 0:
              self.set_motors(1, 1, 1, 0)
              self.set_led_left(0)
              self.set_led_right(1)
          else:
              self.set_motors(1, 1, 1, 0)
              time.sleep(seconds)
              gpio.cleanup()

      def stop(self):
          self.set_motors(0, 0, 0, 0)
          self.set_led_left(0)
          self.set_led_right(0)

      def buzzing(self):
          gpio.setup(buzzer, gpio.OUT)
          gpio.output(buzzer, True)
          for x in range(5):
              gpio.output(buzzer, False)
              time.sleep(0.1)
              gpio.output(buzzer, True)
              time.sleep(0.1)

      def get_distance(self):
          gpio.setmode(gpio.BCM)
          gpio.setup(ultrasonic_trig, gpio.OUT)
          gpio.setup(ultrasonic_echo, gpio.IN)
          gpio.output(ultrasonic_trig, False)
          while gpio.input(ultrasonic_echo) == 0:
              start_time = time.time()
          while gpio.input(ultrasonic_echo) == 1:
              stop_time = time.time()
          duration = stop_time - start_time
          distance = (duration * 34300) / 2
          gpio.cleanup()
          return distance

      def send_command(self, command):
          buf = command & 0xF0
          buf |= 0x04
          data_bus.write_byte(lcd_address, buf)
          time.sleep(0.002)
          buf &= 0xFB
          data_bus.write_byte(lcd_address, buf)
          buf = (command & 0x0F) << 4
          buf |= 0x04
          data_bus.write_byte(lcd_address, buf)
          time.sleep(0.002)
          buf &= 0xFB
          data_bus.write_byte(lcd_address, buf)

      def send_data(self, data):
          buf = data & 0xF0
          buf |= 0x05
          data_bus.write_byte(lcd_address, buf)
          time.sleep(0.002)
          buf &= 0xFB
          data_bus.write_byte(lcd_address, buf)
          buf = (data & 0x0F) << 4
          buf |= 0x05
          data_bus.write_byte(lcd_address, buf)
          time.sleep(0.002)
          buf &= 0xFB
          data_bus.write_byte(lcd_address, buf)

      def initialize_lcd(self):
          try:
              self.send_command(0x33)
              time.sleep(0.005)
              self.send_command(0x32)
              time.sleep(0.005)
              self.send_command(0x28)
              time.sleep(0.005)
              self.send_command(0x0C)
              time.sleep(0.005)
              self.send_command(0x01)
          except:
              return False
          else:
              return True

      def clear_lcd(self):
          self.send_command(0x01)

      def print_lcd(self, x, y, lcd_string):
          if x < 0:
              x = 0
          if x > 15:
              x = 15
          if y < 0:
              y = 0
          if y > 1:
              y = 1
          address = 0x80 + 0x40 * y + x
          self.send_command(address)
          for lcd_char in lcd_string:
              self.send_data(ord(lcd_char))

      def move_servo_left(self):
          servo_range = 13
          gpio.setmode(gpio.BCM)
          gpio.setup(servo, gpio.OUT)
          pwm = gpio.PWM(servo, 100)
          pwm.start(0)
          while servo_range <= 23:
              pwm.ChangeDutyCycle(servo_range)
              servo_range += 1
              time.sleep(0.5)
          pwm.stop()

      def move_servo_right(self):
          servo_range = 13
          gpio.setmode(gpio.BCM)
          gpio.setup(servo, gpio.OUT)
          pwm = gpio.PWM(servo, 100)
          pwm.start(0)
          while servo_range >= 0:
              pwm.ChangeDutyCycle(servo_range)
              servo_range -= 1
              time.sleep(0.5)
          pwm.stop()
  ```

  ---

  > raspberry_pi_simple_car_run_1.py

  ```py
  import time
  import serial
  import random
  import Tkinter as tk
  import RPi.gpio as gpio
  from raspberry_pi_simple_car_lib import RaspberryPiSimpleCar

  raspberry_pi_simple_car = RaspberryPiSimpleCar()
  raspberry_pi_simple_car.initialize_lcd()
  port = "/dev/ttyUSB0"
  serial_to_arduino = serial.Serial(port, 9600)
  serial_from_arduino = serial.Serial(port, 9600)
  serial_from_arduino.flushInput()
  serial_to_arduino.write('n')

  def detecte_distance():
      distance = raspberry_pi_simple_car.get_distance()

      if distance >= 20:
          # Light up the green led.
          serial_to_arduino.write('g')
      elif distance >= 10:
          # Light up the yellow led.
          serial_to_arduino.write('y')
      elif distance < 10:
          # Light up the red led.
          serial_to_arduino.write('r')
          raspberry_pi_simple_car.buzzing()
          raspberry_pi_simple_car.__init__()
          raspberry_pi_simple_car.go_reverse(2)
          raspberry_pi_simple_car.__init__()
          raspberry_pi_simple_car.go_pivot_right(2)

      # Check the distance between wall and car's both sides.
      serial_to_arduino.write('k')
      data_from_arduino = serial_from_arduino.readline()
      data_from_arduino_int = int(data_from_arduino)

      # Car is too close to the left wall.
      if data_from_arduino_int == 01:
          raspberry_pi_simple_car.buzzing()
          raspberry_pi_simple_car.__init__()
          raspberry_pi_simple_car.go_right(2)
      # Car is too close to the right wall.
      elif data_from_arduino_int == 10:
          raspberry_pi_simple_car.buzzing()
          raspberry_pi_simple_car.__init__()
          raspberry_pi_simple_car.go_left(2)

  def input_key(event):
      raspberry_pi_simple_car.__init__()
      print 'Key', event.char
      key_press = event.char
      seconds = 0.05

      if key_press.lower() == 'w':
          raspberry_pi_simple_car.go_forward(seconds)
      elif key_press.lower() == 's':
          raspberry_pi_simple_car.go_reverse(seconds)
      elif key_press.lower() == 'a':
          raspberry_pi_simple_car.go_left(seconds)
      elif key_press.lower() == 'd':
          raspberry_pi_simple_car.go_right(seconds)
      elif key_press.lower() == 'q':
          raspberry_pi_simple_car.go_pivot_left(seconds)
      elif key_press.lower() == 'e':
          raspberry_pi_simple_car.go_pivot_right(seconds)
      elif key_press.lower() == 'o':
          gpio.cleanup()
          # Move the servo in forward directory.
          serial_to_arduino.write('o')
          time.sleep(0.05)
      elif key_press.lower() == 'h':
          gpio.cleanup()
          # Light up the logo.
          serial_to_arduino.write('h')
      elif key_press.lower() == 'j':
          gpio.cleanup()
          # Turn off the logo.
          serial_to_arduino.write('j')
      elif key_press.lower() == 'p':
          gpio.cleanup()
          # Move the servo in reverse directory.
          serial_to_arduino.write('p')
          time.sleep(0.05)
      elif key_press.lower() == 'i':
          gpio.cleanup()
          serial_to_arduino.write('m')
          # Enter the random run mode.
          serial_to_arduino.write('i')
          for z in range(20):
              x = random.randrange(0, 5)
              if x == 0:
                  for y in range(30):
                      detecte_distance()
                      raspberry_pi_simple_car.__init__()
                      raspberry_pi_simple_car.go_forward(0.05)
              elif x == 1:
                  for y in range(30):
                      detecte_distance()
                      raspberry_pi_simple_car.__init__()
                      raspberry_pi_simple_car.go_left(0.05)
              elif x == 2:
                  for y in range(30):
                      detecte_distance()
                      raspberry_pi_simple_car.__init__()
                      raspberry_pi_simple_car.go_right(0.05)
              elif x == 3:
                  for y in range(30):
                      detecte_distance()
                      raspberry_pi_simple_car.__init__()
                      raspberry_pi_simple_car.go_pivot_left(0.05)
              elif x == 4:
                  for y in range(30):
                      detecte_distance()
                      raspberry_pi_simple_car.__init__()
                      raspberry_pi_simple_car.go_pivot_right(0.05)

              data_from_arduino = serial_from_arduino.readline()
              data_from_arduino_int = int(data_from_arduino)

              if data_from_arduino_int == 1111:
                  raspberry_pi_simple_car.__init__()
                  raspberry_pi_simple_car.go_forward(0.05)
                  if data_from_arduino_int == 1111:
                      raspberry_pi_simple_car.__init__()
                      raspberry_pi_simple_car.stop()
                  elif data_from_arduino_int == 0000:
                      raspberry_pi_simple_car.__init__()
                      raspberry_pi_simple_car.go_forward(0.05)
                  elif data_from_arduino_int == 0100:
                      raspberry_pi_simple_car.__init__()
                      raspberry_pi_simple_car.go_left(0.05)
                  elif data_from_arduino_int == 1000 or \
                       data_from_arduino_int == 1100:
                      raspberry_pi_simple_car.__init__()
                      raspberry_pi_simple_car.go_left(0.08)
                  elif data_from_arduino_int == 0010:
                      raspberry_pi_simple_car.__init__()
                      raspberry_pi_simple_car.go_right(0.05)
                  elif data_from_arduino_int == 0001 or \
                       data_from_arduino_int == 0011:
                      raspberry_pi_simple_car.__init__()
                      raspberry_pi_simple_car.go_right(0.08)

          serial_to_arduino.write('l')

      elif key_press.lower() == 'u':
          gpio.cleanup()
          raspberry_pi_simple_car.print_lcd(1, 0, 'UltrasonicWare')
          raspberry_pi_simple_car.print_lcd(1, 1, 'Distance:%.lf CM' %
                                            raspberry_pi_simple_car.get_distance())
      else:
          pass

      distance = raspberry_pi_simple_car.get_distance()

      if distance >= 20:
          serial_to_arduino.write('g')
      elif distance >= 10:
          serial_to_arduino.write('y')
      elif distance < 10:
          serial_to_arduino.write('r')
          raspberry_pi_simple_car.buzzing()
          raspberry_pi_simple_car.__init__()
          raspberry_pi_simple_car.go_reverse(2)

      serial_to_arduino.write('k')
      data_from_arduino = serial_from_arduino.readline()
      data_from_arduino_int = int(data_from_arduino)

      if data_from_arduino_int == 1:
          raspberry_pi_simple_car.buzzing()
          raspberry_pi_simple_car.__init__()
          raspberry_pi_simple_car.go_right(2)
      elif data_from_arduino_int == 10:
          raspberry_pi_simple_car.buzzing()
          raspberry_pi_simple_car.__init__()
          raspberry_pi_simple_car.go_left(2)

  try:
      command = tk.Tk()
      command.bind('<KeyPress>', input_key)
      command.mainloop()
  except KeyboardInterrupt:
      gpio.cleanup()
  ```

  ---

  > raspberry_pi_simple_car_run_2.py

  ```py
  import Tkinter as tk
  import RPi.GPIO as gpio
  from raspberry_pi_simple_car_lib import RaspberryPiSimpleCar

  raspberry_pi_simple_car = RaspberryPiSimpleCar()
  raspberry_pi_simple_car.initialize_lcd()

  def input_key(event):
      print 'Key', event.char
      key_press = event.char
      seconds = 0.05

      if key_press.lower() == 'w':
          raspberry_pi_simple_car.go_forward(seconds)
      elif key_press.lower() == 's':
          raspberry_pi_simple_car.go_reverse(seconds)
      elif key_press.lower() == 'a':
          raspberry_pi_simple_car.go_left(seconds)
      elif key_press.lower() == 'd':
          raspberry_pi_simple_car.go_right(seconds)
      elif key_press.lower() == 'q':
          raspberry_pi_simple_car.go_pivot_left(seconds)
      elif key_press.lower() == 'e':
          raspberry_pi_simple_car.go_pivot_right(seconds)
      elif key_press.lower() == 'o':
          raspberry_pi_simple_car.move_servo_left()
      elif key_press.lower() == 'p':
          raspberry_pi_simple_car.move_servo_right()
      else:
          pass

      distance = raspberry_pi_simple_car.get_distance()
      raspberry_pi_simple_car.print_lcd(1, 0, 'UltrasonicWare')
      raspberry_pi_simple_car.print_lcd(1, 1, 'Distance:%.lf CM' % distance)
      print "Distance: %.1f CM" % distance

      if distance < 10:
          raspberry_pi_simple_car.__init__()
          raspberry_pi_simple_car.go_reverse(2)

  try:
      command = tk.Tk()
      command.bind('<KeyPress>', input_key)
      command.mainloop()
  except KeyboardInterrupt:
      gpio.cleanup()
  ```

  ---

  > raspberry_pi_simple_car_run_3.py

  ```py
  import sys
  import pygame
  from pygame.locals import *
  import RPi.GPIO as gpio
  from raspberry_pi_simple_car_lib import RaspberryPiSimpleCar

  raspberry_pi_simple_car = RaspberryPiSimpleCar()

  pygame.init()
  screen = pygame.display.set_mode((800, 800))
  font = pygame.font.SysFont("arial", 64)
  pygame.display.set_caption('RaspberryPiSimpleCar')
  pygame.mouse.set_visible(0)

  while True:
      gpio.cleanup()
      for event in pygame.event.get():
          if event.type == QUIT:
              sys.exit()
          if event.type == KEYDOWN:
              time = 0.03
          if event.key == K_UP or event.key == ord('w'):
              raspberry_pi_simple_car.go_forward(time)
          elif event.key == K_DOWN or event.key == ord('s'):
              raspberry_pi_simple_car.go_reverse(time)
          elif event.key == K_LEFT or event.key == ord('a'):
              raspberry_pi_simple_car.go_left(time)
          elif event.key == K_RIGHT or event.key == ord('d'):
              raspberry_pi_simple_car.go_right(time)
          elif event.key == ord('q'):
              raspberry_pi_simple_car.go_pivot_left(time)
          elif event.key == ord('e'):
              raspberry_pi_simple_car.go_pivot_right(time)
  ```

- #### Arduino

  > raspberry_pi_simple_car.ino

  ```c
  int      distance;
  int      distance_left;
  int      distance_right;
  int      motor_value;
  int      motor_value_a;
  int      motor_value_b;
  int      motor_value_c;
  int      motor_value_d;
  int      motor_a               = 6;
  int      motor_b               = 7;
  int      motor_c               = 8;
  int      motor_d               = 9;
  int      servo                 = 5;
  int      led                   = 2;
  int      led_red               = 13;
  int      led_yellow            = 12;
  int      led_green             = 11;
  int      distance_sensor_left  = 3;
  int      distance_sensor_right = 4;
  char     data;
  uint16_t angle                 = 1500;

  void setup()
  {
      // Set serial's baud rate.
      Serial.begin(9600);
      pinMode(motor_a, INPUT);
      pinMode(motor_b, INPUT);
      pinMode(motor_c, INPUT);
      pinMode(motor_d, INPUT);
      pinMode(servo, OUTPUT);
      pinMode(led , OUTPUT);
      pinMode(led_red, OUTPUT);
      pinMode(led_yellow, OUTPUT);
      pinMode(led_green, OUTPUT);
      pinMode(distance_sensor_left, INPUT);
      pinMode(distance_sensor_right, INPUT);
      pinMode(A0, OUTPUT);
      pinMode(A1, OUTPUT);
      pinMode(A2, OUTPUT);
      pinMode(A3, OUTPUT);
      pinMode(A4, OUTPUT);
      pinMode(A5, OUTPUT);
  }

  void loop()
  {
      if (Serial.available()) {
          switch(Serial.read()) {
              // Light up the logo.
              case 'h': {
                  digitalWrite(A0, HIGH);
                  digitalWrite(A1, HIGH);
                  digitalWrite(A2, HIGH);
                  digitalWrite(A3, HIGH);
                  digitalWrite(A4, HIGH);
                  digitalWrite(A5, HIGH);
                  break;
              }
              // Turn off the logo.
              case 'j': {
                  digitalWrite(A0, LOW);
                  digitalWrite(A1, LOW);
                  digitalWrite(A2, LOW);
                  digitalWrite(A3, LOW);
                  digitalWrite(A4, LOW);
                  digitalWrite(A5, LOW);
                  break;
              }
              // Move the servo in forward directory.
              case 'o' : {
                  angle += 50;
                  if (angle > 2500) {
                      angle = 2500;
                  }
                  break;
              }
              // Move the servo in reverse directory.
              case 'p' : {
                  angle -= 50;
                  if (angle < 500) {
                      angle = 500;
                  }
                  break;
              }
              case 'n': {
                  digitalWrite(led, HIGH);
                  break;
              }
              case 'm': {
                  digitalWrite(led, LOW);
                  break;
              }
              case 'g': {
                  // When the distance between objects and car is far enough,
                  // light the green led.
                  digitalWrite(led_green, HIGH);
                  digitalWrite(led_yellow, LOW);
                  digitalWrite(led_red, LOW);
                  break;
              }
              case 'y': {
                  // When the distance between objects and car is near enough,
                  // light the yellow led.
                  digitalWrite(led_yellow, HIGH);
                  digitalWrite(led_green, LOW);
                  digitalWrite(led_red, LOW);
                  break;
              }
              case 'r': {
                  // When the distance between objects and car is very near,
                  // light the red led.
                  digitalWrite(led_red, HIGH);
                  digitalWrite(led_yellow, LOW);
                  digitalWrite(led_green, LOW);
                  break;
              }
              case 'k': {
                  // Return distance sensor's state between objects and car.
                  distance_left = digitalRead(distance_sensor_left);
                  distance_right = digitalRead(distance_sensor_right);
                  distance = distance_left * 10 + distance_right ;
                  Serial.println(distance, DEC);
                  break;
              }
              case 'i': {
                  while (1) {
                      // Return motor's state to raspberry pi.
                      motor_value_a = digitalRead(motor_a);
                      motor_value_b = digitalRead(motor_b);
                      motor_value_c = digitalRead(motor_c);
                      motor_value_d = digitalRead(motor_d);
                      motor_value = motor_value_a * 1000 + motor_value_b * 100 +
                          motor_value_c * 10 + motor_value_d;
                      Serial.println(motor_value, DEC);
                      delay(1000);
                      data = Serial.read();
                      if (data == 'l') {
                          break;
                      }
                  }
              }
              default:
                  break;
          }
      }
      // Delay enough time for servo to move position.
      digitalWrite(servo, HIGH);
      delayMicroseconds(angle);
      digitalWrite(servo, LOW);
      delay(15);
  }
  ```

### 成果

以下是制作完成后的成果图：

![raspberry_pi_simple_car_1](http://media.myyerrol.io/images/raspberry_pi_simple_car/raspberry_pi_simple_car_1.jpg)

![raspberry_pi_simple_car_2](http://media.myyerrol.io/images/raspberry_pi_simple_car/raspberry_pi_simple_car_2.jpg)

![raspberry_pi_simple_car_3](http://media.myyerrol.io/images/raspberry_pi_simple_car/raspberry_pi_simple_car_3.jpg)

![raspberry_pi_simple_car_4](http://media.myyerrol.io/images/raspberry_pi_simple_car/raspberry_pi_simple_car_4.jpg)

![raspberry_pi_simple_car_5](http://media.myyerrol.io/images/raspberry_pi_simple_car/raspberry_pi_simple_car_5.jpg)

<div style="height: 0; padding-bottom: 60%; position: relative;">
  <iframe width="498" height="510" src="http://player.youku.com/embed/XNzMzMzcxNjU2" frameborder="0" allowfullscreen="" style="position: absolute; height: 100%; width: 100%;">
  </iframe>
</div>

## 总结

虽然现在回过头来再看自己当初大一做的项目，觉得原理非常简单，但就是它让我第一次体验到了做软硬件项目的乐趣，同时也让我开始真正喜欢上了嵌入式开发，并逐渐走上了专业化的道路。每个人都应该有自己的梦想，那这个简单的轮式小车就是我梦想的起点，激励着我不断向前！

{% alert info %}
普通个人转载请注明出处。获得许可后，要求转载时保留注明出处和网站链接，谢谢！
{% endalert %}
