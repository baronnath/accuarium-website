import i18n from 'i18n-js';
import en from './translations/en';
import es from './translations/es';


i18n.translations = {
    en: en,
    es: es,
  };

i18n.fallbacks = true;

export default (locale = null) => {
    if(!locale){
      locale = navigator.language || navigator.userLanguage

      // Remove country code (after the hyphen)
      const splitted = locale.split('-');
      locale = splitted[0];
    }

    i18n.locale = locale;
    return i18n;
}
