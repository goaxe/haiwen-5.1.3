#!/bin/bash

CLEANFILE="peer-db PeerMgr ccnet.log ccnet.db misc logs"

for d in conf1 conf2 conf3; do
  for file in $CLEANFILE; do
    rm -rf $d/$file
  done
  rm -f $d/[0-9a-f]*.peer
done

rm -rf conf2/GroupMgr
rm -rf conf2/OrgMgr
