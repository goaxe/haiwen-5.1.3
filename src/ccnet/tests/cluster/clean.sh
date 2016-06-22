#!/bin/bash

CLEANFILE="peer-db PeerMgr ccnet.log ccnet.db misc logs"

for d in conf1 conf2 conf3 outer-conf2 outer-conf3; do
  for file in $CLEANFILE; do
    rm -rf $d/$file
  done
  rm -f $d/[0-9a-f]*.peer
done

rm -rf conf2/GroupMgr
rm -rf conf3/GroupMgr
rm -rf outer-conf2/GroupMgr
rm -rf outer-conf3/GroupMgr

