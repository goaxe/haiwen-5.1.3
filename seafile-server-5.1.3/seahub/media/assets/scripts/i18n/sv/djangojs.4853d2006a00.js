

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
    "%curr% of %total%": "%curr% av %total%", 
    "<a href=\"%url%\" target=\"_blank\">The image</a> could not be loaded.": "<a href=\"%url%\" target=\"_blank\">Bilden</a> kunde inte laddas.", 
    "Are you sure you want to delete these selected items?": "\u00c4r du s\u00e4ker att du vill ta bort valda objekt?", 
    "Cancel": "Avbryt", 
    "Canceled.": "Avbruten.", 
    "Close (Esc)": "St\u00e4ng (Esc)", 
    "Copy selected item(s) to:": "Kopiera valda objekt till:", 
    "Copy {placeholder} to:": "Kopiera {placeholder} till:", 
    "Copying %(name)s": "Kopierar %(name)s", 
    "Copying file %(index)s of %(total)s": "Kopierar fil %(index)s av %(total)s", 
    "Delete": "Ta bort", 
    "Delete Items": "Borttagna Objekt", 
    "Delete failed": "Borttagning misslyckades", 
    "Delete succeeded.": "Borttagen", 
    "Deleted directories": "Borttagna kataloger", 
    "Deleted files": "Borttagna filer", 
    "Edit failed": "\u00c4ndring misslyckades", 
    "Empty file upload result": "Uppladdning resulterade i en tom fil", 
    "Error": "Fel", 
    "Expired": "Utg\u00e5ngen", 
    "Failed to copy %(name)s": "Misslyckades att kopiera %(name)s", 
    "Failed to delete %(name)s and %(amount)s other items.": "Misslyckades att ta bort %(name)s och %(amount)s andra objekt.", 
    "Failed to delete %(name)s and 1 other item.": "Misslyckades att ta bort %(name)s och 1 annat objekt.", 
    "Failed to delete %(name)s.": "Misslyckades att ta bort %(name)s.", 
    "Failed to get update url": "Misslyckades att h\u00e4mta uppdateringsurl", 
    "Failed to get upload url": "Misslyckades att h\u00e4mta uppladdningsurl", 
    "Failed to move %(name)s": "Misslyckades att flytta %(name)s", 
    "Failed to send to {placeholder}": "Misslyckades att skicka till {placeholder}", 
    "Failed.": "Misslyckades", 
    "Failed. Please check the network.": "Misslyckades. Kontrollera n\u00e4tverket.", 
    "File Upload canceled": "Filuppladdning avbruten", 
    "File Upload complete": "Filuppladdning klar", 
    "File Upload failed": "Filuppladdning misslyckad", 
    "File Uploading...": "Filen laddas upp...", 
    "File is locked": "Filen \u00e4r l\u00e5st", 
    "File is too big": "Filen \u00e4r f\u00f6r stor", 
    "File is too small": "Filen \u00e4r f\u00f6r liten", 
    "Filetype not allowed": "Filtypen st\u00f6ds ej", 
    "Hide": "D\u00f6lj", 
    "Internal error. Failed to copy %(name)s and %(amount)s other item(s).": "Internt fel. Misslyckades att kopiera %(name)s och %(amount)s andra objekt", 
    "Internal error. Failed to copy %(name)s.": "Internt fel. Misslyckades att kopiera %(name)s.", 
    "Internal error. Failed to move %(name)s and %(amount)s other item(s).": "Internt fel. Misslyckades att flytta %(name)s och %(amount)s andra objekt.", 
    "Internal error. Failed to move %(name)s.": "Internt fel. Misslyckades att flytta %(name)s.", 
    "Invalid destination path": "Felaktig destinationss\u00f6kv\u00e4g", 
    "It is required.": "Det kr\u00e4vs.", 
    "Just now": "Precis nyss", 
    "Loading failed": "Laddning misslyckades", 
    "Loading...": "Laddar...", 
    "Max number of files exceeded": "Maxantal filer \u00f6verskridet", 
    "Modified files": "\u00c4ndrade filer", 
    "Move selected item(s) to:": "Flytta valda objekt till:", 
    "Move {placeholder} to:": "Flytta {placeholder} till:", 
    "Moving %(name)s": "Flyttar %(name)s", 
    "Moving file %(index)s of %(total)s": "Flyttar fil %(index)s av %(total)s", 
    "Name is required": "Namn kr\u00e4vs", 
    "New directories": "Nya kataloger", 
    "New files": "Nya filer", 
    "Next (Right arrow key)": "N\u00e4sta (H\u00f6ger piltangent)", 
    "No matches": "Inga matchningar", 
    "Only an extension there, please input a name.": "Bara en \u00e4ndelse, v\u00e4nligen ange ett namn", 
    "Open in New Tab": "\u00d6ppna i ny flik", 
    "Password is required.": "L\u00f6senord kr\u00e4vs.", 
    "Password is too short": "L\u00f6senordet \u00e4r f\u00f6r kort", 
    "Passwords don't match": "L\u00f6senorden \u00f6verensst\u00e4mmer inte", 
    "Permission error": "Beh\u00f6righetsfel", 
    "Please check the network.": "Kontrollera n\u00e4tverksanslutningen", 
    "Please enter 1 or more character": "V\u00e4nligen ange 1 eller fler tecken", 
    "Please enter days.": "V\u00e4nligen ange dagar.", 
    "Please enter password": "V\u00e4nligen ange l\u00f6senordet", 
    "Please enter the password again": "V\u00e4nligen ange l\u00f6senordet igen", 
    "Please enter valid days": "V\u00e4nligen ange giltiga dagar", 
    "Please input at least an email.": "V\u00e4nligen ange minst en e-postadress.", 
    "Previous (Left arrow key)": "F\u00f6reg\u00e5ende (V\u00e4nster piltangent)", 
    "Processing...": "Arbetar...", 
    "Really want to delete {lib_name}?": "\u00c4r du s\u00e4ker att du \u00f6nskar radera %(lib_name)?", 
    "Rename File": "D\u00f6p om fil", 
    "Rename Folder": "D\u00f6p om mapp", 
    "Renamed or Moved files": "Omd\u00f6pta eller flyttade filer", 
    "Replace file {filename}?": "Ers\u00e4tt filen {filename}?", 
    "Saving...": "Sparar...", 
    "Searching...": "S\u00f6ker...", 
    "Select groups": "V\u00e4lj grupper", 
    "Set {placeholder}'s permission": "S\u00e4tt {placeholder}s r\u00e4ttigheter", 
    "Share {placeholder}": "Dela {placeholder}", 
    "Show": "Visa", 
    "Start": "Starta", 
    "Success": "Lyckades", 
    "Successfully copied %(name)s": "Lyckades kopiera %(name)s", 
    "Successfully copied %(name)s and %(amount)s other items.": "Lyckades kopiera %(name)s och %(amount)s andra filer.", 
    "Successfully copied %(name)s and 1 other item.": "Lyckades kopiera %(name)s och 1 annan fil.", 
    "Successfully copied %(name)s.": "Lyckades kopiera %(name)s.", 
    "Successfully deleted %(name)s": "Lyckades ta bort %(name)s", 
    "Successfully deleted %(name)s and %(amount)s other items.": "Lyckades ta bort %(name)s och %(amount)s andra filer.", 
    "Successfully deleted %(name)s and 1 other item.": "Lyckades ta bort %(name)s och 1 annat objekt.", 
    "Successfully deleted %(name)s.": "Lyckades ta bort %(name)s.", 
    "Successfully moved %(name)s": "Lyckades flytta %(name)s", 
    "Successfully moved %(name)s and %(amount)s other items.": "Lyckades flytta %(name)s och %(amount)s andra filer.", 
    "Successfully moved %(name)s and 1 other item.": "Lyckades flytta %(name)s och 1 annan fil.", 
    "Successfully moved %(name)s.": "Lyckades flytta %(name)s.", 
    "Successfully sent to {placeholder}": "Lyckades skicka till {placeholder}", 
    "Successfully unshared {placeholder}": "Slutade dela {placeholder}", 
    "Successfully unstared {placeholder}": "Tog bort {placeholder} fr\u00e5n favoriter", 
    "Uploaded bytes exceed file size": "Uppladdade bytes \u00f6verskrider filstorleken", 
    "canceled": "avbruten", 
    "locked by {placeholder}": "l\u00e5st av {placeholder}", 
    "uploaded": "uppladdad"
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
    "DATETIME_FORMAT": "j F Y H:i", 
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
      "%m/%d/%y"
    ], 
    "DATE_FORMAT": "j F Y", 
    "DATE_INPUT_FORMATS": [
      "%Y-%m-%d", 
      "%m/%d/%Y", 
      "%m/%d/%y"
    ], 
    "DECIMAL_SEPARATOR": ",", 
    "FIRST_DAY_OF_WEEK": "1", 
    "MONTH_DAY_FORMAT": "j F", 
    "NUMBER_GROUPING": "3", 
    "SHORT_DATETIME_FORMAT": "Y-m-d H:i", 
    "SHORT_DATE_FORMAT": "Y-m-d", 
    "THOUSAND_SEPARATOR": "\u00a0", 
    "TIME_FORMAT": "H:i", 
    "TIME_INPUT_FORMATS": [
      "%H:%M:%S", 
      "%H:%M:%S.%f", 
      "%H:%M"
    ], 
    "YEAR_MONTH_FORMAT": "F Y"
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

