#!/bin/sh
brightness=$1

openmilight "B0 F2 EA 73 $brightness 0E 70"
openmilight "B0 F2 EA 73 $brightness 0E 71"
openmilight "B0 F2 EA 73 $brightness 0E 72"
openmilight "B0 F2 EA 73 $brightness 0E 73"
openmilight "B0 F2 EA 73 $brightness 0E 74"

