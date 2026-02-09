interface weather {
  current: {
    dt: number;
    name: string;
    main: {
      temp: number;
      temp_min: number;
      temp_max: number;
    };
    weather: {
      0: {
        description: string;
        icon: string;
      };
    };
  };
}
interface WeatherInterface {
  weather: weather;
}

export default WeatherInterface;
