#!/bin/bash

. ../common-conf.sh

testdir=${top_srcdir}/tests/basic

conf1=${testdir}/conf1
conf2=${testdir}/conf2
conf3=${testdir}/conf3


peer1=eed994152b231c673eeb5f586c06cd20cf9d10e8
peer2=8e4b13b49ca79f35732d9f44a0804940d985627c
peer3=e19d1070b6d9ae7bf453d124ff4e775076553906



${ccnet_server} -c ${conf2} &
${ccnet} -c ${conf1} &
${ccnet} -c ${conf3} -D all -f - &

sleep 5


${ccnet_tool} -c ${conf1} add-relay --addr 127.0.0.1:10002
${ccnet_tool} -c ${conf3} add-relay --addr 127.0.0.1:10002

sleep 30
echo "+++ Added relay"


# clean up
echo "clean up"
pkill -2 ccnet
