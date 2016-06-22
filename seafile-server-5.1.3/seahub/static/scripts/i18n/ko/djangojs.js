

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
    "%curr% of %total%": "%total% \uc911 %curr%", 
    "<a href=\"%url%\" target=\"_blank\">The image</a> could not be loaded.": "<a href=\"%url%\" target=\"_blank\">\uc774\ubbf8\uc9c0</a>\ub97c \ubd88\ub7ec\uc62c \uc218 \uc5c6\uc2b5\ub2c8\ub2e4.", 
    "Are you sure you want to delete these selected items?": "\uc815\ub9d0\ub85c \uc120\ud0dd\ud55c \ud56d\ubaa9\uc744 \uc0ad\uc81c\ud560\uae4c\uc694?", 
    "Are you sure you want to quit this group?": "\uc815\ub9d0\ub85c \uc774 \uadf8\ub8f9\uc5d0\uc11c \ub098\uac00\uc2dc\uaca0\uc2b5\ub2c8\uae4c?", 
    "Cancel": "\ucde8\uc18c", 
    "Canceled.": "\ucde8\uc18c\ud588\uc2b5\ub2c8\ub2e4.", 
    "Change Password of Library {placeholder}": "{placeholder} \ub77c\uc774\ube0c\ub7ec\ub9ac\uc758 \uc554\ud638 \ubc14\uafb8\uae30", 
    "Close (Esc)": "\ub2eb\uae30(Esc)", 
    "Copy selected item(s) to:": "\uc120\ud0dd\ud55c \ud56d\ubaa9\uc744 \ubcf5\uc0ac\ud560 \uc704\uce58:", 
    "Copy {placeholder} to:": "\ub2e4\uc74c\uc73c\ub85c {placeholder} \ubcf5\uc0ac:", 
    "Copying %(name)s": "{placeholder} \ubcf5\uc0ac \uc911", 
    "Copying file %(index)s of %(total)s": "\ud30c\uc77c %(total)s\uac1c \uc911 %(index)s\uac1c \ubcf5\uc0ac \uc911", 
    "Delete": "\uc0ad\uc81c", 
    "Delete Items": "\ud56d\ubaa9 \uc0ad\uc81c", 
    "Delete failed": "\uc0ad\uc81c \uc2e4\ud328", 
    "Delete succeeded.": "\uc0c1\uacf5\uc801\uc73c\ub85c \uc0ad\uc81c\ud588\uc2b5\ub2c8\ub2e4.", 
    "Deleted directories": "\uc0ad\uc81c\ud55c \ub514\ub809\ud130\ub9ac", 
    "Deleted files": "\uc0ad\uc81c\ud55c \ud30c\uc77c", 
    "Dismiss Group": "\uadf8\ub8f9 \uc0ad\uc81c", 
    "Edit failed": "\ud3b8\uc9d1 \uc2e4\ud328", 
    "Empty file upload result": "\uc5c5\ub85c\ub4dc \uacb0\uacfc\uac00 \ube48 \ud30c\uc77c\uc785\ub2c8\ub2e4", 
    "Encrypted library": "\uc554\ud638\ud654 \ub77c\uc774\ube0c\ub7ec\ub9ac", 
    "Error": "\uc624\ub958", 
    "Expired": "\uc720\ud6a8\uae30\uac04 \uacbd\uacfc\ud568", 
    "Failed to copy %(name)s": "%(name)s \ubcf5\uc0ac\uc5d0 \uc2e4\ud328\ud588\uc2b5\ub2c8\ub2e4.", 
    "Failed to delete %(name)s and %(amount)s other items.": "%(name)s \ubc0f \ud56d\ubaa9 %(amount)s\uac1c \uc0ad\uc81c\uc5d0 \uc2e4\ud328\ud588\uc2b5\ub2c8\ub2e4.", 
    "Failed to delete %(name)s and 1 other item.": "%(name)s \ubc0f \ud56d\ubaa9 1\uac1c \uc0ad\uc81c\uc5d0 \uc2e4\ud328\ud588\uc2b5\ub2c8\ub2e4.", 
    "Failed to delete %(name)s.": "%(name)s \uc0ad\uc81c\uc5d0 \uc2e4\ud328\ud588\uc2b5\ub2c8\ub2e4.", 
    "Failed to get update url": "\uc5c5\ub85c\ub4dc URL \uac00\uc838\uc624\uae30\uc5d0 \uc2e4\ud328\ud588\uc2b5\ub2c8\ub2e4", 
    "Failed to get upload url": "\uc5c5\ub85c\ub4dc URL \uac00\uc838\uc624\uae30\uc5d0 \uc2e4\ud328\ud588\uc2b5\ub2c8\ub2e4", 
    "Failed to move %(name)s": "%(name)s \uc774\ub3d9\uc5d0 \uc2e4\ud328\ud588\uc2b5\ub2c8\ub2e4.", 
    "Failed to send to {placeholder}": "{placeholder}\uc5d0\uac8c \ubcf4\ub0b4\uae30\uc5d0 \uc2e4\ud328\ud588\uc2b5\ub2c8\ub2e4", 
    "Failed.": "\uc2e4\ud328\ud588\uc2b5\ub2c8\ub2e4.", 
    "Failed. Please check the network.": "\uc2e4\ud328\ud588\uc2b5\ub2c8\ub2e4. \ub124\ud2b8\uc6cc\ud06c\ub97c \ud655\uc778\ud558\uc138\uc694.", 
    "File Upload canceled": "\ud30c\uc77c \uc5c5\ub85c\ub4dc\ub97c \ucde8\uc18c\ud588\uc2b5\ub2c8\ub2e4", 
    "File Upload complete": "\ud30c\uc77c \uc5c5\ub85c\ub4dc\uac00 \ub05d\ub0ac\uc2b5\ub2c8\ub2e4", 
    "File Upload failed": "\ud30c\uc77c \uc5c5\ub85c\ub4dc\uc5d0 \uc2e4\ud328\ud588\uc2b5\ub2c8\ub2e4", 
    "File Uploading...": "\ud30c\uc77c \uc5c5\ub85c\ub4dc \uc911...", 
    "File is locked": "\ud30c\uc77c\uc774 \uc7a0\uaca8\uc788\uc2b5\ub2c8\ub2e4", 
    "File is too big": "\ud30c\uc77c\uc774 \ub108\ubb34 \ud07d\ub2c8\ub2e4", 
    "File is too small": "\ud30c\uc77c\uc774 \ub108\ubb34 \uc791\uc2b5\ub2c8\ub2e4", 
    "Filetype not allowed": "\ud30c\uc77c \ud615\uc2dd\uc744 \ud5c8\uc6a9\ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4", 
    "Hide": "\uc228\uae40", 
    "Internal error. Failed to copy %(name)s and %(amount)s other item(s).": "\ub0b4\ubd80 \uc624\ub958\uc785\ub2c8\ub2e4. %(name)s \ubc0f \ud56d\ubaa9 %(amount)s\uac1c \ubcf5\uc0ac\uc5d0 \uc2e4\ud328\ud588\uc2b5\ub2c8\ub2e4.", 
    "Internal error. Failed to copy %(name)s.": "\ub0b4\ubd80 \uc624\ub958\uc785\ub2c8\ub2e4. %(name)s \ubcf5\uc0ac\uc5d0 \uc2e4\ud328\ud588\uc2b5\ub2c8\ub2e4.", 
    "Internal error. Failed to move %(name)s and %(amount)s other item(s).": "\ub0b4\ubd80 \uc624\ub958\uc785\ub2c8\ub2e4. %(name)s \ubc0f \ud56d\ubaa9 %(amount)s\uac1c \uc774\ub3d9\uc5d0 \uc2e4\ud328\ud588\uc2b5\ub2c8\ub2e4.", 
    "Internal error. Failed to move %(name)s.": "\ub0b4\ubd80 \uc624\ub958\uc785\ub2c8\ub2e4. %(name)s \uc774\ub3d9\uc5d0 \uc2e4\ud328\ud588\uc2b5\ub2c8\ub2e4.", 
    "Invalid destination path": "\uc798\ubabb\ub41c \ub300\uc0c1 \uacbd\ub85c", 
    "It is required.": "\ud544\uc694\ud569\ub2c8\ub2e4.", 
    "Just now": "\uc9c0\uae08", 
    "Loading failed": "\ubd88\ub7ec\uc624\uae30\uc5d0 \uc2e4\ud328\ud588\uc2b5\ub2c8\ub2e4", 
    "Loading...": "\ubd88\ub7ec\uc624\ub294 \uc911...", 
    "Max number of files exceeded": "\ucd5c\ub300 \ud30c\uc77c \uac2f\uc218\ub97c \ub118\uc5b4\uc130\uc2b5\ub2c8\ub2e4", 
    "Modified files": "\uc218\uc815\ud55c \ud30c\uc77c", 
    "Move selected item(s) to:": "\uc120\ud0dd\ud55c \ud56d\ubaa9\uc744 \uc62e\uae38 \uc704\uce58:", 
    "Move {placeholder} to:": "\ub2e4\uc74c\uc73c\ub85c {placeholder} \uc774\ub3d9:", 
    "Moving %(name)s": "{placeholder} \uc774\ub3d9 \uc911", 
    "Moving file %(index)s of %(total)s": "\ud30c\uc77c %(total)s\uac1c \uc911 %(index)s\uac1c \uc774\ub3d9 \uc911", 
    "Name is required": "\uc774\ub984\uc774 \ud544\uc694\ud569\ub2c8\ub2e4", 
    "New directories": "\uc0c8 \ub514\ub809\ud130\ub9ac", 
    "New files": "\uc0c8 \ud30c\uc77c", 
    "New password is too short": "\uc0c8 \uc554\ud638\uac00 \ub108\ubb34 \uc9e7\uc2b5\ub2c8\ub2e4", 
    "New passwords don't match": "\uc0c8 \uc554\ud638\uac00 \uc77c\uce58\ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4", 
    "Next (Right arrow key)": "\ub2e4\uc74c(\uc624\ub978\ucabd \ud654\uc0b4\ud45c \ud0a4)", 
    "No matches": "\uc77c\uce58\ud558\ub294 \uacb0\uacfc\uac00 \uc5c6\uc2b5\ub2c8\ub2e4", 
    "Only an extension there, please input a name.": "\ud655\uc7a5\uc790\ub9cc \uc788\uc2b5\ub2c8\ub2e4. \uc774\ub984\uc744 \uc785\ub825\ud558\uc138\uc694.", 
    "Open in New Tab": "\uc0c8 \ud0ed \uc5f4\uae30", 
    "Password is required.": "\uc554\ud638\uac00 \ud544\uc694\ud569\ub2c8\ub2e4.", 
    "Password is too short": "\uc554\ud638\uac00 \ub108\ubb34 \uc9e7\uc2b5\ub2c8\ub2e4", 
    "Passwords don't match": "\uc554\ud638\uac00 \uc77c\uce58\ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4", 
    "Permission error": "\uad8c\ud55c \uc624\ub958", 
    "Please check the network.": "\ub124\ud2b8\uc6cc\ud06c\ub97c \ud655\uc778\ud558\uc138\uc694.", 
    "Please choose a CSV file": "CSV \ud30c\uc77c\uc744 \uc120\ud0dd\ud558\uc2ed\uc2dc\uc624", 
    "Please click and choose a directory.": "\ub514\ub809\ud130\ub9ac\ub97c \ub20c\ub7ec \uc120\ud0dd\ud558\uc2ed\uc2dc\uc624.", 
    "Please enter 1 or more character": "\ud558\ub098 \uc774\uc0c1\uc758 \ubb38\uc790\ub97c \uc785\ub825\ud558\uc138\uc694", 
    "Please enter a new password": "\uc0c8 \uc554\ud638\ub97c \uc785\ub825\ud558\uc2ed\uc2dc\uc624", 
    "Please enter days.": "\uc77c\uc790\ub97c \uc785\ub825\ud558\uc138\uc694.", 
    "Please enter password": "\uc554\ud638\ub97c \uc785\ub825\ud558\uc138\uc694", 
    "Please enter the new password again": "\uc0c8 \uc554\ud638\ub97c \ub2e4\uc2dc \uc785\ub825\ud558\uc2ed\uc2dc\uc624", 
    "Please enter the old password": "\uc774\uc804 \uc554\ud638\ub97c \uc785\ub825\ud558\uc2ed\uc2dc\uc624", 
    "Please enter the password again": "\uc554\ud638\ub97c \ub2e4\uc2dc \uc785\ub825\ud558\uc138\uc694", 
    "Please enter valid days": "\uc720\ud6a8 \uae30\uac04\uc744 \uc785\ub825\ud558\uc138\uc694", 
    "Please input at least an email.": "\ucd5c\uc18c\ud55c \ud558\ub098\uc758 \uc804\uc790\uba54\uc77c \uc8fc\uc18c\ub97c \uc785\ub825\ud558\uc138\uc694.", 
    "Previous (Left arrow key)": "\uc774\uc804(\uc67c\ucabd \ud654\uc0b4\ud45c \ud0a4)", 
    "Processing...": "\ucc98\ub9ac \uc911...", 
    "Quit Group": "\uadf8\ub8f9 \ub098\uac00\uae30", 
    "Read-Only library": "\uc77d\uae30 \uc804\uc6a9 \ub77c\uc774\ube0c\ub7ec\ub9ac", 
    "Read-Write library": "\uc77d\uae30-\uc4f0\uae30 \ub77c\uc774\ube0c\ub7ec\ub9ac", 
    "Really want to delete {lib_name}?": "{lib_name} \ub77c\uc774\ube0c\ub7ec\ub9ac\ub97c \uc815\ub9d0 \uc0ad\uc81c\ud560\uae4c\uc694?", 
    "Really want to dismiss this group?": "\uc815\ub9d0 \uadf8\ub8f9\uc744 \uc0ad\uc81c\ud558\uc2dc\uaca0\uc2b5\ub2c8\uae4c?", 
    "Rename File": "\ud30c\uc77c \uc774\ub984 \ubc14\uafb8\uae30", 
    "Rename Folder": "\ud3f4\ub354 \uc774\ub984 \ubc14\uafb8\uae30", 
    "Renamed or Moved files": "\uc774\ub984 \ubc14\uafb8\uac70\ub098 \uc62e\uae34 \ud30c\uc77c", 
    "Replace file {filename}?": "{filename} \ud30c\uc77c\uc744 \ubc14\uafc0\uae4c\uc694?", 
    "Saving...": "\uc800\uc7a5 \uc911...", 
    "Search user or enter email and press Enter": "\uc0ac\uc6a9\uc790\ub97c \uac80\uc0c9\ud558\uac70\ub098 \uc804\uc790\uba54\uc77c \uc8fc\uc18c\ub97c \uc785\ub825\ud55c \ud6c4 \uc5d4\ud130 \ud0a4\ub97c \ub204\ub974\uc2ed\uc2dc\uc624", 
    "Search users or enter emails and press Enter": "\uc0ac\uc6a9\uc790\ub97c \uac80\uc0c9\ud558\uac70\ub098 \uc804\uc790\uba54\uc77c \uc8fc\uc18c\ub97c \uc785\ub825\ud55c \ud6c4 \uc5d4\ud130 \ud0a4\ub97c \ub204\ub974\uc2ed\uc2dc\uc624", 
    "Searching...": "\uac80\uc0c9 \uc911...", 
    "Select a group": "\uadf8\ub8f9 \uc120\ud0dd", 
    "Select groups": "\uadf8\ub8f9 \uc120\ud0dd", 
    "Set {placeholder}'s permission": "{placeholder} \uad8c\ud55c \uc124\uc815", 
    "Share {placeholder}": "{placeholder} \uacf5\uc720", 
    "Show": "\ud45c\uc2dc", 
    "Start": "\uc2dc\uc791", 
    "Success": "\uc131\uacf5", 
    "Successfully changed library password.": "\ub77c\uc774\ube0c\ub7ec\ub9ac \uc554\ud638\ub97c \uc131\uacf5\uc801\uc73c\ub85c \ubc14\uafb8\uc5c8\uc2b5\ub2c8\ub2e4.", 
    "Successfully copied %(name)s": "%(name)s \ubcf5\uc0ac\uc5d0 \uc131\uacf5\ud588\uc2b5\ub2c8\ub2e4", 
    "Successfully copied %(name)s and %(amount)s other items.": "%(name)s \ubc0f \ud56d\ubaa9 %(amount)s\uac1c\ub97c \uc131\uacf5\uc801\uc73c\ub85c \ubcf5\uc0ac\ud588\uc2b5\ub2c8\ub2e4.", 
    "Successfully copied %(name)s and 1 other item.": "%(name)s \ubc0f \ud56d\ubaa9 1\uac1c\ub97c \uc131\uacf5\uc801\uc73c\ub85c \ubcf5\uc0ac\ud588\uc2b5\ub2c8\ub2e4.", 
    "Successfully copied %(name)s.": "%(name)s\uc744(\ub97c) \uc131\uacf5\uc801\uc73c\ub85c \ubcf5\uc0ac\ud588\uc2b5\ub2c8\ub2e4.", 
    "Successfully deleted %(name)s": "%(name)s\uc744(\ub97c) \uc131\uacf5\uc801\uc73c\ub85c \uc0ad\uc81c\ud588\uc2b5\ub2c8\ub2e4", 
    "Successfully deleted %(name)s and %(amount)s other items.": "%(name)s \ubc0f \ud56d\ubaa9 %(amount)s\uac1c\ub97c \uc131\uacf5\uc801\uc73c\ub85c \uc0ad\uc81c\ud588\uc2b5\ub2c8\ub2e4.", 
    "Successfully deleted %(name)s and 1 other item.": "%(name)s \ubc0f \ud56d\ubaa9 1\uac1c\ub97c \uc131\uacf5\uc801\uc73c\ub85c \uc0ad\uc81c\ud588\uc2b5\ub2c8\ub2e4.", 
    "Successfully deleted %(name)s.": "%(name)s\uc744(\ub97c) \uc131\uacf5\uc801\uc73c\ub85c \uc0ad\uc81c\ud588\uc2b5\ub2c8\ub2e4.", 
    "Successfully imported.": "\uac00\uc838\uc624\uae30\uc5d0 \uc131\uacf5\ud588\uc2b5\ub2c8\ub2e4.", 
    "Successfully moved %(name)s": "%(name)s \uc774\ub3d9\uc5d0 \uc131\uacf5\ud588\uc2b5\ub2c8\ub2e4", 
    "Successfully moved %(name)s and %(amount)s other items.": "%(name)s \ubc0f \ud56d\ubaa9 %(amount)s\uac1c\ub97c \uc131\uacf5\uc801\uc73c\ub85c \uc774\ub3d9\ud588\uc2b5\ub2c8\ub2e4.", 
    "Successfully moved %(name)s and 1 other item.": "%(name)s \ubc0f \ud56d\ubaa9 1\uac1c\ub97c \uc131\uacf5\uc801\uc73c\ub85c \uc774\ub3d9\ud588\uc2b5\ub2c8\ub2e4.", 
    "Successfully moved %(name)s.": "%(name)s\uc744(\ub97c) \uc131\uacf5\uc801\uc73c\ub85c \uc774\ub3d9\ud588\uc2b5\ub2c8\ub2e4.", 
    "Successfully sent to {placeholder}": "{placeholder}\uc5d0\uac8c \uc131\uacf5\uc801\uc73c\ub85c \ubcf4\ub0c8\uc2b5\ub2c8\ub2e4", 
    "Successfully set library history.": "\ub77c\uc774\ube0c\ub7ec\ub9ac \uae30\ub85d \uc124\uc815\uc5d0 \uc131\uacf5\ud588\uc2b5\ub2c8\ub2e4.", 
    "Successfully transferred the library.": "\ub77c\uc774\ube0c\ub7ec\ub9ac \uc804\uc1a1\uc5d0 \uc131\uacf5\ud588\uc2b5\ub2c8\ub2e4.", 
    "Successfully unlink %(name)s.": "%(name)s \ub9c1\ud06c \ub04a\uae30\uc5d0 \uc131\uacf5\ud588\uc2b5\ub2c8\ub2e4.", 
    "Successfully unshared {placeholder}": "{placeholder}\uc744(\ub97c) \uc131\uacf5\uc801\uc73c\ub85c \uacf5\uc720 \ud574\uc81c\ud588\uc2b5\ub2c8\ub2e4", 
    "Successfully unstared {placeholder}": "{placeholder}\uc744(\ub97c) \uc131\uacf5\uc801\uc73c\ub85c \ubcc4\ud45c \ud574\uc81c\ud588\uc2b5\ub2c8\ub2e4.", 
    "Transfer Library {library_name} To": "\ub2e4\uc74c \uc704\uce58\ub85c {library_name} \ub77c\uc774\ube0c\ub7ec\ub9ac \uc804\uc1a1", 
    "Uploaded bytes exceed file size": "\uc5c5\ub85c\ub4dc\ud55c \ud30c\uc77c \ud06c\uae30 \uc81c\ud55c\uc744 \ub118\uc5b4\uc130\uc2b5\ub2c8\ub2e4", 
    "You can only select 1 item": "\ud56d\ubaa9 1\uac1c\ub9cc \uc120\ud0dd\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4", 
    "You cannot select any more choices": "\ub354 \uc774\uc0c1 \uc120\ud0dd\ud560 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4", 
    "canceled": "\ucde8\uc18c\ud568", 
    "locked by {placeholder}": "{placeholder}\uc774(\uac00) \uc7a0\uae08", 
    "uploaded": "\uc5c5\ub85c\ub4dc\ud568", 
    "{placeholder} Folder Permission": "{placeholder} \ud3f4\ub354 \uc0ac\uc6a9 \uad8c\ud55c", 
    "{placeholder} History Setting": "{placeholder} \uae30\ub85d \uc124\uc815", 
    "{placeholder} Members": "{placeholder} \uad6c\uc131\uc6d0", 
    "{placeholder} Share Links": "{placeholder} \uacf5\uc720 \ub9c1\ud06c"
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
    "DATETIME_FORMAT": "Y\ub144 n\uc6d4 j\uc77c g:i A", 
    "DATETIME_INPUT_FORMATS": [
      "%Y-%m-%d %H:%M:%S", 
      "%Y-%m-%d %H:%M:%S.%f", 
      "%Y-%m-%d %H:%M", 
      "%Y-%m-%d", 
      "%m/%d/%Y %H:%M:%S", 
      "%m/%d/%Y %H:%M:%S.%f", 
      "%m/%d/%Y %H:%M", 
      "%m/%d/%Y", 
      "%m/%d/%y %H:%M:%S", 
      "%m/%d/%y %H:%M:%S.%f", 
      "%m/%d/%y %H:%M", 
      "%m/%d/%y", 
      "%Y\ub144 %m\uc6d4 %d\uc77c %H\uc2dc %M\ubd84 %S\ucd08", 
      "%Y\ub144 %m\uc6d4 %d\uc77c %H\uc2dc %M\ubd84"
    ], 
    "DATE_FORMAT": "Y\ub144 n\uc6d4 j\uc77c", 
    "DATE_INPUT_FORMATS": [
      "%Y-%m-%d", 
      "%m/%d/%Y", 
      "%m/%d/%y", 
      "%Y\ub144 %m\uc6d4 %d\uc77c"
    ], 
    "DECIMAL_SEPARATOR": ".", 
    "FIRST_DAY_OF_WEEK": "0", 
    "MONTH_DAY_FORMAT": "F\uc6d4 j\uc77c", 
    "NUMBER_GROUPING": "3", 
    "SHORT_DATETIME_FORMAT": "Y-n-j H:i", 
    "SHORT_DATE_FORMAT": "Y-n-j.", 
    "THOUSAND_SEPARATOR": ",", 
    "TIME_FORMAT": "A g:i", 
    "TIME_INPUT_FORMATS": [
      "%H:%M:%S", 
      "%H:%M:%S.%f", 
      "%H:%M", 
      "%H\uc2dc %M\ubd84 %S\ucd08", 
      "%H\uc2dc %M\ubd84"
    ], 
    "YEAR_MONTH_FORMAT": "Y\ub144 F\uc6d4"
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

