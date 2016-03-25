#!/bin/sh

color=$1
case "$color" in
   "red") color=19;
   ;;
   "blue") color=BA;
   ;;
   "green") color=73;
   ;;
   "orange") color=33;
   ;;
   "white") ./white.sh;
   ;;
   "disco") ./disco.sh;
   ;;
   "dark") ./dark.sh;
   ;;
   "bright") ./bright.sh;
   ;;
   "nicegreen") ./nice_green.sh;
   ;;
esac

openmilight "B8 F2 EA $color 00 0F 70"
openmilight "B8 F2 EA $color 00 0F 71"
openmilight "B8 F2 EA $color 00 0F 72"
openmilight "B8 F2 EA $color 00 0F 73"
openmilight "B8 F2 EA $color 00 0F 74"
