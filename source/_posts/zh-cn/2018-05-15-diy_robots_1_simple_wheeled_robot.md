---
title: 自制机器人系列（一）：简单轮式机器人
date: 2018-05-15 22:20:00
tags:
  - DIY
  - Robot
categories: 自制机器人系列
description: 本篇文章介绍自制简单轮式机器人的相关内容。
feature: /images/features/robot.png
toc: true
comments: true
---

## 前言

制作这个项目的起因是大一下学期那会儿我通过学校图书馆里的《无线电》杂志开始接触Raspberry Pi卡片式计算机和Arduino微控制器，其中Raspberry Pi给当初什么都不懂的我留下了非常深刻的印象：**一个信用卡大小的板子竟然可以跑带有图形界面的GNU/Linux操作系统**。在强烈探索欲的驱使下，我从网上购买了两块Element14的Raspberry Pi一代Model B（现在早已经绝版了）板子以及其他相关配件，开始在Raspbian系统上自学Python和各种传感器的使用方法，后来为了检验一下自己的学习成果，于是我便花费几周的时间做了这个简单的轮式机器人。虽然它涉及的原理并不复杂，但是对于那会儿刚开始接触嵌入式的我来说，能成功搭建一个完整的机器人系统还是挺有挑战性的。

<!--more-->

## 概述

简单轮式机器人其实是一个比较传统的入门级智能小车，它拥有蓝牙远程遥控、超声波避障、红外边缘检测和红外巡线（未完成）等功能，可以完成一些有趣的小实验。此外，简单轮式机器人的软件是开源的，具体代码可以从我的GitHub[仓库](https://github.com/myyerrol/raspberry_pi_simple_car)上获得。

![raspberry_pi_simple_car_1](http://media.myyerrol.io/images/robots/raspberry_pi_simple_car/raspberry_pi_simple_car_1.jpg)

## 原理

### 硬件

以下是该简单轮式机器人的硬件系统连接图：

![raspberry_pi_simple_car_fritzing](http://media.myyerrol.io/images/robots/raspberry_pi_simple_car/raspberry_pi_simple_car_fritzing.png)

- #### 核心主控

  系统的硬件核心主控分别为Arduino和Raspberry Pi。其中Arduino主要负责接收红外光电测距模块的数据，并控制装有超声波模块的单轴舵机云台的旋转；而Raspberry Pi则可通过电机驱动模块来完成对四个直流减速电机转向和转速的控制，此外它还能接收超声波模块和从Arduino串口发送上来的红外光电测距模块的数据来判断当前机器人的前方和两侧是否遇到障碍物，若机器人与障碍物之间的距离小于一个特定的阈值，则Arduino和Raspberry Pi会分别改变LED的颜色并启动蜂鸣器来发出警报。

  当然，肯定会有人问：**为什么我不能仅用Raspberry Pi来作为机器人的核心主控，非要再用一个Arduino呢？**其实根据本项目的实际需求，确实只用一个Raspberry Pi就够了，不过对于我来说使用Arduino主要出于以下三个原因的考虑：

  - Raspberry Pi一代Model B板子的GPIO引脚数量只有26个，就算复用一些带有特殊功能的引脚，引脚资源依旧比较紧张。

  - Raspberry Pi官方提供的GPIO库虽然含有PWM函数，但是实际在控制舵机的时候可能是由于软件模拟的PWM方波还不够稳定，导致舵机抖动得比较厉害。

  - 可以学习Python的串口编程。

  因此，综合以上三个方面我选择了Arduino和Raspberry Pi双核心主控的系统架构。

- #### 外部电源

  因为时间比较紧张（那会儿快临近期末考试了），所以我没有在电源管理上花费太多的功夫。对于Arduino，我使用的是能装下6个1.5V干电池的的电池盒给其供电，而对于Raspberry Pi耗电量较大的需求，我是从大学舍友那借了一个充电宝来解决问题的，不过虽然供电可以了，但是由于充电宝的重量比较大，导致四个轮子受压偏大，使得遥控的精准度受到了一定的影响。

- #### 电机驱动

  机器人的电机驱动部分采用传统的L293D芯片，它是一款单片集成的高电压、高电流、四通道电机驱动芯片，其内部包含有两个双极型H桥电路，可通过设置IN1和IN2输入引脚的逻辑电平来控制电机的旋转方向，而EN使能引脚可连接到一路PWM上，通过调整PWM方波的占空比便可调整电机的转速。

- #### 数据感知

  为了能实现最基本的避障功能，我们需要为机器人配备有一些传感器。这里我使用的传感器为HC-SR04超声波测距模块和红外光电避障模块，其中红外光电避障模块具有一对红外线发射与接收管，运行时发射管会发射出一定频率的红外线，当检测方向遇到障碍物后，红外线会反射回来被接收管接收，经过比较电路处理之后，信号输出接口会输出一个低电平信号，这样只要在程序中对该接口的电平进行判断便能得知机器人是否距离障碍物比较近。

  与红外光电避障模块的工作原理类似，超声波模块能够向空中发射超声波信号，当其检测到反射回来的信号后，只需将超声波从发射到接收所用的时间乘上声速再除以二便能得到机器人和障碍物之间的距离，从而为之后的机器人避障做好准备。


### 软件

- #### Raspberry Pi库代码

  > raspberry_pi_simple_car_lib.py

  该库代码实现了GPIO引脚初始化函数、LED灯设置函数、蜂鸣器设置函数、电机控制函数、超声波测距函数和LCD1602显示函数，其中LCD1602显示函数调用了Python的SMBUS库来完成IIC数据通信，从而能将字符串显示在屏幕上（注意：SMBUS和IIC协议之间是存在区别的，但在Raspberry Pi上两者概念基本等同）。

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

- #### Raspberry Pi测试代码1

  > raspberry_pi_simple_car_run_1.py

  该代码调用了上面自己编写的机器人代码库，主要实现了超声波距离检测函数和键盘遥控函数，其中键盘遥控函数里面又根据所按按键的不同调用并组合上面代码库中的不同函数来完成某些特定的功能（比如机器人遇到障碍物后首先会发出警报，然后再进行相应的规避运动等）。

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

- #### Raspberry Pi测试代码2

  > raspberry_pi_simple_car_run_2.py

  该代码实现的功能比较简单，仅测试了机器人的电机遥控和超声波避障两个功能。

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

- #### Raspberry Pi测试代码3

  > raspberry_pi_simple_car_run_3.py

  该代码实现的功能与上面的测试代码2类似，只不过图形界面本代码里使用的是[Pygame](https://www.pygame.org/)而不是之前的[Tkinter](https://docs.python.org/2/library/tkinter.html)。

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

- #### Arduino测试代码

  > raspberry_pi_simple_car.ino

  该代码从逻辑上比较好理解，在`setup()`函数初始化引脚的模式和串口波特率后，主函数`loop()`会不断地从串口中读取字符数据，并根据字符的不同进行不同的处理工作。

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

以下是制作完成后的成果图和测试视频：

![raspberry_pi_simple_car_2](http://media.myyerrol.io/images/robots/raspberry_pi_simple_car/raspberry_pi_simple_car_2.jpg)

![raspberry_pi_simple_car_3](http://media.myyerrol.io/images/robots/raspberry_pi_simple_car/raspberry_pi_simple_car_3.jpg)

![raspberry_pi_simple_car_4](http://media.myyerrol.io/images/robots/raspberry_pi_simple_car/raspberry_pi_simple_car_4.jpg)

![raspberry_pi_simple_car_5](http://media.myyerrol.io/images/robots/raspberry_pi_simple_car/raspberry_pi_simple_car_5.jpg)

<div style="height:0; padding-bottom:65%; position:relative;">
  <!-- <iframe width="498" height="510" src="http://player.youku.com/embed/XNzMzMzcxNjU2" frameborder="0" allowfullscreen="" style="position:absolute; height:100%; width:100%;">
  </iframe> -->

  <iframe src="//player.bilibili.com/player.html?aid=77580434&cid=132719157&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" style="position:absolute; height:100%; width:100%;">
  </iframe>
</div>

## 总结

这个简单轮式机器人是大一那会儿我对自己课外所学知识的一个应用。虽然现在回过头再来看自己当初做的项目，感觉技术原理非常简单，远没有我之后研究的[ROS](http://www.ros.org/)和[MoveIt!](http://moveit.ros.org/)那么复杂，但是通过整个制作过程，我学会了如何根据项目需求去网上购买相关的材料，如何将主控等硬件设备安装在机器人机械结构最合理的位置上，如何使用IDE编写Arduino程序，如何在Raspberry Pi上使用Python语言来读取硬件数据并控制硬件，如何实现简单的串口通信等等。我一直认为兴趣是最好的老师，当你开始接触一个全新的领域时，兴趣可以成为你克服各种困难并鼓舞你前进的强大动力。当然，除了兴趣，更重要的是**亲自动手实践**，书上的东西讲得再好也是别人的，不是你的，就算重复造轮子也有着其无法替代的重要意义，**因为并不是每个人都能造得出轮子**，通过学习并实践前人所学习过的知识，你会收获别人不会有的宝贵经验！

最后，个人认为智能小车对于广大刚开始接触机器人的初学者来说确实是一个非常好的练手项目，你可以根据自己的喜好和技术水平的高低来定制属于你自己的智能小车，实现你想要的各种功能。总之，对于我来说，通过本次项目我开始真正喜欢上了嵌入式开发并逐渐走上了专业化的道路，每个人都应该有自己的梦想，那这个简单轮式机器人就是我梦想的起点，激励着我不断向前！当然，也希望大家能在制作机器人的道路上玩得开心并有所收获！

{% alert info %}
本博客所有文章除特别声明外，均采用CC BY-NC-SA 3.0许可协议。获得许可后，要求转载时注明文章出处和网站链接，谢谢！
{% endalert %}
