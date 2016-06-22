/* -*- Mode: C; tab-width: 4; indent-tabs-mode: nil; c-basic-offset: 4 -*- */

#ifndef CCNET_DAEMON_SESSION_H
#define CCNET_DAEMON_SESSION_H

#include "session.h"

#define CCNET_TYPE_DAEMON_SESSION                  (ccnet_daemon_session_get_type ())
#define CCNET_DAEMON_SESSION(obj)                  (G_TYPE_CHECK_INSTANCE_CAST ((obj), CCNET_TYPE_DAEMON_SESSION, CcnetDaemonSession))
#define CCNET_IS_DAEMON_SESSION(obj)               (G_TYPE_CHECK_INSTANCE_TYPE ((obj), CCNET_TYPE_DAEMON_SESSION))
#define CCNET_DAEMON_SESSION_CLASS(klass)          (G_TYPE_CHECK_CLASS_CAST ((klass), CCNET_TYPE_DAEMON_SESSION, CcnetDaemonSessionClass))
#define CCNET_IS_DAEMON_SESSION_CLASS(klass)       (G_TYPE_CHECK_CLASS_TYPE ((klass), CCNET_TYPE_DAEMON_SESSION))
#define CCNET_DAEMON_SESSION_GET_CLASS(obj)        (G_TYPE_INSTANCE_GET_CLASS ((obj), CCNET_TYPE_DAEMON_SESSION, CcnetDaemonSessionClass))


typedef struct CcnetDaemonSession CcnetDaemonSession;
typedef struct CcnetDaemonSessionClass CcnetDaemonSessionClass;

struct CcnetDaemonSession
{
    CcnetSession                common_session;

    struct _CcnetPeer          *default_relay;
};

struct CcnetDaemonSessionClass
{
    CcnetSessionClass  parent_class;
};

CcnetDaemonSession *ccnet_daemon_session_new ();

void ccnet_daemon_session_set_relay (CcnetDaemonSession *session,
                                     struct _CcnetPeer *peer);
void ccnet_daemon_session_unset_relay (CcnetDaemonSession *session);


#endif
