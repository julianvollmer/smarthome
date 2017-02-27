#!/bin/bash
#button=$1

#for i in `seq 1 10`;
#do
#	value=$(<counter.txt)
#	((value+=3))
#	printf -v hex_result "%x" "$value"
#	
#	if [[ "$value" -gt "255"  ]]; then
#		((value-=256));
#	fi
#
#	if [[ "$value" -lt "16"  ]]; then
#		hex_result=0$hex_result;
#	fi
#
#	echo $hex_result
#	openmilight "B8 F2 EA 00 91 1$button $hex_result"
#	echo "$value" > counter.txt
#done

openmilight "B8 F2 EA 73 00 11 70"
openmilight "B8 F2 EA 73 00 11 71"
openmilight "B8 F2 EA 73 00 11 72"
openmilight "B8 F2 EA 73 00 11 73"
openmilight "B8 F2 EA 73 00 11 74"
openmilight "B8 F2 EA 73 00 11 75"
openmilight "B8 F2 EA 73 00 11 76"
openmilight "B8 F2 EA 73 00 11 77"
openmilight "B8 F2 EA 73 00 11 78"
openmilight "B8 F2 EA 73 00 11 79"
openmilight "B8 F2 EA 73 00 11 7A"
openmilight "B8 F2 EA 73 00 11 7B"
openmilight "B8 F2 EA 73 00 11 7C"
openmilight "B8 F2 EA 73 00 11 7D"
openmilight "B8 F2 EA 73 00 11 7E"
openmilight "B8 F2 EA 73 00 11 7F"


openmilight "B8 00 EA 73 00 11 70"
openmilight "B8 00 EA 73 00 11 71"
openmilight "B8 00 EA 73 00 11 72"
openmilight "B8 00 EA 73 00 11 73"
openmilight "B8 00 EA 73 00 11 74"
openmilight "B8 00 EA 73 00 11 75"
openmilight "B8 00 EA 73 00 11 76"
openmilight "B8 00 EA 73 00 11 77"
openmilight "B8 00 EA 73 00 11 78"
openmilight "B8 00 EA 73 00 11 79"
openmilight "B8 00 EA 73 00 11 7A"
openmilight "B8 00 EA 73 00 11 7B"
openmilight "B8 00 EA 73 00 11 7C"
openmilight "B8 00 EA 73 00 11 7D"
openmilight "B8 00 EA 73 00 11 7E"
openmilight "B8 00 EA 73 00 11 7F"


openmilight "B8 01 EA 73 00 11 70"
openmilight "B8 01 EA 73 00 11 71"
openmilight "B8 01 EA 73 00 11 72"
openmilight "B8 01 EA 73 00 11 73"
openmilight "B8 01 EA 73 00 11 74"
openmilight "B8 01 EA 73 00 11 75"
openmilight "B8 01 EA 73 00 11 76"
openmilight "B8 01 EA 73 00 11 77"
openmilight "B8 01 EA 73 00 11 78"
openmilight "B8 01 EA 73 00 11 79"
openmilight "B8 01 EA 73 00 11 7A"
openmilight "B8 01 EA 73 00 11 7B"
openmilight "B8 01 EA 73 00 11 7C"
openmilight "B8 01 EA 73 00 11 7D"
openmilight "B8 01 EA 73 00 11 7E"
openmilight "B8 01 EA 73 00 11 7F"

