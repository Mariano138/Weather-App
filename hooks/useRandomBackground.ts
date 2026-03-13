import { useEffect, useState } from 'react';

export default function useRandomBackground() {
  const backgrounds = [
    require('../assets/sun.png'),
    require('../assets/rain.png'),
    require('../assets/clouds.png'),
    require('../assets/snow.png'),
    require('../assets/storm.png'),
    require('../assets/mist.png'),
    require('../assets/night.png'),
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(Math.floor(Math.random() * backgrounds.length));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return backgrounds[index];
}
