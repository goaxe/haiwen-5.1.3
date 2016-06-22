#ifndef SEAFILE_CLIENT_UTILS_REGISTRY_H
#define SEAFILE_CLIENT_UTILS_REGISTRY_H

#include <QString>
#include <QVariant>
#include <windows.h>


#ifndef KEY_WOW64_64KEY
#define KEY_WOW64_64KEY 0x0100
#endif

#ifndef KEY_WOW64_32KEY
#define KEY_WOW64_32KEY 0x0200
#endif

/**
 * Windows Registry Element
 */
class RegElement {
public:
    static void removeRegKey(const QString& key);

    RegElement(const HKEY& root,
               const QString& path,
               const QString& name,
               const QString& value,
               bool expand=false);

    RegElement(const HKEY& root,
               const QString& path,
               const QString& name,
               DWORD value);

    int add();
    void read();
    void remove();
    bool exists();

    const HKEY& root() const { return root_; }
    const QString& path() const { return path_; }
    const QString& name() const { return name_; }
    const QString& stringValue() const { return string_value_; }
    DWORD dwordValue() const { return dword_value_; }
    QVariant value() const;

public:
    static int removeRegKey(HKEY root, const QString& path, const QString& subkey);

    static int getIntValue(HKEY root, const QString& path, const QString& name, bool *exists=NULL, int default_val=0);
    static QString getStringValue(HKEY root, const QString& path, const QString& name, bool *exists=NULL, QString default_val=QString());
    static int getPreconfigureIntValue(const QString& name);
    static QString getPreconfigureStringValue(const QString& name);

    static QVariant getPreconfigureValue(const QString& name);
    static QVariant getValue(HKEY root, const QString& path, const QString& name);

private:
    int openParentKey(HKEY *pKey);

    HKEY root_;
    QString path_;
    QString name_;
    QString string_value_;
    DWORD dword_value_;
    DWORD type_;
};

#endif // SEAFILE_CLIENT_UTILS_REGISTRY_H
