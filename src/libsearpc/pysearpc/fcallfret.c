/*
 * Copyright (C) 2011 Zheng Liu
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place, Suite 330, 
 * Boston, MA 02111-1307, USA.
 */

#include <Python.h>
#include <sys/time.h>
#include <sys/types.h>

#include <glib-object.h>

#include <../lib/searpc-client.h>
#include <structmember.h>

static PyObject *SearpcError;


static PyObject *
SearpcClient_Fret__String(PyObject *self, PyObject *args)
{
    char *data;
    char *res;
    PyObject *ret;
    GError *error = NULL;

    if (!PyArg_ParseTuple(args, "s", &data))
        return NULL;

    res = searpc_client_fret__string(data, strlen(data), &error);
    if (error) {
        PyErr_SetString(SearpcError, error->message);
        return NULL;
    }
    if (res == NULL) {
        Py_INCREF(Py_None);
        return Py_None;
    }
    ret = PyString_FromString(res);
    g_free (res);
    return ret;
}


static PyObject *
SearpcClient_Fret__Int(PyObject *self, PyObject *args)
{
    char *data;
    int res;
    GError *error = NULL;

    if (!PyArg_ParseTuple(args, "s", &data))
        return NULL;

    res = searpc_client_fret__int(data, strlen(data), &error);
    if (error) {
        PyErr_SetString(SearpcError, error->message);
        return NULL;
    }

    return PyLong_FromLong(res);;
}


static PyObject *
SearpcClient_Fret__Int64(PyObject *self, PyObject *args)
{
    char *data;
    gint64 res;
    GError *error = NULL;

    if (!PyArg_ParseTuple(args, "s", &data))
        return NULL;

    res = searpc_client_fret__int64(data, strlen(data), &error);
    if (error) {
        PyErr_SetString(SearpcError, error->message);
        return NULL;
    }

    return PyLong_FromLongLong(res);;
}


#include "fcallfret.h"


DL_EXPORT(void) initfcallfret(void)
{
    PyObject *m, *d;

    m = Py_InitModule("fcallfret", SearpcClientModule_Functions);
    d = PyModule_GetDict(m);

    SearpcError = PyErr_NewException("pysearpc.error", NULL, NULL);
    Py_INCREF(SearpcError);
    PyModule_AddObject(m, "error", SearpcError);
}
