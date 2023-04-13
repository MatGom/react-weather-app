import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import ErrorBox from '../ErrorBox/ErrorBox';
import { useCallback, useState } from 'react';

const WeatherBox = props => {
  const [weather, setWeather] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);

  const handleCityChange = useCallback(city => {
    setError(false);
    setPending(true);
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f2c045376a4babd0896cc0e03fa4b5a3&units=metric`
    ).then(res => {
      if (res.status === 200) {
        return res.json().then(data => {
          const weatherData = {
            city: data.name,
            temp: data.main.temp,
            icon: data.weather[0].icon,
            description: data.weather[0].main,
          };
          setWeather(weatherData);
          setPending(false);
        });
      } else {
        setError(true);
      }
    });
  }, []);

  return (
    <section>
      <PickCity action={handleCityChange} />
      {weather && !pending && <WeatherSummary weather={weather} />}
      {!error && pending && <Loader />}
      {error && <ErrorBox />}
    </section>
  );
};

export default WeatherBox;
