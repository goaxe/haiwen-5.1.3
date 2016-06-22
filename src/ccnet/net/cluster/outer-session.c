/* -*- Mode: C; tab-width: 4; indent-tabs-mode: nil; c-basic-offset: 4 -*- */

#include "common.h"

#include "utils.h"

#include "outer-session.h"
#include "peer.h"
#include "peer-mgr.h"
#include "ccnet-config.h"
#include "cluster-mgr.h"

#define DEBUG_FLAG CCNET_DEBUG_OTHER
#include "log.h"

extern CcnetClusterManager *cluster_mgr;


G_DEFINE_TYPE (CcnetOuterSession, ccnet_outer_session, CCNET_TYPE_SERVER_SESSION);

static void on_peer_auth_done (CcnetSession *session, CcnetPeer *peer);


static void
ccnet_outer_session_class_init (CcnetOuterSessionClass *klass)
{
    CcnetSessionClass *session_class = CCNET_SESSION_CLASS (klass);

    /* session_class->prepare = outer_session_prepare; */
    /* session_class->start = outer_session_start; */
    session_class->on_peer_auth_done = on_peer_auth_done;
}

static void
ccnet_outer_session_init (CcnetOuterSession *session)
{
}

CcnetOuterSession *
ccnet_outer_session_new (const char *config_dir_r)
{
    return g_object_new (CCNET_TYPE_OUTER_SESSION, NULL);
}


static void
redirect_peer (CcnetPeerManager *manager,
               CcnetPeer *peer)
{
    CcnetPeer *dest;

    dest = ccnet_cluster_manager_find_redirect_dest (
        cluster_mgr, peer);
    if (dest) {
        ccnet_peer_manager_redirect_peer (manager, peer, dest);
        g_object_unref (dest);
    } else {
        /* serve it myself */
        ccnet_peer_manager_send_ready_message (manager, peer);
    }
}


static void on_peer_auth_done (CcnetSession *session,
                               CcnetPeer *peer)
{
    if (!cluster_mgr->redirect) {
        ccnet_peer_manager_send_ready_message (session->peer_mgr, peer);
        return;
    }

    redirect_peer (session->peer_mgr, peer);
}
