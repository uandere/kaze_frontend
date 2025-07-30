
import { useIntl } from "react-intl";

export const useTranslations = () => {
  const intl = useIntl();

  return (id: string, values?: Record<string, any>) =>
    intl.formatMessage({ id }, values);
};
