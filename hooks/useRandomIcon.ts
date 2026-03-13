import { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';

type IconName = React.ComponentProps<typeof Feather>['name'];

export default function useRandomIcons() {
  const icons: IconName[] = ['sun', 'moon', 'cloud', 'cloud-rain', 'cloud-snow', 'cloud-lightning'];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(Math.floor(Math.random() * icons.length));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return icons[index];
}
