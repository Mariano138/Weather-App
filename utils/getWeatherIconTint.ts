// OpenWeather ships a handful of glyphs as a flat dark grey (#48484A), which
// nearly disappears over the dark translucent cards. The moon only exists as a
// night variant, but the snowflake and mist images are identical for day and
// night (13d === 13n, 50d === 50n), so they are whitelisted by exact code
// instead of by the n suffix. Tinting them white keeps the shape (tintColor
// acts as an alpha mask on iOS, Android and web) and lifts the contrast from
// ~1.6:1 to ~5.8:1. The mixed icons are already light and stay untouched.
const DARK_GLYPHS = new Set(['01n', '13d', '13n', '50d', '50n']);

const getWeatherIconTint = (icon: string) => (DARK_GLYPHS.has(icon) ? '#ffffff' : undefined);

export default getWeatherIconTint;
