import {
  useCallback,
  useState,
  type ChangeEvent,
} from "react";
import styles from "./Search.module.scss";
import { GeoService } from "../../services/geoservice";
import { ForecastService } from "../../services/forecastservice";
import classNames from "classnames";
import { MESSAGES, SEARCH_FORM } from "../../constraints/SearchForm";
import { useWeatherStore } from "../../store/useWeatherStore";

export const Search = () => {

  const {
    setCardData,
    setIsSearching,
    setStatus,
    isSearching,
  } = useWeatherStore();

  const [inputText, setInputText] = useState({
    street: "",
    number: "",
    postalCode: "",
    city: "",
  });

  const searchForecast = async () => {
    setIsSearching(true);
    setCardData(undefined);
    const { street, number, postalCode, city } = inputText;
    const geoServiceResponse = await GeoService(
      `${number},${street},${city},${postalCode}`
    );

    if ((!geoServiceResponse.hasData) || (geoServiceResponse.status >= 400 && geoServiceResponse.status < 500)) {
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

    if (forecastServiceResponse.status >= 400 && forecastServiceResponse.status < 500) {
      setIsSearching(false);
      setStatus(MESSAGES.wheather[400]);
      return;
    }

    if (forecastServiceResponse.status >= 500 && forecastServiceResponse.status < 600) {
      setIsSearching(false);
      setStatus(MESSAGES.wheather[500]);
      return;
    }

    if (forecastServiceResponse) {
      setStatus('');
      setCardData([...forecastServiceResponse.data]);
      setIsSearching(false);
    }
  };

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>, fieldName: string) => {
    setInputText((prevState) => ({
      ...prevState,
      [fieldName]: event.target.value,
    }));
  }, []);

  return (
    <form className={styles.search}>
      <div className={styles.inputContainer}>
        {SEARCH_FORM.map(({ Icon, placeholder, name }) => {
          return (
            <div className={styles.inputInnerContainer} key={name}>
              <Icon className={styles.inputIcon} />
              <input
                className={styles.input}
                type="text"
                placeholder={placeholder}
                onChange={(event) => handleChange(event, name)}
              />
            </div>
          );
        })}

      </div>
      <button
        className={classNames(styles.button, {
          [styles.disabledButton]: isSearching,
        })}
        onClick={searchForecast}
        disabled={isSearching}
      >
        Search
      </button>
    </form>
  );
};
