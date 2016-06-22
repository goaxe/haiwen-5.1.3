

(function (globals) {

  var django = globals.django || (globals.django = {});

  
  django.pluralidx = function (n) {
    var v=(n != 1);
    if (typeof(v) == 'boolean') {
      return v ? 1 : 0;
    } else {
      return v;
    }
  };
  

  
  /* gettext library */

  django.catalog = {
    "%curr% of %total%": "%curr% / %total%", 
    "<a href=\"%url%\" target=\"_blank\">The image</a> could not be loaded.": "<a href=\"%url%\" target=\"_blank\">A k\u00e9p</a>et nem lehet bet\u00f6lteni.", 
    "Are you sure you want to delete these selected items?": "Biztos, hogy t\u00f6rli ezeket az elemeket?", 
    "Cancel": "M\u00e9gsem", 
    "Canceled.": "Megszak\u00edtva.", 
    "Close (Esc)": "Bez\u00e1r (Esc)", 
    "Copy selected item(s) to:": "Kiv\u00e1lasztott elem(ek) m\u00e1sol\u00e1sa ide:", 
    "Copy {placeholder} to:": "{placeholder} m\u00e1sol\u00e1sa ide:", 
    "Copying %(name)s": "%(name)s m\u00e1sol\u00e1sa", 
    "Copying file %(index)s of %(total)s": "F\u00e1jlok m\u00e1sol\u00e1sa: %(index)s / %(total)s", 
    "Delete": "T\u00f6rl\u00e9s", 
    "Delete Items": "Elemek t\u00f6rl\u00e9se", 
    "Delete failed": "A t\u00f6rl\u00e9s meghi\u00fasult", 
    "Delete succeeded.": "Sikeres t\u00f6rl\u00e9s", 
    "Deleted directories": "T\u00f6r\u00f6lt k\u00f6nyvt\u00e1rak", 
    "Deleted files": "T\u00f6r\u00f6lt f\u00e1jlok", 
    "Edit failed": "Szerkeszt\u00e9s meghi\u00fasult", 
    "Empty file upload result": "\u00dcres f\u00e1jl felt\u00f6lt\u00e9s", 
    "Error": "Hiba", 
    "Expired": "Lej\u00e1rt", 
    "Failed to copy %(name)s": "%(name)s m\u00e1sol\u00e1sa sikertelen", 
    "Failed to delete %(name)s and %(amount)s other items.": "%(name)s \u00e9s m\u00e9g %(amount)s m\u00e1sik elem t\u00f6rl\u00e9se sikertelen.", 
    "Failed to delete %(name)s and 1 other item.": "%(name)s \u00e9s m\u00e9g 1 elem t\u00f6rl\u00e9se sikertelen.", 
    "Failed to delete %(name)s.": "T\u00f6rl\u00e9s meghi\u00fasult: %(name)s.", 
    "Failed to get update url": "A friss\u00edt\u00e9si linket nem lehet el\u00e9rni", 
    "Failed to get upload url": "A felt\u00f6lt\u00e9si linket nem lehet el\u00e9rni", 
    "Failed to move %(name)s": "%(name)s mozgat\u00e1sa sikertelen", 
    "Failed to send to {placeholder}": "Sikertelen k\u00fcld\u00e9s ide: {placeholder}", 
    "Failed.": "Sikertelen.", 
    "Failed. Please check the network.": "Sikertelen. Ellen\u0151rizze a h\u00e1l\u00f3zatot.", 
    "File Upload canceled": "F\u00e1jl felt\u00f6lt\u00e9s megszak\u00edtva", 
    "File Upload complete": "F\u00e1jl felt\u00f6lt\u00e9s k\u00e9sz", 
    "File Upload failed": "F\u00e1jl felt\u00f6lt\u00e9s sikertelen", 
    "File Uploading...": "F\u00e1jl felt\u00f6lt\u00e9s ...", 
    "File is locked": "A f\u00e1jl z\u00e1rolva van", 
    "File is too big": "T\u00fal nagy f\u00e1jl", 
    "File is too small": "T\u00fal kicsi f\u00e1jl", 
    "Filetype not allowed": "Nem enged\u00e9lyezett f\u00e1jlt\u00edpus", 
    "Hide": "Elrejt", 
    "Internal error. Failed to copy %(name)s and %(amount)s other item(s).": "Bels\u0151 hiba. %(name)s m\u00e1sol\u00e1sa \u00e9s m\u00e9g %(amount)s m\u00e1sik elem\u00e9 sikertelen.", 
    "Internal error. Failed to copy %(name)s.": "Bels\u0151 hiba. %(name)s m\u00e1sol\u00e1sa sikertelen.", 
    "Internal error. Failed to move %(name)s and %(amount)s other item(s).": "Bels\u0151 hiba. %(name)s mozgat\u00e1sa \u00e9s m\u00e9g %(amount)s m\u00e1sik elem\u00e9 sikertelen.", 
    "Internal error. Failed to move %(name)s.": "Bels\u0151 hiba. %(name)s mozgat\u00e1sa sikertelen.", 
    "Invalid destination path": "\u00c9rv\u00e9nytelen c\u00e9l \u00fatvonal", 
    "It is required.": "Sz\u00fcks\u00e9ges.", 
    "Just now": "\u00c9ppen most", 
    "Loading failed": "Bet\u00f6lt\u00e9s nem siker\u00fclt", 
    "Loading...": "Bet\u00f6lt\u00e9s...", 
    "Max number of files exceeded": "A maxim\u00e1lis f\u00e1jl sz\u00e1m t\u00fall\u00e9pve", 
    "Modified files": "M\u00f3dos\u00edtott f\u00e1jlok", 
    "Move selected item(s) to:": "Kiv\u00e1lasztott elem(ek) mozgat\u00e1sa ide: ", 
    "Move {placeholder} to:": "{placeholder} mozgat\u00e1sa ide:", 
    "Moving %(name)s": "%(name)s mozgat\u00e1sa", 
    "Moving file %(index)s of %(total)s": "F\u00e1jlok mozgat\u00e1sa: %(index)s / %(total)s", 
    "Name is required": "N\u00e9v sz\u00fcks\u00e9ges", 
    "New directories": "\u00daj k\u00f6nyvt\u00e1rak", 
    "New files": "\u00daj f\u00e1jlok", 
    "Next (Right arrow key)": "K\u00f6vetkez\u0151 (Jobbra ny\u00edl)", 
    "No matches": "Nincs tal\u00e1lat", 
    "Only an extension there, please input a name.": "Csak a kiterjeszt\u00e9s van, k\u00e9rem adja meg a nevet.", 
    "Open in New Tab": "Megnyit\u00e1s \u00faj f\u00fcl\u00f6n", 
    "Password is required.": "Jelsz\u00f3 sz\u00fcks\u00e9ges.", 
    "Password is too short": "A jelsz\u00f3 t\u00fal r\u00f6vid", 
    "Passwords don't match": "Nem egyeznek a megadott jelszavak.", 
    "Permission error": "Jogosults\u00e1g hiba", 
    "Please check the network.": "Ellen\u0151rizze a h\u00e1l\u00f3zatot.", 
    "Please enter 1 or more character": "K\u00e9rem adjon meg m\u00e9g 1 vagy t\u00f6bb karaktert", 
    "Please enter days.": "Adja meg a napok sz\u00e1m\u00e1t.", 
    "Please enter password": "K\u00e9rem adja meg a jelsz\u00f3t", 
    "Please enter the password again": "K\u00e9rem adja meg a jelsz\u00f3t \u00fajra", 
    "Please enter valid days": "K\u00e9rem \u00e9rv\u00e9nyes nap sz\u00e1mot adjon meg", 
    "Please input at least an email.": "Adjon meg legal\u00e1bb egy e-mail c\u00edmet", 
    "Previous (Left arrow key)": "El\u0151z\u0151 (Balra ny\u00edl)", 
    "Processing...": "Feldolgoz\u00e1s...", 
    "Really want to delete {lib_name}?": "Biztosan t\u00f6rli: {lib_name}?", 
    "Renamed or Moved files": "\u00c1tnevezett/\u00e1thelyezett f\u00e1jlok", 
    "Replace file {filename}?": "Fel\u00fcl\u00edrja: {filename}?", 
    "Saving...": "Ment\u00e9s...", 
    "Searching...": "Keres\u00e9s...", 
    "Select groups": "Csoportok kiv\u00e1laszt\u00e1sa", 
    "Set {placeholder}'s permission": "{placeholder} jogosults\u00e1g be\u00e1ll\u00edt\u00e1sa", 
    "Share {placeholder}": "{placeholder} megoszt\u00e1sa", 
    "Show": "Mutat", 
    "Start": "Ind\u00edt", 
    "Success": "Sikeres", 
    "Successfully copied %(name)s and %(amount)s other items.": "%(name)s m\u00e1sol\u00e1sa \u00e9s m\u00e9g %(amount)s m\u00e1sik elem\u00e9 sikeres.", 
    "Successfully copied %(name)s and 1 other item.": "%(name)s m\u00e1sol\u00e1sa \u00e9s m\u00e9g 1 m\u00e1sik elem\u00e9 sikeres.", 
    "Successfully copied %(name)s.": "%(name)s m\u00e1sol\u00e1sa sikeres.", 
    "Successfully deleted %(name)s": "%(name)s t\u00f6rl\u00e9se sikeres", 
    "Successfully deleted %(name)s and %(amount)s other items.": "%(name)s \u00e9s m\u00e9g %(amount)s m\u00e1sik elem t\u00f6r\u00f6lve.", 
    "Successfully deleted %(name)s and 1 other item.": "%(name)s \u00e9s m\u00e9g 1 m\u00e1sik elem t\u00f6r\u00f6lve.", 
    "Successfully deleted %(name)s.": "%(name)s t\u00f6rl\u00e9se sikeres.", 
    "Successfully moved %(name)s and %(amount)s other items.": "%(name)s \u00e1thelyez\u00e9se \u00e9s m\u00e9g %(amount)s m\u00e1sik elem\u00e9 sikeres.", 
    "Successfully moved %(name)s and 1 other item.": "%(name)s \u00e1thelyez\u00e9se \u00e9s m\u00e9g 1 m\u00e1sik elem\u00e9 sikeres.", 
    "Successfully moved %(name)s.": "%(name)s sikeresen \u00e1tmozgatva.", 
    "Successfully sent to {placeholder}": "Sikeresen elk\u00fcldve ide: {placeholder}", 
    "Successfully unshared {placeholder}": "{placeholder} megoszt\u00e1sa sikeresen megsz\u00fcntetve", 
    "Successfully unstared {placeholder}": "{placeholder} sikeresen t\u00f6r\u00f6lve a kedvencekb\u0151l", 
    "Uploaded bytes exceed file size": "A felt\u00f6lt\u00f6tt b\u00e1jtok meghaladj\u00e1k a f\u00e1jl m\u00e9ret\u00e9t", 
    "canceled": "megszak\u00edtva", 
    "locked by {placeholder}": "z\u00e1rolta: {placeholder}", 
    "uploaded": "felt\u00f6ltve"
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
    "DATETIME_FORMAT": "Y. F j. G.i", 
    "DATETIME_INPUT_FORMATS": [
      "%Y.%m.%d. %H.%M.%S", 
      "%Y.%m.%d. %H.%M.%S.%f", 
      "%Y.%m.%d. %H.%M", 
      "%Y.%m.%d.", 
      "%Y-%m-%d %H:%M:%S", 
      "%Y-%m-%d %H:%M:%S.%f", 
      "%Y-%m-%d %H:%M", 
      "%Y-%m-%d"
    ], 
    "DATE_FORMAT": "Y. F j.", 
    "DATE_INPUT_FORMATS": [
      "%Y.%m.%d.", 
      "%Y-%m-%d"
    ], 
    "DECIMAL_SEPARATOR": ",", 
    "FIRST_DAY_OF_WEEK": "1", 
    "MONTH_DAY_FORMAT": "F j.", 
    "NUMBER_GROUPING": "3", 
    "SHORT_DATETIME_FORMAT": "Y.m.d. G.i", 
    "SHORT_DATE_FORMAT": "Y.m.d.", 
    "THOUSAND_SEPARATOR": "\u00a0", 
    "TIME_FORMAT": "G.i", 
    "TIME_INPUT_FORMATS": [
      "%H.%M.%S", 
      "%H.%M", 
      "%H:%M:%S", 
      "%H:%M:%S.%f", 
      "%H:%M"
    ], 
    "YEAR_MONTH_FORMAT": "Y. F"
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

