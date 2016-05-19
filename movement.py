import RPi.GPIO as GPIO
import time
import os
import urllib2
from datetime import datetime, timedelta

#startTime = datetime.strptime('Jun 1 2005  1:33PM', '%b %d %Y %I:%M%p')
#endTime = datetime.strptime('Jun 1 2005  1:33PM', '%b %d %Y %I:%M%p')
#print(date_object.strftime("%H:%M:%S"))


GPIO.setmode(GPIO.BCM)
PIR_PIN = 12
GPIO.setup(PIR_PIN, GPIO.IN)

def MOTION(PIR_PIN):
	os.system("echo Bewegung erkannt")
	#os.system('raspistill -vf -hf -o ~/cam2.jpg && mutt -s "Test from mutt" julianvollmerrpi@gmail.com < ~/test.txt -a ~/cam2.jpg')
	os.system('mutt -s "Test from mutt" julianvollmerrpi@gmail.com < ~/test.txt')
	#response = urllib2.urlopen('http://127.0.0.1:3000/signal/F2/2')
	#response = urllib2.urlopen('http://127.0.0.1:3000/signal/F2/1')
	#html = response.read()
	#print(time.strftime("%H:%M:%S"))
	#print(str(datetime.now()))
	#if(datetime.now() > startTime && datetime.now() < endTime)
	

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
