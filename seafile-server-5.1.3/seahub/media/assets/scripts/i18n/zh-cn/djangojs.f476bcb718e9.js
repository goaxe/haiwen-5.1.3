

(function (globals) {

  var django = globals.django || (globals.django = {});

  
  django.pluralidx = function (n) {
    var v=0;
    if (typeof(v) == 'boolean') {
      return v ? 1 : 0;
    } else {
      return v;
    }
  };
  

  
  /* gettext library */

  django.catalog = {
    "%curr% of %total%": "%curr% / %total%", 
    "<a href=\"%url%\" target=\"_blank\">The image</a> could not be loaded.": "<a href=\"%url%\" target=\"_blank\">\u56fe\u7247</a> \u65e0\u6cd5\u88ab\u52a0\u8f7d\u3002", 
    "Are you sure you want to delete these selected items?": "\u786e\u5b9a\u8981\u5220\u9664\u9009\u4e2d\u7684\u6761\u76ee\u5417\uff1f", 
    "Are you sure you want to quit this group?": "\u786e\u5b9a\u8981\u9000\u51fa\u8be5\u7fa4\u7ec4\u5417\uff1f", 
    "Cancel": "\u53d6\u6d88", 
    "Canceled.": "\u5df2\u53d6\u6d88\u3002", 
    "Change Password of Library {placeholder}": "\u66f4\u6539\u8d44\u6599\u5e93 {placeholder} \u5bc6\u7801", 
    "Close (Esc)": "\u5173\u95ed (Esc)", 
    "Copy selected item(s) to:": "\u5c06\u5df2\u9009\u6761\u76ee\u590d\u5236\u5230\uff1a", 
    "Copy {placeholder} to:": "\u590d\u5236 {placeholder} \u5230", 
    "Copying %(name)s": "\u6b63\u5728\u590d\u5236 %(name)s", 
    "Copying file %(index)s of %(total)s": "\u6b63\u5728\u590d\u5236\u6587\u4ef6  %(index)s / %(total)s", 
    "Delete": "\u5220\u9664", 
    "Delete Items": "\u5220\u9664\u6761\u76ee", 
    "Delete failed": "\u5220\u9664\u5931\u8d25", 
    "Delete succeeded.": "\u5220\u9664\u6210\u529f\u3002", 
    "Deleted directories": "\u5220\u9664\u7684\u76ee\u5f55", 
    "Deleted files": "\u5220\u9664\u7684\u6587\u4ef6", 
    "Dismiss Group": "\u89e3\u6563\u7fa4\u7ec4", 
    "Edit failed": "\u7f16\u8f91\u5931\u8d25", 
    "Empty file upload result": "\u7a7a\u6587\u4ef6", 
    "Encrypted library": "\u52a0\u5bc6\u8d44\u6599\u5e93", 
    "Error": "\u9519\u8bef", 
    "Expired": "\u5df2\u8fc7\u671f", 
    "Failed to copy %(name)s": "\u590d\u5236 %(name)s \u5931\u8d25", 
    "Failed to delete %(name)s and %(amount)s other items.": "\u5220\u9664 %(name)s \u4ee5\u53ca\u53e6\u5916 %(amount)s \u9879\u5931\u8d25\u3002", 
    "Failed to delete %(name)s and 1 other item.": "\u5220\u9664 %(name)s \u4ee5\u53ca\u53e6\u59161\u9879\u5931\u8d25\u3002", 
    "Failed to delete %(name)s.": "\u5220\u9664 %(name)s \u5931\u8d25\u3002", 
    "Failed to get update url": "\u65e0\u6cd5\u83b7\u5f97\u66f4\u65b0\u94fe\u63a5", 
    "Failed to get upload url": "\u65e0\u6cd5\u83b7\u5f97\u4e0a\u4f20\u94fe\u63a5", 
    "Failed to move %(name)s": "\u79fb\u52a8 %(name)s \u5931\u8d25", 
    "Failed to send to {placeholder}": "\u53d1\u9001\u7ed9 {placeholder} \u5931\u8d25", 
    "Failed.": "\u5931\u8d25\u3002", 
    "Failed. Please check the network.": "\u64cd\u4f5c\u5931\u8d25\u3002\u8bf7\u68c0\u67e5\u7f51\u7edc\u662f\u5426\u5df2\u8fde\u63a5\u3002", 
    "File Upload canceled": "\u6587\u4ef6\u4e0a\u4f20\u5df2\u53d6\u6d88", 
    "File Upload complete": "\u6587\u4ef6\u4e0a\u4f20\u5df2\u5b8c\u6210", 
    "File Upload failed": "\u6587\u4ef6\u4e0a\u4f20\u5931\u8d25", 
    "File Uploading...": "\u6587\u4ef6\u4e0a\u4f20\u4e2d...", 
    "File is locked": "\u6587\u4ef6\u5df2\u9501\u5b9a", 
    "File is too big": "\u6587\u4ef6\u592a\u5927", 
    "File is too small": "\u6587\u4ef6\u592a\u5c0f", 
    "Filetype not allowed": "\u4e0d\u652f\u6301\u7684\u6587\u4ef6\u7c7b\u578b", 
    "Hide": "\u9690\u85cf", 
    "Internal error. Failed to copy %(name)s and %(amount)s other item(s).": "\u5185\u90e8\u9519\u8bef\u3002\u590d\u5236 %(name)s \u548c\u5176\u4ed6 %(amount)s \u9879\u5185\u5bb9\u5931\u8d25\u3002", 
    "Internal error. Failed to copy %(name)s.": "\u5185\u90e8\u9519\u8bef\u3002\u590d\u5236 %(name)s \u5931\u8d25\u3002", 
    "Internal error. Failed to move %(name)s and %(amount)s other item(s).": "\u5185\u90e8\u9519\u8bef\u3002\u79fb\u52a8 %(name)s \u548c\u5176\u4ed6 %(amount)s \u9879\u5185\u5bb9\u5931\u8d25\u3002", 
    "Internal error. Failed to move %(name)s.": "\u5185\u90e8\u9519\u8bef\u3002\u79fb\u52a8 %(name)s \u5931\u8d25\u3002", 
    "Invalid destination path": "\u76ee\u6807\u8def\u5f84\u65e0\u6548", 
    "It is required.": "\u5fc5\u586b\u9879\u3002", 
    "Just now": "\u521a\u624d", 
    "Loading failed": "\u52a0\u8f7d\u5931\u8d25", 
    "Loading...": "\u52a0\u8f7d\u4e2d...", 
    "Max number of files exceeded": "\u6587\u4ef6\u592a\u591a", 
    "Modified files": "\u4fee\u6539\u4e86\u7684\u6587\u4ef6", 
    "Move selected item(s) to:": "\u5c06\u5df2\u9009\u6761\u76ee\u79fb\u52a8\u5230\uff1a", 
    "Move {placeholder} to:": "\u79fb\u52a8 {placeholder} \u5230", 
    "Moving %(name)s": "\u6b63\u5728\u79fb\u52a8 %(name)s", 
    "Moving file %(index)s of %(total)s": "\u6b63\u5728\u79fb\u52a8\u6587\u4ef6 %(index)s / %(total)s", 
    "Name is required": "\u540d\u79f0\u4e3a\u5fc5\u586b\u9879", 
    "New directories": "\u65b0\u76ee\u5f55", 
    "New files": "\u65b0\u6587\u4ef6", 
    "New password is too short": "\u65b0\u5bc6\u7801\u592a\u77ed", 
    "New passwords don't match": "\u4e24\u6b21\u8f93\u5165\u7684\u65b0\u5bc6\u7801\u4e0d\u4e00\u81f4", 
    "Next (Right arrow key)": "\u4e0b\u4e00\u5f20\uff08\u53f3\u65b9\u5411\u952e\uff09", 
    "No matches": "\u6ca1\u6709\u5339\u914d\u9879", 
    "Only an extension there, please input a name.": "\u8bf7\u8f93\u5165\u5b8c\u6574\u7684\u6587\u4ef6\u540d\u3002", 
    "Open in New Tab": "\u5728\u65b0\u6807\u7b7e\u9875\u6253\u5f00", 
    "Password is required.": "\u5bc6\u7801\u4e3a\u5fc5\u586b\u9879\u3002", 
    "Password is too short": "\u5bc6\u7801\u592a\u77ed", 
    "Passwords don't match": "\u4e24\u6b21\u8f93\u5165\u7684\u5bc6\u7801\u4e0d\u4e00\u81f4", 
    "Permission error": "\u6743\u9650\u9519\u8bef", 
    "Please check the network.": "\u8bf7\u68c0\u67e5\u7f51\u7edc\u662f\u5426\u5df2\u8fde\u63a5\u3002", 
    "Please choose a CSV file": "\u8bf7\u6dfb\u52a0 CSV \u6587\u4ef6", 
    "Please click and choose a directory.": "\u8bf7\u70b9\u51fb\u9009\u62e9\u76ee\u6807\u76ee\u5f55\u3002", 
    "Please enter 1 or more character": "\u8bf7\u8f93\u5165 1 \u4e2a\u6216\u66f4\u591a\u5b57\u7b26", 
    "Please enter a new password": "\u8bf7\u8f93\u5165\u65b0\u5bc6\u7801\u3002", 
    "Please enter days.": "\u8bf7\u8f93\u5165\u5929\u6570\u3002", 
    "Please enter password": "\u8bf7\u8f93\u5165\u5bc6\u7801", 
    "Please enter the new password again": "\u8bf7\u518d\u6b21\u8f93\u5165\u65b0\u5bc6\u7801", 
    "Please enter the old password": "\u8bf7\u8f93\u5165\u65e7\u5bc6\u7801\u3002", 
    "Please enter the password again": "\u8bf7\u518d\u6b21\u8f93\u5165\u5bc6\u7801", 
    "Please enter valid days": "\u8bf7\u8f93\u5165\u6709\u6548\u7684\u5929\u6570", 
    "Please input at least an email.": "\u8bf7\u8f93\u5165\u81f3\u5c11\u4e00\u4e2a\u90ae\u7bb1\u3002", 
    "Previous (Left arrow key)": "\u4e0a\u4e00\u5f20\uff08\u5de6\u65b9\u5411\u952e\uff09", 
    "Processing...": "\u5904\u7406\u4e2d...", 
    "Quit Group": "\u9000\u51fa\u7fa4\u7ec4", 
    "Read-Only library": "\u53ea\u8bfb\u8d44\u6599\u5e93", 
    "Read-Write library": "\u53ef\u8bfb\u5199\u8d44\u6599\u5e93", 
    "Really want to delete {lib_name}?": "\u786e\u5b9a\u8981\u5220\u9664 {lib_name} ?", 
    "Really want to dismiss this group?": "\u786e\u5b9a\u8981\u89e3\u6563\u8be5\u7fa4\u7ec4\u5417\uff1f", 
    "Rename File": "\u91cd\u547d\u540d\u6587\u4ef6", 
    "Rename Folder": "\u91cd\u547d\u540d\u76ee\u5f55", 
    "Renamed or Moved files": "\u91cd\u547d\u540d\u6216\u79fb\u52a8\u7684\u6587\u4ef6", 
    "Replace file {filename}?": "\u8986\u76d6\u6587\u4ef6 {filename} \uff1f", 
    "Saving...": "\u4fdd\u5b58\u4e2d...", 
    "Search user or enter email and press Enter": "\u641c\u7d22\u7528\u6237\u6216\u8f93\u5165\u7535\u5b50\u90ae\u4ef6\uff0c\u7136\u540e\u6309Enter", 
    "Search users or enter emails and press Enter": "\u641c\u7d22\u7528\u6237\u6216\u8f93\u5165\u7535\u5b50\u90ae\u4ef6\uff0c\u7136\u540e\u6309Enter", 
    "Searching...": "\u641c\u7d22\u4e2d...", 
    "Select a group": "\u9009\u62e9\u4e00\u4e2a\u7fa4\u7ec4", 
    "Select groups": "\u9009\u62e9\u7fa4\u7ec4", 
    "Set {placeholder}'s permission": "\u8bbe\u7f6e {placeholder} \u6743\u9650", 
    "Share {placeholder}": "\u5171\u4eab {placeholder}", 
    "Show": "\u663e\u793a", 
    "Start": "\u4e0a\u4f20", 
    "Success": "\u6210\u529f", 
    "Successfully changed library password.": "\u8d44\u6599\u5e93\u5bc6\u7801\u91cd\u7f6e\u6210\u529f\u3002", 
    "Successfully clean all errors.": "\u6e05\u9664\u6240\u6709\u9519\u8bef\u6210\u529f\u3002", 
    "Successfully copied %(name)s": "\u6210\u529f\u62f7\u8d1d %(name)s", 
    "Successfully copied %(name)s and %(amount)s other items.": "\u6210\u529f\u590d\u5236 %(name)s \u548c\u5176\u4ed6 %(amount)s \u9879\u6761\u76ee\u3002", 
    "Successfully copied %(name)s and 1 other item.": "\u6210\u529f\u590d\u5236 %(name)s \u548c\u53e61\u9879\u6761\u76ee\u3002", 
    "Successfully copied %(name)s.": "\u6210\u529f\u590d\u5236 %(name)s\u3002", 
    "Successfully deleted %(name)s": "\u5220\u9664 %(name)s \u6210\u529f", 
    "Successfully deleted %(name)s and %(amount)s other items.": "\u6210\u529f\u5220\u9664 %(name)s \u548c\u5176\u4ed6 %(amount)s \u9879\u5185\u5bb9\u3002", 
    "Successfully deleted %(name)s and 1 other item.": "\u6210\u529f\u5220\u9664 %(name)s \u548c\u5176\u4ed6\u4e00\u9879\u5185\u5bb9\u3002", 
    "Successfully deleted %(name)s.": "\u6210\u529f\u5220\u9664 %(name)s\u3002", 
    "Successfully imported.": "\u5bfc\u5165\u6210\u529f\u3002", 
    "Successfully moved %(name)s": "\u6210\u529f\u79fb\u52a8 %(name)s\u3002", 
    "Successfully moved %(name)s and %(amount)s other items.": "\u6210\u529f\u79fb\u52a8 %(name)s \u548c\u5176\u4ed6 %(amount)s \u9879\u6761\u76ee\u3002", 
    "Successfully moved %(name)s and 1 other item.": "\u6210\u529f\u79fb\u52a8 %(name)s \u548c\u53e61\u9879\u6761\u76ee\u3002", 
    "Successfully moved %(name)s.": "\u6210\u529f\u79fb\u52a8 %(name)s\u3002", 
    "Successfully sent to {placeholder}": "\u6210\u529f\u53d1\u9001\u7ed9 {placeholder}", 
    "Successfully set library history.": "\u6210\u529f\u8bbe\u7f6e\u8d44\u6599\u5e93\u5386\u53f2\u3002", 
    "Successfully transferred the group. You are now a normal member of the group.": "\u6210\u529f\u8f6c\u8ba9\u7fa4\u7ec4\u3002\u60a8\u73b0\u5728\u5df2\u6210\u4e3a\u7fa4\u4e3b\u7684\u666e\u901a\u6210\u5458\u3002", 
    "Successfully transferred the library.": "\u8d44\u6599\u5e93\u8f6c\u8ba9\u6210\u529f\u3002", 
    "Successfully unlink %(name)s.": "\u65ad\u5f00 %(name)s \u8fde\u63a5\u6210\u529f\u3002", 
    "Successfully unshared {placeholder}": "\u6210\u529f\u53d6\u6d88\u5171\u4eab {placeholder}", 
    "Successfully unstared {placeholder}": "\u6210\u529f\u53d6\u6d88\u661f\u6807 {placeholder}", 
    "Transfer Library {library_name} To": "\u8f6c\u79fb\u8d44\u6599\u5e93 {library_name} \u7ed9", 
    "Uploaded bytes exceed file size": "\u4e0a\u4f20\u5927\u5c0f\u8d85\u8fc7\u4e86\u6587\u4ef6\u5927\u5c0f", 
    "You can only select 1 item": "\u53ea\u80fd\u9009\u62e91\u4e2a\u9879\u76ee", 
    "You cannot select any more choices": "\u60a8\u4e0d\u80fd\u9009\u62e9\u66f4\u591a\u9879", 
    "canceled": "\u5df2\u53d6\u6d88", 
    "locked by {placeholder}": "\u88ab {placeholder} \u9501\u5b9a", 
    "uploaded": "\u5df2\u4e0a\u4f20", 
    "{placeholder} Folder Permission": "{placeholder} \u76ee\u5f55\u6743\u9650", 
    "{placeholder} History Setting": "{placeholder} \u5386\u53f2\u8bbe\u7f6e", 
    "{placeholder} Members": "{placeholder} \u6210\u5458", 
    "{placeholder} Share Links": "{placeholder} \u5171\u4eab\u5916\u94fe"
  };

  django.gettext = function (msgid) {
    var value = django.catalog[msgid];
    if (typeof(value) == 'undefined') {
      return msgid;
    } else {
      return (typeof(value) == 'string') ? value : value[0];
    }
  };

  django.ngettext = function (singular, plural, count) {
    var value = django.catalog[singular];
    if (typeof(value) == 'undefined') {
      return (count == 1) ? singular : plural;
    } else {
      return value[django.pluralidx(count)];
    }
  };

  django.gettext_noop = function (msgid) { return msgid; };

  django.pgettext = function (context, msgid) {
    var value = django.gettext(context + '\x04' + msgid);
    if (value.indexOf('\x04') != -1) {
      value = msgid;
    }
    return value;
  };

  django.npgettext = function (context, singular, plural, count) {
    var value = django.ngettext(context + '\x04' + singular, context + '\x04' + plural, count);
    if (value.indexOf('\x04') != -1) {
      value = django.ngettext(singular, plural, count);
    }
    return value;
  };
  

  django.interpolate = function (fmt, obj, named) {
    if (named) {
      return fmt.replace(/%\(\w+\)s/g, function(match){return String(obj[match.slice(2,-2)])});
    } else {
      return fmt.replace(/%s/g, function(match){return String(obj.shift())});
    }
  };


  /* formatting library */

  django.formats = {
    "DATETIME_FORMAT": "Y\u5e74n\u6708j\u65e5 H:i", 
    "DATETIME_INPUT_FORMATS": [
      "%Y/%m/%d %H:%M", 
      "%Y-%m-%d %H:%M", 
      "%Y\u5e74%n\u6708%j\u65e5 %H:%M", 
      "%Y/%m/%d %H:%M:%S", 
      "%Y-%m-%d %H:%M:%S", 
      "%Y\u5e74%n\u6708%j\u65e5 %H:%M:%S", 
      "%Y/%m/%d %H:%M:%S.%f", 
      "%Y-%m-%d %H:%M:%S.%f", 
      "%Y\u5e74%n\u6708%j\u65e5 %H:%n:%S.%f", 
      "%Y-%m-%d"
    ], 
    "DATE_FORMAT": "Y\u5e74n\u6708j\u65e5", 
    "DATE_INPUT_FORMATS": [
      "%Y/%m/%d", 
      "%Y-%m-%d", 
      "%Y\u5e74%n\u6708%j\u65e5"
    ], 
    "DECIMAL_SEPARATOR": ".", 
    "FIRST_DAY_OF_WEEK": "1", 
    "MONTH_DAY_FORMAT": "m\u6708j\u65e5", 
    "NUMBER_GROUPING": "4", 
    "SHORT_DATETIME_FORMAT": "Y\u5e74n\u6708j\u65e5 H:i", 
    "SHORT_DATE_FORMAT": "Y\u5e74n\u6708j\u65e5", 
    "THOUSAND_SEPARATOR": "", 
    "TIME_FORMAT": "H:i", 
    "TIME_INPUT_FORMATS": [
      "%H:%M", 
      "%H:%M:%S", 
      "%H:%M:%S.%f"
    ], 
    "YEAR_MONTH_FORMAT": "Y\u5e74n\u6708"
  };

  django.get_format = function (format_type) {
    var value = django.formats[format_type];
    if (typeof(value) == 'undefined') {
      return format_type;
    } else {
      return value;
    }
  };

  /* add to global namespace */
  globals.pluralidx = django.pluralidx;
  globals.gettext = django.gettext;
  globals.ngettext = django.ngettext;
  globals.gettext_noop = django.gettext_noop;
  globals.pgettext = django.pgettext;
  globals.npgettext = django.npgettext;
  globals.interpolate = django.interpolate;
  globals.get_format = django.get_format;

}(this));

