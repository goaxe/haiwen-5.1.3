//
// Created by root on 5/25/16.
//
#ifndef POST_API_H
#define POST_API_H

#undef QT_NO_OPENSSL


#include <QString>
#include <QObject>
#include <QNetworkReply>
#include <QtDebug>

class QNetworkAccessManager;

class PostApi: public QObject {
    Q_OBJECT
public:
    static PostApi* instance();
    static void destory();
    virtual ~PostApi();

    void setEmail(const QString &);
    void get(const QUrl &url);
    void post(const QUrl &url, const QByteArray &postData);

    void sendUploadSpeed(int speed);
    void sendUploadStatus(const QString &repoId, const QString& status, int rate, int percent);
    void bindUserIp(QString ip);
    void sendLogs(QString logpath, int level);

    signals:
    void requestSuccess(QNetworkReply &reply);

private:
    PostApi();
    QString peerAdr;
    QString hostUri;
    QString localUri;
    QString userEmail;
    static QNetworkAccessManager *netManger;
    static PostApi *postApi;
    //QNetworkReply *reply_;
    QString loadConfig(const QString &key);
    QString getIpAddress();
private slots:
    void httpRequestFinished(QNetworkReply *reply_);
    void httpRequestReadReady(QNetworkReply *reply_);
};

#endif
