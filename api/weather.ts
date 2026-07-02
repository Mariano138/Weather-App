const cache = new Map();
const TTL = 10 * 60 * 1000;

export default async function handler(req, res) {
  const city = req.query.city;

  if (!city) {
    return res.status(400).json({ error: 'City is required' });
  }

  const key = city.toLowerCase();

  if (cache.has(key)) {
    const { data, time } = cache.get(key);
    if (Date.now() - time < TTL) {
      return res.status(200).json(data);
    }
  }

  try {
    const currentRes = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        city
      )}&appid=${process.env.WEATHER_KEY}&units=metric&lang=es`
    );

    const current = await currentRes.json();

    if (!currentRes.ok) {
      return res.status(currentRes.status).json(current);
    }

    const forecastRes = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
        city
      )}&appid=${process.env.WEATHER_KEY}&units=metric&lang=es`
    );

    const forecastRaw = await forecastRes.json();

    if (!forecastRes.ok) {
      return res.status(forecastRes.status).json(forecastRaw);
    }

    const days: Record<
      string,
      {
        representative: any;
        min: number;
        max: number;
      }
    > = {};

    for (const item of forecastRaw.list) {
      const date = item.dt_txt.split(' ')[0];

      if (!days[date]) {
        days[date] = {
          representative: item,
          min: item.main.temp_min,
          max: item.main.temp_max,
        };
      } else {
        days[date].min = Math.min(days[date].min, item.main.temp_min);
        days[date].max = Math.max(days[date].max, item.main.temp_max);

        if (item.dt_txt.includes('12:00:00')) {
          days[date].representative = item;
        }
      }
    }

    const forecastDaily = Object.values(days).map((day) => {
      day.representative.main.temp_min = day.min;
      day.representative.main.temp_max = day.max;

      return day.representative;
    });

    const responseData = {
      current,
      forecast: forecastDaily,
    };

    cache.set(key, {
      data: responseData,
      time: Date.now(),
    });

    return res.status(200).json(responseData);
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      error: 'Weather service failed',
    });
  }
}
