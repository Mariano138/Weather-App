const cache = new Map();
const TTL = 10 * 60 * 1000;

export default async function handler(req, res) {
  const search = req.query.query;
  if (!search) {
    return res.status(400).json({ error: 'City is required' });
  }

  const key = search.toLowerCase();

  if (cache.has(key)) {
    const { data, time } = cache.get(key);
    if (Date.now() - time < TTL) {
      return res.status(200).json(data);
    }
  }

  try {
    const currentRes = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
        search
      )}&limit=${5}&appid=${process.env.WEATHER_KEY}`
    );

    const current = await currentRes.json();

    const responseData = current;

    cache.set(key, { data: responseData, time: Date.now() });

    return res.status(200).json(responseData);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'City not found!' });
  }
}
