#include <sqlite3.h>
#include <glib.h>
#include <errno.h>
#include <stdio.h>
#include <algorithm>

#include <QUrl>
#include <QObject>

#include "configurator.h"
#include "seafile-applet.h"
#include "utils/utils.h"

#include "certs-mgr.h"

namespace {

QString
certToBase64(const QSslCertificate& cert)
{
    QByteArray bytes = cert.toPem();
    return bytes.toBase64();
}

QSslCertificate
certFromBase64(const char *data)
{
    QSslCertificate cert;
    if (!data) {
        return cert;
    }

    QByteArray bytes = QByteArray::fromBase64(data);

    cert = QSslCertificate(bytes);

    return cert;
}

// Remove path and query params from url before converting to string
QString urlToString(const QUrl& url)
{
    QUrl u;

    u.setScheme(url.scheme());
    u.setHost(url.host());
    u.setPort(url.port());

    return u.toString();
}

} // namespace

CertsManager::CertsManager()
{
    db = NULL;
}

CertsManager::~CertsManager()
{
    if (db)
        sqlite3_close(db);
}

int
CertsManager::start()
{
    const char *errmsg;
    const char *sql;

    QString db_path = QDir(seafApplet->configurator()->seafileDir()).filePath("certs.db");
    if (sqlite3_open (toCStr(db_path), &db)) {
        errmsg = sqlite3_errmsg (db);
        qWarning("failed to open certs database %s: %s",
               toCStr(db_path), errmsg ? errmsg : "no error given");

        seafApplet->errorAndExit(QObject::tr("failed to open certs database"));
        return -1;
    }

    sql = "CREATE TABLE IF NOT EXISTS Certs ("
        "url VARCHAR(255) PRIMARY KEY, "
        "cert TEXT"
        ")";
    sqlite_query_exec (db, sql);

    loadCertificates();
    return 0;
}

bool CertsManager::loadCertificatesCB(sqlite3_stmt *stmt, void *data)
{
    CertsManager *mgr = (CertsManager *)data;
    const char *url = (const char *)sqlite3_column_text (stmt, 0);
    const char *base64 = (const char *)sqlite3_column_text(stmt, 1);

    QSslCertificate cert = certFromBase64(base64);
    if (!cert.isNull()) {
        mgr->certs_[url] = cert;
    }

    return true;
}

void CertsManager::loadCertificates()
{
    const char *sql = "SELECT url, cert FROM Certs";
    sqlite_foreach_selected_row (db, sql, loadCertificatesCB, this);
}

void
CertsManager::saveCertificate(const QUrl& url, const QSslCertificate& cert)
{
    QString key = urlToString(url);
    certs_[key] = cert;

    QString sql = "REPLACE INTO Certs VALUES ('%1', '%2')";
    sql = sql.arg(key).arg(certToBase64(cert));
    sqlite_query_exec (db, toCStr(sql));
}

QSslCertificate
CertsManager::getCertificate(const QUrl& url)
{
    QString key = urlToString(url);

    if (certs_.contains(key)) {
        return certs_[key];
    }
    QSslCertificate cert;
    return cert;
}
