import WeatherInterface from '@/interface/weatherInterface';

const getBackground = (weather?: WeatherInterface | null) => {
  if (weather == null) return require('../assets/images/sun.png');
  const main = weather.current.weather[0].main;
  const current = weather.current.dt;
  const sunrise = weather.current.sys.sunrise;
  const sunset = weather.current.sys.sunset;

  const isNight = current < sunrise || current > sunset;

  if (isNight && main === 'Clear') return require('../assets/images/night.png');

  switch (main) {
    case 'Clear':
      return require('../assets/images/sun.png');
    case 'Rain':
    case 'Drizzle':
      return require('../assets/images/rain.png');
    case 'Clouds':
      return require('../assets/images/clouds.png');
    case 'Snow':
      return require('../assets/images/snow.png');
    case 'Thunderstorm':
      return require('../assets/images/storm.png');
    case 'Mist':
      return require('../assets/images/mist.png');
    default:
      return require('../assets/images/sun.png');
  }
};

export default getBackground;
