import WeatherInterface from 'interface/weatherInterface';

const getBackground = (weather: WeatherInterface | null) => {
  if (weather == null) return require('../assets/sun.png');
  const main = weather.current.weather[0].main;
  const current = weather.current.dt;
  const sunrise = weather.current.sys.sunrise;
  const sunset = weather.current.sys.sunset;

  const isNight = current < sunrise || current > sunset;

  if (isNight && main === 'Clear') return require('../assets/night.png');

  switch (main) {
    case 'Clear':
      return require('../assets/sun.png');
    case 'Rain':
    case 'Drizzle':
      return require('../assets/rain.png');
    case 'Clouds':
      return require('../assets/clouds.png');
    case 'Snow':
      return require('../assets/snow.png');
    case 'Thunderstorm':
      return require('../assets/storm.png');
    case 'Mist':
      return require('../assets/mist.png');
    default:
      return require('../assets/sun.png');
  }
};

export default getBackground;
