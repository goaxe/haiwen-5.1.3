//
// Created by root on 5/25/16.
//
#ifndef SYNC_MGR_H
#define SYNC_MGR_H
#include <QObject>
#include <QTime>

class SyncManager : public QObject {
    Q_OBJECT
public:
    static SyncManager* instance();
    virtual ~SyncManager();
    void checkIfSyncOnce();
    void saveConfig();
    QTime getStartTime();
    QTime getEndTime();
    bool getUseSync();
    void setStartTime(const QTime &time);
    void setEndTime(const QTime &time);
    void setUseSync(bool syncOn);
    void loadConfig();

private:
    SyncManager();
    static SyncManager *syncMgr;

private:
    Q_DISABLE_COPY(SyncManager);
    bool isSync;
    bool useSync;
    QTime startTime;
    QTime endTime;
};

#endif
