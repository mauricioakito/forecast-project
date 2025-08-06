import { useState } from "react";
import styles from "./Search.module.scss";
import { GeoService } from "../../services/geoservice";
import { ForecastService } from "../../services/forecastservice";
import classNames from "classnames";
import { MESSAGES } from "../../constraints/SearchForm";
import { useWeatherStore } from "../../store/useWeatherStore";
import { FaCity } from "react-icons/fa6";

export const Search = () => {
  const { setCardData, setIsSearching, setStatus, isSearching } =
    useWeatherStore();

  const [city, setCity] = useState("");

  const searchForecast = async () => {
    setIsSearching(true);
    setCardData(undefined);
    const geoServiceResponse = await GeoService(city);

    if (
      !geoServiceResponse.hasData ||
      (geoServiceResponse.status >= 400 && geoServiceResponse.status < 500)
    ) {
      // This Timeout function is here to show the loading status while the request is finished. It is only for example purposes.
      setTimeout(() => {
        setIsSearching(false);
        setStatus(MESSAGES.geolocation[400]);
      }, 3000);
      return;
    }

    if (geoServiceResponse.status >= 500 && geoServiceResponse.status < 600) {
      setIsSearching(false);
      setStatus(MESSAGES.geolocation[500]);
      return;
    }

    const { latitude, longitute } = geoServiceResponse;

    const forecastServiceResponse = await ForecastService(latitude, longitute);

    if (
      forecastServiceResponse.status >= 400 &&
      forecastServiceResponse.status < 500
    ) {
      setIsSearching(false);
      setStatus(MESSAGES.wheather[400]);
      return;
    }

    if (
      forecastServiceResponse.status >= 500 &&
      forecastServiceResponse.status < 600
    ) {
      setIsSearching(false);
      setStatus(MESSAGES.wheather[500]);
      return;
    }

    if (forecastServiceResponse) {
      setStatus("");
      setCardData([...forecastServiceResponse.data]);
      setIsSearching(false);
    }
  };

  return (
    <form className={styles.search}>
      <div className={styles.inputContainer}>
        <div className={styles.inputInnerContainer}>
          <FaCity className={styles.inputIcon} />
          <input
            className={styles.input}
            type="text"
            placeholder="City"
            onChange={(event) => setCity(event.target.value)}
          />
        </div>
      </div>
      <button
        className={classNames(styles.button, {
          [styles.disabledButton]: isSearching || !city,
        })}
        onClick={searchForecast}
        disabled={isSearching}
      >
        Search
      </button>
    </form>
  );
};
