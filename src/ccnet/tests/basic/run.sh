#!/bin/bash

. ../common-conf.sh

testdir=${top_srcdir}/tests/basic

conf1=${testdir}/conf1
conf2=${testdir}/conf2
conf3=${testdir}/conf3

while [ $# -ge 1 ]; do
  case $1 in
    "1" ) 
      gnome-terminal -e "${ccnet} -c ${conf1} -D All -f -"
      ;;
    "2" )
      gnome-terminal -e "${ccnet_server} -c ${conf2} -D All -f -"
      ;;
    "3" )
      gnome-terminal -e "${ccnet} -c ${conf3} -D All -f -"
      ;;
  esac
  shift
done


