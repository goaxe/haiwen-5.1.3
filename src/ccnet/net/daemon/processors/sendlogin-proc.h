/* -*- Mode: C; tab-width: 4; indent-tabs-mode: nil; c-basic-offset: 4 -*- */

#ifndef CCNET_SENDLOGIN_PROC_H
#define CCNET_SENDLOGIN_PROC_H

#include <glib-object.h>


#define CCNET_TYPE_SENDLOGIN_PROC                  (ccnet_sendlogin_proc_get_type ())
#define CCNET_SENDLOGIN_PROC(obj)                  (G_TYPE_CHECK_INSTANCE_CAST ((obj), CCNET_TYPE_SENDLOGIN_PROC, CcnetSendloginProc))
#define CCNET_IS_SENDLOGIN_PROC(obj)               (G_TYPE_CHECK_INSTANCE_TYPE ((obj), CCNET_TYPE_SENDLOGIN_PROC))
#define CCNET_SENDLOGIN_PROC_CLASS(klass)          (G_TYPE_CHECK_CLASS_CAST ((klass), CCNET_TYPE_SENDLOGIN_PROC, CcnetSendloginProcClass))
#define IS_CCNET_SENDLOGIN_PROC_CLASS(klass)       (G_TYPE_CHECK_CLASS_TYPE ((klass), CCNET_TYPE_SENDLOGIN_PROC))
#define CCNET_SENDLOGIN_PROC_GET_CLASS(obj)        (G_TYPE_INSTANCE_GET_CLASS ((obj), CCNET_TYPE_SENDLOGIN_PROC, CcnetSendloginProcClass))

typedef struct _CcnetSendloginProc CcnetSendloginProc;
typedef struct _CcnetSendloginProcClass CcnetSendloginProcClass;

struct _CcnetSendloginProc {
    CcnetProcessor parent_instance;
};

struct _CcnetSendloginProcClass {
    CcnetProcessorClass parent_class;
};

GType ccnet_sendlogin_proc_get_type ();

#endif

