#!/bin/bash

. ../common-conf.sh

testdir=${top_srcdir}/tests/cluster

conf1=${testdir}/conf1
conf2=${testdir}/conf2
conf3=${testdir}/conf3
outer_conf2=${testdir}/outer-conf2
outer_conf3=${testdir}/outer-conf3

while [ $# -ge 1 ]; do
  case $1 in
    "1" ) 
      gnome-terminal -e "${ccnet} -c ${conf1} -D All -f - "
      ;;
    "2" )
      gnome-terminal -e "${ccnet_cserver} -c ${outer_conf2} -C ${conf2} -D All -f - --redirect"
      ;;
    "3" )
      gnome-terminal -e "${ccnet_cserver} -c ${outer_conf3} -C ${conf3} -D All -f - "
      ;;
  esac
  shift
done


