## Process this file with automake to produce Makefile.in

AUTOMAKE_OPTIONS = foreign no-dependencies

AM_CFLAGS = -DPKGDATADIR=\"$(pkgdatadir)\" \
	-DPACKAGE_DATA_DIR=\""$(pkgdatadir)"\" \
	-I$(top_srcdir)/include \
	-I$(top_srcdir)/lib  \
	-I$(top_builddir)/include \
	@GLIB2_CFLAGS@ \
	@GOBJECT_CFLAGS@ \
	@SEARPC_CFLAGS@

bin_PROGRAMS = ccnet-tool ccnet-servtool

ccnet_tool_SOURCES = ccnet-tool.c

ccnet_tool_LDADD = $(top_builddir)/lib/libccnet.la \
	 @GLIB2_LIBS@  @GOBJECT_LIBS@ @SEARPC_LIBS@

ccnet_tool_LDFLAGS = @STATIC_COMPILE@ @CONSOLE@ @SERVER_PKG_RPATH@

ccnet_servtool_SOURCES = ccnet-servtool.c

ccnet_servtool_LDADD = $(top_builddir)/lib/libccnet.la \
	@GLIB2_LIBS@  @GOBJECT_LIBS@ @SEARPC_LIBS@

ccnet_servtool_LDFLAGS = @STATIC_COMPILE@ @CONSOLE@ @SERVER_PKG_RPATH@

