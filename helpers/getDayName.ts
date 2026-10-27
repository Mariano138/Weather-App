import i18next from 'i18next';

const getDayName = (dt: number) => {
  const date = new Date(dt * 1000);
  const language = i18next.language === 'en' ? 'en-US' : 'es-EN';
  const day = date.toLocaleDateString(language, { weekday: 'short' });
  const capitalize = (str: string) => str.toUpperCase();

  return capitalize(day);
};

export default getDayName;
