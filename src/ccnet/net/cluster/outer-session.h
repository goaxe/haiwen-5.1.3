/* -*- Mode: C; tab-width: 4; indent-tabs-mode: nil; c-basic-offset: 4 -*- */

#ifndef CCNET_OUTER_SESSION_H
#define CCNET_OUTER_SESSION_H

#include <server-session.h>

#define CCNET_TYPE_OUTER_SESSION                  (ccnet_outer_session_get_type ())
#define CCNET_OUTER_SESSION(obj)                  (G_TYPE_CHECK_INSTANCE_CAST ((obj), CCNET_TYPE_OUTER_SESSION, CcnetOuterSession))
#define CCNET_IS_OUTER_SESSION(obj)               (G_TYPE_CHECK_INSTANCE_TYPE ((obj), CCNET_TYPE_OUTER_SESSION))
#define CCNET_OUTER_SESSION_CLASS(klass)          (G_TYPE_CHECK_CLASS_CAST ((klass), CCNET_TYPE_OUTER_SESSION, CcnetOuterSessionClass))
#define CCNET_IS_OUTER_SESSION_CLASS(klass)       (G_TYPE_CHECK_CLASS_TYPE ((klass), CCNET_TYPE_OUTER_SESSION))
#define CCNET_OUTER_SESSION_GET_CLASS(obj)        (G_TYPE_INSTANCE_GET_CLASS ((obj), CCNET_TYPE_OUTER_SESSION, CcnetOuterSessionClass))

typedef struct CcnetOuterSession CcnetOuterSession;
typedef struct _CcnetOuterSessionClass CcnetOuterSessionClass;

struct CcnetOuterSession
{
    CcnetServerSession          server_session;
};

struct _CcnetOuterSessionClass
{
    CcnetServerSessionClass     parent_class;
};

CcnetOuterSession *ccnet_outer_session_new ();


#endif
