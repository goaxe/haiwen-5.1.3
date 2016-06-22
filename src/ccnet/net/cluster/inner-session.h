/* -*- Mode: C; tab-width: 4; indent-tabs-mode: nil; c-basic-offset: 4 -*- */

#ifndef CCNET_INNER_SESSION_H
#define CCNET_INNER_SESSION_H

#include <server-session.h>

#define CCNET_TYPE_INNER_SESSION                  (ccnet_inner_session_get_type ())
#define CCNET_INNER_SESSION(obj)                  (G_TYPE_CHECK_INSTANCE_CAST ((obj), CCNET_TYPE_INNER_SESSION, CcnetInnerSession))
#define CCNET_IS_INNER_SESSION(obj)               (G_TYPE_CHECK_INSTANCE_TYPE ((obj), CCNET_TYPE_INNER_SESSION))
#define CCNET_INNER_SESSION_CLASS(klass)          (G_TYPE_CHECK_CLASS_CAST ((klass), CCNET_TYPE_INNER_SESSION, CcnetInnerSessionClass))
#define CCNET_IS_INNER_SESSION_CLASS(klass)       (G_TYPE_CHECK_CLASS_TYPE ((klass), CCNET_TYPE_INNER_SESSION))
#define CCNET_INNER_SESSION_GET_CLASS(obj)        (G_TYPE_INSTANCE_GET_CLASS ((obj), CCNET_TYPE_INNER_SESSION, CcnetInnerSessionClass))

typedef struct CcnetInnerSession CcnetInnerSession;
typedef struct _CcnetInnerSessionClass CcnetInnerSessionClass;

struct CcnetInnerSession
{
    CcnetSession                session;
};

struct _CcnetInnerSessionClass
{
    CcnetSessionClass           parent_class;
};

CcnetInnerSession *ccnet_inner_session_new ();


#endif
