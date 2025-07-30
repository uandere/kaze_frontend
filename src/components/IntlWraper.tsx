import { IntlProvider } from 'react-intl';
import { useRouter } from 'next/router';

import en from '@/components/locales/en.json';
import ua from '@/components/locales/ua.json';

const messagesMap: Record<string, any> = {
  en,
  ua,
};

export const IntlWrapper = ({ children }: { children: React.ReactNode }) => {
  const { locale = 'en' } = useRouter();
  const messages = messagesMap[locale] || messagesMap.ua;

  return (
    <IntlProvider locale={locale} messages={messages}>
      {children}
    </IntlProvider>
  );
};
