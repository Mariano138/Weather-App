export interface ForecastItem {
  dt: number;
  dt_txt: string;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  weather: {
    description: string;
    icon: string;
    main: string;
  }[];
}

export interface CurrentWeather {
  dt: number;
  name: string;
  sys: {
    sunrise: number;
    sunset: number;
  };
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    feels_like: number;
    humidity: number;
  };
  weather: {
    description: string;
    icon: string;
    main: string;
  }[];
}

export interface WeatherInterface {
  current: CurrentWeather;
  forecast: ForecastItem[];
}

export default WeatherInterface;
