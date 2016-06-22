//
// Created by root on 5/25/16.
//
#include "post-api.h"
#include <QtNetwork>
#include <iostream>
#include <string>


using namespace std;

//http://paste.ubuntu.org.cn/99316

namespace {
    const char *pushUploadStatusApi = "/api/push_upload_status";
    const char *pushUploadSpeedApi = "/api/push_upload_speed";
    const char *kContentTypeForm = "application/x-www-form-urlencoded";
    const char *requestIpHeader = "X-Forward-For";
    string q2s(const QString &q) {
        return string((const char *) q.toLocal8Bit());
    }

    void printIplist() {
        QList<QHostAddress> list = QNetworkInterface::allAddresses();
        qDebug() << L"ipv4新方法\n";
        foreach (QHostAddress adr, list) {
            if(adr.protocol() == QAbstractSocket::IPv4Protocol) {
                if (adr.toString().contains("192."))
                    continue;
                qDebug() << "ipv4 : " << adr.toString();
            }
        }
    }

    void writeConfig() {
        //test http://blog.csdn.net/qiurisuixiang/article/details/7760828
        QSettings qsetting("config.ini", QSettings::IniFormat);
        qsetting.beginGroup("PostApi");
        qsetting.setValue("upload-status", "http://localhost:5000/api/push_upload_status");
        qsetting.setValue("disk-status", "http://localhost:5000/api/push_disk_status");
        qsetting.setValue("send-logs", "http://localhost:5000/api/send_log");
        qsetting.setValue("ip-address", "163.11.142.31");
        qsetting.setValue("load-ip", true);
    }
}


QNetworkAccessManager* PostApi::netManger = NULL;
PostApi* PostApi::postApi = NULL;

PostApi* PostApi::instance() {
    if (!postApi) {
        postApi = new PostApi;
    }
    return postApi;
}

void PostApi::destory() {
    postApi->~PostApi();
}

PostApi::PostApi() {
    if (!netManger) {
        netManger = new QNetworkAccessManager();
        connect(netManger, SIGNAL(finished(QNetworkReply*)), SLOT(httpRequestFinished(QNetworkReply*)));
        //connect(netManger, SIGNAL(readyRead(QNetworkReply*)), SLOT(httpRequestReadReady(QNetworkReply*)));
    }
    hostUri = loadConfig("host");
    localUri = loadConfig("local");
    if (hostUri.endsWith("/")) {
        hostUri = hostUri.mid(0, hostUri.size() - 1);
    }
    userEmail = "";
    //peerAdr = loadConfig("ip");
}

PostApi::~PostApi() {
    //netManger->deleteLater();
}

void PostApi::setEmail(const QString &email) {
    userEmail = email;
}

void PostApi::get(const QUrl &url) {
    qDebug() << "request: " << url.toString();
    QNetworkRequest request(url);
    request.setRawHeader("User-Agent", "FireFox 5.0");
    netManger->get(request);
    //connect(reply_, SIGNAL(readyRead()), SLOT(httpRequestReadReady()));
}

void PostApi::sendUploadSpeed(int speed) {
    if (userEmail == "") return;
    QString params = QString::fromUtf8("email=%1&speed=%2").arg(userEmail).arg(speed);
    QUrl uploadUri = hostUri + pushUploadSpeedApi;
    post(uploadUri, params.toUtf8().data());
    uploadUri = localUri + pushUploadSpeedApi;
    post(uploadUri, params.toUtf8().data());
}

void PostApi::sendUploadStatus(const QString &repoId, const QString& status, int rate, int percent) {
    if (userEmail == "") return;
    QString params = QString::fromUtf8("email=%1&repo_id=%2&rate=%3&percent=%4&status=%5").arg(userEmail).arg(repoId).arg(rate).
            arg(percent).arg(status);
    QTextCodec *codec = QTextCodec::codecForName("utf8");
    QUrl uploadUri = hostUri + pushUploadStatusApi;
    post(uploadUri, params.toUtf8().data());
    uploadUri = localUri + pushUploadStatusApi;
    post(uploadUri, params.toUtf8().data());
}

void PostApi::post(const QUrl &url, const QByteArray &postData) {
    //http://blog.csdn.net/ultimater/article/details/8762237
    QNetworkRequest request(url);
    //request.setSslConfiguration();
    qDebug() << "get client ip: " << peerAdr;
    request.setRawHeader(requestIpHeader, peerAdr.toLocal8Bit());
    request.setHeader(QNetworkRequest::ContentTypeHeader, kContentTypeForm);
    netManger->post(request, postData);
    //connect(netManger, SIGNAL(readyRead(QNetworkReply*)), SLOT(httpRequestReadReady(QNetworkReply*)));
}


void PostApi::httpRequestFinished(QNetworkReply *reply_) {
    int code = reply_->attribute(QNetworkRequest::HttpStatusCodeAttribute).toInt();
    if (code == 0 && reply_->error() != QNetworkReply::NoError) {
        qDebug("[api] network error: %s\n", reply_->errorString().toUtf8().data());
        return;
    }
    qDebug("status code：%d\n", code);
    QTextCodec *codec = QTextCodec::codecForName("utf8");
    QString str = codec->toUnicode(reply_->readAll());
    qDebug() << QString::fromLocal8Bit("地址：") << (reply_) << "ret: " << str;
    reply_->deleteLater();
}

void PostApi::httpRequestReadReady(QNetworkReply *reply_) {
    qDebug("request return");
    QTextCodec *codec = QTextCodec::codecForName("utf8");
    QString all = codec->toUnicode(reply_->readAll());
    cout << q2s(all);
}

QString PostApi::loadConfig(const QString &key) {
    //writeConfig();
    QSettings qsetting("config.ini", QSettings::IniFormat);
    return qsetting.value("PostApi/" + key).toString();
}

QString PostApi::getIpAddress() {
    //http://blog.163.com/soda_water05/blog/static/21283223520121126103955184/
    QString localHostName = QHostInfo::localHostName();
    QHostInfo hostInfo = QHostInfo::fromName(localHostName);
    //qDebug() << "host: " << localHostName << " ip: " << hostInfo.addresses();
    //hostInfo.addresses();
    foreach (QHostAddress adr, hostInfo.addresses()) {
        //qDebug() << adr.toString();
        if (adr.protocol() == QAbstractSocket::IPv4Protocol) {
            QString ip = adr.toString();
            if (ip.contains("192.")) {
                qDebug() << "ipv4 : " << ip;
                return ip;
            }

        }
    }
    return loadConfig("ip");
}

