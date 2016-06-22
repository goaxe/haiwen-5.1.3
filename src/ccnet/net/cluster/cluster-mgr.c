/* -*- Mode: C; tab-width: 4; indent-tabs-mode: nil; c-basic-offset: 4 -*- */

#include "common.h"

#include <sys/stat.h>
#include <dirent.h>
#include <stdio.h>
#include <glib/gstdio.h>

#include "timer.h"

#include "peer.h"
#include "session.h"
#include "peer-mgr.h"
#include "cluster-mgr.h"
#include "connect-mgr.h"

#include "message.h"
#include "utils.h"

#define DEBUG_FLAG  CCNET_DEBUG_PEER
#include "log.h"

extern CcnetSession  *session;
extern CcnetSession  *inner_session;


struct CcnetClusterManagerPriv {
    int dummy;
};


CcnetClusterManager*
ccnet_cluster_manager_new ()
{
    CcnetClusterManager *manager;

    manager = g_new0 (CcnetClusterManager, 1);

    manager->priv = g_new0 (CcnetClusterManagerPriv, 1);

    return manager;
}

void
ccnet_cluster_manager_free (CcnetClusterManager *manager)
{
    g_object_unref (manager);
}

void
ccnet_cluster_manager_start (CcnetClusterManager *manager)
{
    /* find peers with role ClusterMemeber and add to list */
    GList *peers, *ptr;

    peers = ccnet_peer_manager_get_peers_with_role (
        inner_session->peer_mgr, "ClusterMember");
    for (ptr = peers; ptr; ptr = ptr->next) {
        CcnetPeer *peer = ptr->data;
        ccnet_cluster_manager_add_member (manager, peer);
    }
    g_list_free (peers);

    /* find peers with role ClusterMaster and add to list */
    peers = ccnet_peer_manager_get_peers_with_role (
        inner_session->peer_mgr, "ClusterMaster");
    for (ptr = peers; ptr; ptr = ptr->next) {
        CcnetPeer *peer = ptr->data;
        ccnet_cluster_manager_add_master (manager, peer);
    }
    g_list_free (peers);
}

void
ccnet_cluster_manager_add_member (CcnetClusterManager *manager,
                                  CcnetPeer *peer)
{
    manager->members = g_list_prepend (manager->members, peer);
    g_object_ref (peer);
}

void
ccnet_cluster_manager_remove_member (CcnetClusterManager *manager,
                                     CcnetPeer *peer)
{
    if (!g_list_find (manager->members, peer))
        return;
    manager->members = g_list_remove (manager->members, peer);
    g_object_unref (peer);
}

void
ccnet_cluster_manager_add_master (CcnetClusterManager *manager,
                                  CcnetPeer *peer)
{
    manager->members = g_list_prepend (manager->members, peer);
    g_object_ref (peer);
    ccnet_conn_manager_add_to_conn_list (
        inner_session->connMgr, peer);
}

void
ccnet_cluster_manager_remove_master (CcnetClusterManager *manager,
                                     CcnetPeer *peer)
{
    if (!g_list_find (manager->members, peer))
        return;
    manager->members = g_list_remove (manager->members, peer);
    g_object_unref (peer);

    ccnet_conn_manager_remove_from_conn_list (
        inner_session->connMgr, peer);
}

CcnetPeer*
ccnet_cluster_manager_find_redirect_dest (CcnetClusterManager *manager,
                                          CcnetPeer *peer)
{
    GList *ptr;
    GList *cands = NULL;
    int n = 0;
    CcnetPeer *res;

    for (ptr = manager->members; ptr; ptr = ptr->next) {
        CcnetPeer *p = ptr->data;

        if (p->net_state == PEER_CONNECTED) {
            cands = g_list_prepend (cands, p);
            n++;
        }
    }

    if (n) {
        int i = rand() % n;
        res = g_list_nth_data(cands, i);
        g_object_ref (res);
        return res;
    }

    return NULL;
}

/* -------- cluster message handling -------- */
void
ccnet_cluster_manager_receive_message (CcnetPeerManager *manager,
                                       CcnetMessage *msg)
{
}
