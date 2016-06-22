/* -*- Mode: C; tab-width: 4; indent-tabs-mode: nil; c-basic-offset: 4 -*- */

#ifndef CCNET_SENDLOGOUT_PROC_H
#define CCNET_SENDLOGOUT_PROC_H

#include <glib-object.h>
#include <processor.h>


#define CCNET_TYPE_SENDLOGOUT_PROC                  (ccnet_sendlogout_proc_get_type ())
#define CCNET_SENDLOGOUT_PROC(obj)                  (G_TYPE_CHECK_INSTANCE_CAST ((obj), CCNET_TYPE_SENDLOGOUT_PROC, CcnetSendlogoutProc))
#define CCNET_IS_SENDLOGOUT_PROC(obj)               (G_TYPE_CHECK_INSTANCE_TYPE ((obj), CCNET_TYPE_SENDLOGOUT_PROC))
#define CCNET_SENDLOGOUT_PROC_CLASS(klass)          (G_TYPE_CHECK_CLASS_CAST ((klass), CCNET_TYPE_SENDLOGOUT_PROC, CcnetSendlogoutProcClass))
#define IS_CCNET_SENDLOGOUT_PROC_CLASS(klass)       (G_TYPE_CHECK_CLASS_TYPE ((klass), CCNET_TYPE_SENDLOGOUT_PROC))
#define CCNET_SENDLOGOUT_PROC_GET_CLASS(obj)        (G_TYPE_INSTANCE_GET_CLASS ((obj), CCNET_TYPE_SENDLOGOUT_PROC, CcnetSendlogoutProcClass))

typedef struct _CcnetSendlogoutProc CcnetSendlogoutProc;
typedef struct _CcnetSendlogoutProcClass CcnetSendlogoutProcClass;

struct _CcnetSendlogoutProc {
    CcnetProcessor parent_instance;
};

struct _CcnetSendlogoutProcClass {
    CcnetProcessorClass parent_class;
};

GType ccnet_sendlogout_proc_get_type ();

#endif

