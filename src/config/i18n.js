import i18n from 'i18next';
import { reactI18nextModule } from 'react-i18next';
import en from '../langs/en';
import fr from '../langs/fr';

i18n
  .use(reactI18nextModule)
  .init({
    resources: {
      en,
      fr,
    },
    fallbackLng: 'en',
    // debug only when not in production
    debug: process.env.NODE_ENV !== 'production',
    ns: ['translations'],
    defaultNS: 'translations',
    keySeparator: false,
    interpolation: {
      escapeValue: false,
      formatSeparator: ',',
    },
    react: {
      wait: true,
    },
  });

export default i18n;
