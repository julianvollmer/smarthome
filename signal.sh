#!/bin/sh
color=$1


case "$color" in
    "white") ./white.sh;
   ;;
   "disco") ./disco.sh;
   ;;
   "dark") ./dark.sh;
   ;;
   "bright") ./bright.sh;
   ;;
   "init") ./init.sh;
   ;;
   "on") ./on.sh;
   ;;
   "off") ./off.sh;
   ;;
esac
