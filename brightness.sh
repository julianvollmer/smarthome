#!/bin/sh
bulbId=$1
brightness=$2

openmilight "B0 $bulbId EA 73 $brightness 0E 70"
openmilight "B0 $bulbId EA 73 $brightness 0E 71"
openmilight "B0 $bulbId EA 73 $brightness 0E 72"
openmilight "B0 $bulbId EA 73 $brightness 0E 73"
openmilight "B0 $bulbId EA 73 $brightness 0E 74"

