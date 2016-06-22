/* -*- Mode: C; tab-width: 4; indent-tabs-mode: nil; c-basic-offset: 4 -*- */

#ifndef CCNET_CLUSTER_MGR_H
#define CCNET_CLUSTER_MGR_H

#include <glib.h>

#include "peer.h"


typedef struct _CcnetClusterManager CcnetClusterManager;
typedef struct CcnetClusterManagerPriv CcnetClusterManagerPriv;

struct _CcnetClusterManager
{
    GList          *masters;
    GList          *members;

    unsigned int                redirect : 1;
    
    CcnetClusterManagerPriv *priv;
};

CcnetClusterManager* ccnet_cluster_manager_new ();

void ccnet_cluster_manager_free (CcnetClusterManager *manager);

void ccnet_cluster_manager_start (CcnetClusterManager *manager);

void ccnet_cluster_manager_add_member (CcnetClusterManager *manager,
                                       CcnetPeer *peer);
void ccnet_cluster_manager_remove_member (CcnetClusterManager *manager,
                                          CcnetPeer *peer);

void ccnet_cluster_manager_add_master (CcnetClusterManager *manager,
                                       CcnetPeer *peer);

void ccnet_cluster_manager_remove_master (CcnetClusterManager *manager,
                                          CcnetPeer *peer);

CcnetPeer*
ccnet_cluster_manager_find_redirect_dest (CcnetClusterManager *manager,
                                          CcnetPeer *peer);


#endif
