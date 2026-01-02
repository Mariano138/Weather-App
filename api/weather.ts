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

    const forecastRes = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
        city
      )}&appid=${process.env.WEATHER_KEY}&units=metric&lang=es`
    );

    const current = await currentRes.json();
    const forecastRaw = await forecastRes.json();

    const forecastDaily = forecastRaw.list.filter((item) => item.dt_txt.includes('12:00:00'));

    const responseData = {
      current,
      forecast: forecastDaily,
    };

    cache.set(key, { data: responseData, time: Date.now() });

    return res.status(200).json(responseData);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Weather service failed' });
  }
}
