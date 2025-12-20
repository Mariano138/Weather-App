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

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      city
    )}&appid=${process.env.WEATHER_KEY}&units=metric&lang=es`
  );

  const data = await response.json();

  cache.set(key, { data, time: Date.now() });
  res.status(200).json(data);
}
