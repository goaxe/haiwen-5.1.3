/* -*- Mode: C; tab-width: 4; indent-tabs-mode: nil; c-basic-offset: 4 -*- */

#include "sendlogout-proc.h"

#include "session.h"
#include "processor.h"
#include "peer.h"
#include "log.h"

G_DEFINE_TYPE (CcnetSendlogoutProc, ccnet_sendlogout_proc, CCNET_TYPE_PROCESSOR)

/*
         [request] "recvlogout" 
client   ------------------------------------->         relay

         [response]
         SC_OK      OK
         301        error
         <--------------------------------- 
*/

static int start (CcnetProcessor *processor, int argc, char **argv);
static void handle_response (CcnetProcessor *processor,
                             char *code, char *code_msg,
                             char *content, int clen);

static void
release_resource(CcnetProcessor *processor)
{
    /* FILL IT */

    CCNET_PROCESSOR_CLASS (ccnet_sendlogout_proc_parent_class)->release_resource (processor);
}


static void
ccnet_sendlogout_proc_class_init (CcnetSendlogoutProcClass *klass)
{
    CcnetProcessorClass *proc_class = CCNET_PROCESSOR_CLASS (klass);

    proc_class->name = "sendlogout-proc";
    proc_class->start = start;
    proc_class->handle_response = handle_response;
    proc_class->release_resource = release_resource;
}

static void
ccnet_sendlogout_proc_init (CcnetSendlogoutProc *processor)
{
}

static void
logout_done_cb (CcnetProcessor *processor, gboolean success, void *data)
{
    CcnetPeer *peer = data;
    peer->logout_started = FALSE;
    g_signal_handlers_disconnect_by_func (processor, logout_done_cb, data);
}

static int
start (CcnetProcessor *processor, int argc, char **argv)
{
    if (argc != 0) {
        ccnet_processor_error (processor, SC_BAD_ARGS, SS_BAD_ARGS);
        return -1;
    }
    
    ccnet_processor_send_request (processor, "recvlogout");

    g_signal_connect (processor, "done", (GCallback)logout_done_cb, processor->peer);

    processor->peer->logout_started = TRUE;

    return 0;
}

static void
handle_response (CcnetProcessor *processor,
                 char *code, char *code_msg,
                 char *content, int clen)
{
    if (g_strcmp0(code, SC_OK) == 0) {
        ccnet_message ("[Send Logout] Successfully send logout to relay %.10s\n",
                       processor->peer->id);
        processor->peer->logout_started = FALSE;
        /* processor->peer->bind_status = BIND_NO; */
        ccnet_processor_done (processor, TRUE);

    } else {
        ccnet_warning ("[Send Logout] Error: get repsonse: %s, %s.\n", code, code_msg);
        processor->peer->logout_started = FALSE;
        /* processor->peer->bind_status = BIND_YES; */
        ccnet_processor_done (processor, FALSE);
    }
}
