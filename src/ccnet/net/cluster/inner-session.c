/* -*- Mode: C; tab-width: 4; indent-tabs-mode: nil; c-basic-offset: 4 -*- */

#include "common.h"

#include <signal.h>
#include <dirent.h>
#include <sys/stat.h>
#include <time.h>

#include "getgateway.h"
#include "utils.h"

#include "inner-session.h"
#include "peer.h"
#include "peer-mgr.h"
#include "perm-mgr.h"
#include "packet-io.h"
#include "connect-mgr.h"
#include "message.h"
#include "message-manager.h"
#include "algorithms.h"
#include "net.h"
#include "rsa.h"
#include "ccnet-config.h"

#include "proc-factory.h"


G_DEFINE_TYPE (CcnetInnerSession, ccnet_inner_session, CCNET_TYPE_SESSION);

static int inner_session_prepare (CcnetSession *session);
static void inner_session_start (CcnetSession *session);
static void on_peer_auth_done (CcnetSession *session, CcnetPeer *peer);

static void
ccnet_inner_session_class_init (CcnetInnerSessionClass *klass)
{
    CcnetSessionClass *session_class = CCNET_SESSION_CLASS (klass);

    session_class->prepare = inner_session_prepare;
    session_class->start = inner_session_start;
    session_class->on_peer_auth_done = on_peer_auth_done;
}

static void
ccnet_inner_session_init (CcnetInnerSession *session)
{
}

CcnetInnerSession *
ccnet_inner_session_new ()
{
    return g_object_new (CCNET_TYPE_INNER_SESSION, NULL);
}

int
inner_session_prepare (CcnetSession *session)
{
    /* CcnetInnerSession *inner_session = (CcnetInnerSession *)session; */

    return 0;
}

void
inner_session_start (CcnetSession *session)
{
    
}

static void
on_peer_auth_done (CcnetSession *session, CcnetPeer *peer)
{
    ccnet_peer_manager_send_ready_message (session->peer_mgr, peer);
}
