/* -*- Mode: C; tab-width: 4; indent-tabs-mode: nil; c-basic-offset: 4 -*- */

#include "common.h"

#include "processor.h"
#include "sendlogin-proc.h"
#include "peer.h"
#include "log.h"


G_DEFINE_TYPE (CcnetSendloginProc, ccnet_sendlogin_proc, CCNET_TYPE_PROCESSOR)

/*
         [request] "recvlogin <email> <passwd>" 
client   ------------------------------------->         relay

         [response]
         SC_OK      OK
         301        wrong email/passwd
         302        relay internal error
         303        already login, do not relogin
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

    CCNET_PROCESSOR_CLASS (ccnet_sendlogin_proc_parent_class)->release_resource (processor);
}


static void
ccnet_sendlogin_proc_class_init (CcnetSendloginProcClass *klass)
{
    CcnetProcessorClass *proc_class = CCNET_PROCESSOR_CLASS (klass);

    proc_class->name = "sendlogin-proc";
    proc_class->start = start;
    proc_class->handle_response = handle_response;
    proc_class->release_resource = release_resource;
}

static void
ccnet_sendlogin_proc_init (CcnetSendloginProc *processor)
{
}


static int
start (CcnetProcessor *processor, int argc, char **argv)
{
    if (argc != 2 || !argv[0] || !argv[1]) {
        ccnet_processor_error (processor, SC_BAD_ARGS, SS_BAD_ARGS);
        return -1;
    }

    GString *buf = g_string_new (NULL);
    char *email = argv[0];
    char *passwd = argv[1];
    g_string_append_printf (buf, "recvlogin %s %s", email, passwd);
    /* ccnet_message ("[Send Login] send login to relay %.10s: email(%s), passwd(%s)\n", */
    /*                processor->peer->id, email, passwd); */

    ccnet_processor_send_request (processor, buf->str);
    g_string_free (buf, TRUE);

    CcnetPeer *relay = processor->peer;
    relay->login_started = TRUE;
    if (relay->login_error)
        g_free(relay->login_error);
    relay->login_error = NULL;
    
    return 0;
}

static void
set_login_relay_status (CcnetProcessor *processor,
                        gboolean success,
                        const char *err_msg)
{
    if (!err_msg)
        err_msg = "Unknown Error";

    CcnetPeer *relay = processor->peer;
    if (relay->login_error) {
        g_free (relay->login_error);
        relay->login_error = NULL;
    }
    if (!success) {
        relay->login_error = g_strdup(err_msg);
    } else {
        relay->login_error = NULL;
    }
    relay->login_started = FALSE;
}

static void
handle_response (CcnetProcessor *processor,
                 char *code, char *code_msg,
                 char *content, int clen)
{
    if (g_strcmp0(code, SC_OK) == 0) {
        ccnet_message ("[Send Login] Successfully send login to relay %.10s\n",
                       processor->peer->id);
        set_login_relay_status (processor, TRUE, NULL);
        ccnet_processor_done (processor, TRUE);

    } else {
        ccnet_warning ("[Send Login] Error: get repsonse: %s, %s.\n", code, code_msg);
        set_login_relay_status(processor, FALSE, code_msg);
        ccnet_processor_done (processor, FALSE);
    }

}
