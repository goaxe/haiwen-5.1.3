/* -*- Mode: C; tab-width: 4; indent-tabs-mode: nil; c-basic-offset: 4 -*- */

#include "common.h"

#include <signal.h>
#include <dirent.h>
#include <sys/stat.h>
#include <time.h>

#include "getgateway.h"
#include "utils.h"

#include "daemon-session.h"
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


G_DEFINE_TYPE (CcnetDaemonSession, ccnet_daemon_session, CCNET_TYPE_SESSION);

static int daemon_session_prepare (CcnetSession *session);
static void daemon_session_start (CcnetSession *session);
static void on_peer_auth_done (CcnetSession *session, CcnetPeer *peer);

static void
ccnet_daemon_session_class_init (CcnetDaemonSessionClass *klass)
{
    CcnetSessionClass *session_class = CCNET_SESSION_CLASS (klass);

    session_class->prepare = daemon_session_prepare;
    session_class->start = daemon_session_start;
    session_class->on_peer_auth_done = on_peer_auth_done;
}

static void
ccnet_daemon_session_init (CcnetDaemonSession *session)
{
}

CcnetDaemonSession *
ccnet_daemon_session_new ()
{
    return g_object_new (CCNET_TYPE_DAEMON_SESSION, NULL);
}

int
daemon_session_prepare (CcnetSession *session)
{
    /* CcnetDaemonSession *daemon_session = (CcnetDaemonSession *)session; */

    /* setting of encrypt_channel */
    char *encrypt_channel;

    /* Default to encrypt channel */
    encrypt_channel = ccnet_session_config_get_string (session,
                                                       "encrypt_channel");
    if (!encrypt_channel) {
        session->encrypt_channel = 1;
        ccnet_session_config_set_string (session, "encrypt_channel", "on");
    } else if (g_strcmp0(encrypt_channel, "off") == 0)
        session->encrypt_channel = 0;
    else
        session->encrypt_channel = 1;
 
    g_free (encrypt_channel);

    return 0;
}

void
daemon_session_start (CcnetSession *session)
{
    
}


static void
on_peer_auth_done (CcnetSession *session, CcnetPeer *peer)
{
    ccnet_peer_manager_send_ready_message (session->peer_mgr, peer);
}
