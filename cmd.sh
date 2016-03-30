#!/bin/bash
button=$1

for i in `seq 1 10`;
do
	value=$(<counter.txt)
	((value+=3))
	printf -v hex_result "%x" "$value"
	
	if [[ "$value" -gt "255"  ]]; then
		((value-=256));
	fi

	if [[ "$value" -lt "16"  ]]; then
		hex_result=0$hex_result;
	fi

	echo $hex_result
	openmilight "B8 F2 EA 00 91 0$button $hex_result"
	echo "$value" > counter.txt
done
