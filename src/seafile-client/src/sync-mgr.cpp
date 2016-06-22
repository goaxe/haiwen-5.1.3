//
// Created by root on 5/25/16.
//

#include "sync-mgr.h"
#include <QSettings>
#include "seafile-applet.h"
#include "settings-mgr.h"
// #include "ui/tray-icon.h"
// #include "utils/utils.h"

// #if defined(Q_WS_WIN)
// #include "utils/registry.h"
// #endif

SyncManager* SyncManager::syncMgr = NULL;

SyncManager::SyncManager() {
    isSync = false;
    useSync = false;
}

SyncManager::~SyncManager() {

}

SyncManager* SyncManager::instance() {
    if (syncMgr == NULL) {
        //load config from file
        syncMgr = new SyncManager();
        QSettings qsetting("config.ini", QSettings::IniFormat);
        syncMgr->useSync = qsetting.value("Sync/use-sync").toBool();
        syncMgr->startTime = QTime::fromString(qsetting.value("Sync/start-time").toString());
        syncMgr->endTime = QTime::fromString(qsetting.value("Sync/end-time").toString());
    }
    return syncMgr;
}

void SyncManager::saveConfig() {
    QSettings qsetting("config.ini", QSettings::IniFormat);
    qsetting.beginGroup("Sync");
    qsetting.setValue("use-sync", useSync);
    qsetting.setValue("start-time", startTime.toString());
    qsetting.setValue("end-time", endTime.toString());
    isSync = false;
}

void SyncManager::loadConfig() {
    QSettings qsetting("config.ini", QSettings::IniFormat);
    useSync = qsetting.value("Sync/use-sync").toBool();
    startTime = QTime::fromString(qsetting.value("Sync/start-time").toString());
    endTime = QTime::fromString(qsetting.value("Sync/end-time").toString());
}

void SyncManager::checkIfSyncOnce() {
    if (!useSync) {
        return;
    }
    QTime cur = QTime::currentTime();
    QSettings qsetting("config.ini", QSettings::IniFormat);
    qsetting.setValue("Log/check-time", "c:" + cur.toString() + " s:" + startTime.toString() + " e:" + endTime.toString());
    QTime z24 = QTime(23, 59, 59);
    if ((cur <= endTime && cur >= startTime) ||
        (endTime < startTime && ((cur <= z24 && cur >= startTime) || cur <= endTime))) {
        if (!isSync) { //��ʼͬ��
            //
            qsetting.setValue("Log/start-sync", cur.toString());
            isSync = true;
            seafApplet->settingsManager()->setAutoSync(true);
            //set_morphfile_auto_start(true);
            //morfApplet->trayIcon()->setState(MorphfileTrayIcon::STATE_DAEMON_UP);
        }
    } else { //�ر�ͬ��
        if (isSync) {
            //
            qsetting.setValue("Log/end-sync", cur.toString());
            isSync = false;
            seafApplet->settingsManager()->setAutoSync(false);
            //set_morphfile_auto_start(false);
            //morfApplet->trayIcon()->setState(MorphfileTrayIcon::STATE_DAEMON_AUTOSYNC_DISABLED);
        }
    }
}

void SyncManager::setStartTime(const QTime &time) {
    startTime = time;
}

void SyncManager::setEndTime(const QTime &time) {
    endTime = time;
}

void SyncManager::setUseSync(bool syncOn) {
    useSync = syncOn;
}

QTime SyncManager::getStartTime() {
    return startTime;
}

QTime SyncManager::getEndTime() {
    return endTime;
}

bool SyncManager::getUseSync() {
    return useSync;
}
