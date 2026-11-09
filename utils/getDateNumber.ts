import i18next from 'i18next';

const getDateNumber = (dt: number) => {
  const date = new Date(dt * 1000);
  const locale = i18next.language?.startsWith('en') ? 'en-US' : 'es-ES';

  return date.toLocaleDateString(locale, {
    day: '2-digit',
    month: '2-digit',
  });
};

export default getDateNumber;
