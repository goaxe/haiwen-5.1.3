/* -*- Mode: C; tab-width: 4; indent-tabs-mode: nil; c-basic-offset: 4 -*- */

#include <string.h>

#include <ccnet.h>

#include "echo-proc.h"

G_DEFINE_TYPE (CcnetEchoProc, ccnet_echo_proc, CCNET_TYPE_PROCESSOR)

static int start (CcnetProcessor *processor, int argc, char **argv);
static void handle_update (CcnetProcessor *processor,
                           char *code, char *code_msg,
                           char *content, int clen);

static void
release_resource(CcnetProcessor *processor)
{
    /* FILL IT */

    CCNET_PROCESSOR_CLASS (ccnet_echo_proc_parent_class)->release_resource (processor);
}


static void
ccnet_echo_proc_class_init (CcnetEchoProcClass *klass)
{
    CcnetProcessorClass *proc_class = CCNET_PROCESSOR_CLASS (klass);
    proc_class->name = "echo-proc";
    proc_class->start = start;
    proc_class->handle_update = handle_update;
    proc_class->release_resource = release_resource;
}

static void
ccnet_echo_proc_init (CcnetEchoProc *processor)
{
}

static int
start (CcnetProcessor *processor, int argc, char **argv)
{
    if (IS_SLAVE(processor)) {
        char buf[256];
        int len;
        len = sprintf (buf, "%s %s", processor->session->base.name,
                       processor->session->base.id);
        ccnet_processor_send_response (processor, 
                                       "300", "", buf, len + 1);
        return 0;
    }

    ccnet_processor_send_request(processor, "echo");
    return 0;
}

static void
handle_update (CcnetProcessor *processor,
               char *code, char *code_msg,
               char *content, int clen)
{
    if (memcmp(code, "300", 3) == 0) {
        if (content[clen-1] != '\0') {
            ccnet_processor_done (processor, FALSE);
            return;
        }
        fprintf (stderr, "Receive echo response: %s\n", content);
        ccnet_processor_done (processor, TRUE);
    } else {
        /* code and code_msg are ended with '\0' */
        fprintf (stderr, "Bad response from peer %s(%.8s), %s:%s\n", 
                       processor->session->base.name,
                       processor->session->base.id,
                       code, code_msg);
        ccnet_processor_done (processor, FALSE);
    }
}
