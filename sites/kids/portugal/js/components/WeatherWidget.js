// portugal-kids/js/components/WeatherWidget.js

const WeatherWidget = ({ city, lat, lon }) => {
  const [weather, setWeather] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const controller = new AbortController();
    const params = new URLSearchParams({
      latitude: lat,
      longitude: lon,
      current: 'temperature_2m,weather_code',
      daily: 'temperature_2m_max,temperature_2m_min',
      timezone: 'Europe/Lisbon'
    });

    fetch(`https://api.open-meteo.com/v1/forecast?${params}`, { signal: controller.signal })
      .then(res => {
        if (!res.ok) throw new Error(`Weather request failed (${res.status})`);
        return res.json();
      })
      .then(data => {
        if (!data.current || !data.daily) throw new Error('Weather response was incomplete');
        setWeather({
          temp: Math.round(data.current.temperature_2m),
          max: Math.round(data.daily.temperature_2m_max[0]),
          min: Math.round(data.daily.temperature_2m_min[0]),
          code: data.current.weather_code
        });
        setLoading(false);
      })
      .catch(err => {
        if (err.name === 'AbortError') return;
        console.error("Failed to fetch weather", err);
        setLoading(false);
      });

    return () => controller.abort();
  }, [lat, lon]);

  if (loading) return React.createElement('div', { className: "text-center font-nunito p-4 text-gray-500 font-bold mb-8" }, "Fetching real weather... 🌤️");
  if (!weather) return React.createElement('div', { className: "text-center font-nunito p-4 text-gray-500 font-bold mb-8" }, "Weather is taking a break. Please try again later! 🌦️");

  let weatherEmoji = "☀️";
  let weatherDesc = "Clear & Sunny";
  if (weather.code >= 1 && weather.code <= 3) { weatherEmoji = "⛅"; weatherDesc = "Partly Cloudy"; }
  if (weather.code >= 45 && weather.code <= 48) { weatherEmoji = "🌫️"; weatherDesc = "Foggy"; }
  if (weather.code >= 51 && weather.code <= 67) { weatherEmoji = "🌧️"; weatherDesc = "Rainy"; }
  if (weather.code >= 71 && weather.code <= 77) { weatherEmoji = "❄️"; weatherDesc = "Snowy"; }
  if (weather.code >= 95) { weatherEmoji = "⛈️"; weatherDesc = "Stormy"; }

  let wearEmoji = "🩳🕶️";
  let wearDesc = "Shorts & shades!";
  if (weather.code >= 51 && weather.code <= 67) { wearEmoji = "🧥☔"; wearDesc = "Raincoat & umbrella!"; }
  else if (weather.temp < 15) { wearEmoji = "🧥👖"; wearDesc = "Warm jacket & pants!"; }
  else if (weather.temp < 22) { wearEmoji = "👖👕"; wearDesc = "T-shirt & jeans!"; }

  return (
    React.createElement('div', { className: "grid grid-cols-2 gap-4 mb-8" },
      React.createElement('div', { className: "bg-white p-4 rounded-2xl shadow-md text-center border-b-4 border-sky-200 cursor-pointer hover:scale-105 transition-transform", onClick: () => speakText(`The weather in ${city} is ${weather.temp} degrees, ${weatherDesc}. High of ${weather.max} and low of ${weather.min}.`) },
        React.createElement('h3', { className: "font-fredoka text-sky-600" }, weatherEmoji, " ", city),
        React.createElement('div', { className: "text-3xl font-fredoka text-orange-500 my-2" }, weather.temp, "°C"),
        React.createElement('p', { className: "font-nunito font-bold text-sm text-gray-500" }, weatherDesc),
        React.createElement('p', { className: "font-nunito text-xs text-gray-400 mt-1" }, "H: ", weather.max, "° L: ", weather.min, "°")
      ),
      React.createElement('div', { className: "bg-white p-4 rounded-2xl shadow-md text-center border-b-4 border-orange-200 cursor-pointer hover:scale-105 transition-transform", onClick: () => speakText(`You should wear ${wearDesc}`) },
        React.createElement('h3', { className: "font-fredoka text-orange-600" }, "👕 Wear"),
        React.createElement('div', { className: "text-3xl my-2" }, wearEmoji),
        React.createElement('p', { className: "font-nunito font-bold text-sm text-gray-500" }, wearDesc)
      )
    )
  );
};
