#ifndef SEAFILE_CLIENT_OPEN_LOCAL_FILE_HELPER_H
#define SEAFILE_CLIENT_OPEN_LOCAL_FILE_HELPER_H

extern "C" {

struct _CcnetClient;

}

#include <QObject>
#include <QUrl>
#include <QString>
class Account;

/**
 * Helper class to handle open local file request
 */
class OpenLocalHelper : public QObject
{
    Q_OBJECT
public:
    static OpenLocalHelper* instance();

    QUrl generateLocalFileSeafileUrl(const QString& repo_id, const Account& account, const QString& path);
    QUrl generateLocalFileWebUrl(const QString& repo_id, const Account& account, const QString& path);

    bool openLocalFile(const QUrl &url);

    void setUrl(const char *url) { url_ = url; }

    void handleOpenLocalFromCommandLine(const char *url);

    void checkPendingOpenLocalRequest();

private:
    static OpenLocalHelper* singleton_;

    OpenLocalHelper();

    void messageBox(const QString& msg);

    bool connectToCcnetDaemon();

    void sendOpenLocalFileMessage(const char *url);

    _CcnetClient *sync_client_;

    QByteArray url_;
};


#endif // SEAFILE_CLIENT_OPEN_LOCAL_FILE_HELPER_H
