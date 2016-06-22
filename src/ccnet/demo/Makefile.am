## Process this file with automake to produce Makefile.in

AM_CFLAGS = -DPKGDATADIR=\"$(pkgdatadir)\" \
	-DPACKAGE_DATA_DIR=\""$(pkgdatadir)"\" \
	-I$(top_srcdir)/include \
	-I$(top_srcdir)/lib  \
	-I$(top_builddir)/lib  \
	@GLIB2_CFLAGS@ \
	@SEARPC_CFLAGS@ \
	-Wall


bin_PROGRAMS = ccnet-demo-server ccnet-demo-client

proc_headers = processors/echo-proc.h

noinst_HEADERS = $(proc_headers)

proc_srcs = processors/echo-proc.c

ccnet_demo_server_SOURCES = ccnet-demo-server.c $(proc_srcs)

ccnet_demo_server_LDADD = $(top_builddir)/lib/libccnet.la \
	 @GLIB2_LIBS@  @GOBJECT_LIBS@ @SEARPC_LIBS@

ccnet_demo_server_LDFLAGS = @STATIC_COMPILE@ @CONSOLE@


ccnet_demo_client_SOURCES = ccnet-demo-client.c

ccnet_demo_client_LDADD = $(top_builddir)/lib/libccnet.la \
	 @GLIB2_LIBS@  @GOBJECT_LIBS@

ccnet_demo_client_LDFLAGS = @STATIC_COMPILE@ @CONSOLE@
