import RPi.GPIO as GPIO
import time
import os
import urllib2
from datetime import datetime, timedelta


GPIO.setmode(GPIO.BCM)
PIR_PIN = 12
GPIO.setup(PIR_PIN, GPIO.IN)

lastMovement = datetime.now()
actualTime = datetime.now()
elapsedTime = actualTime - lastMovement

def MOTION(PIR_PIN):
	#os.system("echo Bewegung erkannt")
	#os.system('raspistill -vf -hf -o ~/cam2.jpg && mutt -s "Test from mutt" julianvollmerrpi@gmail.com < ~/test.txt -a ~/cam2.jpg')
	#os.system('mutt -s "Test from mutt" julianvollmerrpi@gmail.com < ~/test.txt')
	#response = urllib2.urlopen('http://127.0.0.1:3000/signal/F2/2')
	#response = urllib2.urlopen('http://127.0.0.1:3000/signal/F2/1')
	#html = response.read()
	global actualTime
	global lastMovement
	global elapsedTime

	actualTime = datetime.now()
	elapsedTime = actualTime - lastMovement
	os.system("date > ~/test.txt")
	#os.system("date")
	os.system("date >> ~/test_long.txt")
	print "elapsedTime: " + str(elapsedTime)

	#if elapsedTime > timedelta(hours=1):
	if elapsedTime > timedelta(minutes=59):
   		os.system('mutt -s "Zuhause ist aktiv" julianvollmerrpi@gmail.com < ~/test.txt')	
   		print "aktiv"

	lastMovement = datetime.now()
	actualTime = datetime.now()
	elapsedTime = actualTime - lastMovement

print "PIR Testscript (STRG+C zum beenden)"
time.sleep(2)
print "Bereit"
try:
     GPIO.add_event_detect(PIR_PIN, GPIO.RISING, callback=MOTION)
     while 1:
          time.sleep(1000)
except KeyboardInterrupt:
     print "Beenden"
GPIO.cleanup()
