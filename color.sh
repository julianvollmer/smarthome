#!/bin/sh
bulbId=$1
color=$2

openmilight "B8 $bulbId EA $color 00 0F 70"
openmilight "B8 $bulbId EA $color 00 0F 71"
openmilight "B8 $bulbId EA $color 00 0F 72"
openmilight "B8 $bulbId EA $color 00 0F 73"
openmilight "B8 $bulbId EA $color 00 0F 74"
