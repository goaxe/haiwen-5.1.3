#!/bin/bash

. ../common-conf.sh

testdir=${top_srcdir}/tests/cluster

conf1=${testdir}/conf1
conf2=${testdir}/conf2
conf3=${testdir}/conf3
outer_conf2=${testdir}/outer-conf2
outer_conf3=${testdir}/outer-conf3

peer1=eed994152b231c673eeb5f586c06cd20cf9d10e8
peer2=8e4b13b49ca79f35732d9f44a0804940d985627c
peer3=e19d1070b6d9ae7bf453d124ff4e775076553906
outer_peer=9b7adea2e0a954196734af25837751bb833336e6


${ccnet_cserver} -c ${outer_conf2} -C ${conf2} -D all -f - &
${ccnet_cserver} -c ${outer_conf3} -C ${conf3} &
${ccnet} -c ${conf1} &

sleep 5


${ccnet_tool} -c ${conf1} set-relay --default --addr 127.0.0.1:10004
${ccnet_servtool} -c ${conf3} add-master --id ${peer2} --addr 127.0.0.1:10002

sleep 30
echo "+++ Added relay and master"

${ccnet_servtool} -c ${conf2} add-member --id ${peer3} --addr 127.0.0.1:10005

sleep 30
echo "+++ Added member"


# clean up
echo "clean up"
pkill -2 ccnet
