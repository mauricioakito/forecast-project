import {
  useCallback,
  useState,
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
} from "react";
import styles from "./Search.module.scss";
import { GeoService } from "../../services/geoservice";
import type { ICardDataProps } from "../../types/Card";
import { ForecastService } from "../../services/forecastservice";
import classNames from "classnames";
import { SEARCH_FORM } from "../../constraints/SearchForm";

interface ISearchProps {
  setStatus: Dispatch<SetStateAction<string>>;
  setCardData: Dispatch<SetStateAction<ICardDataProps[] | undefined>>;
  setIsSearching: Dispatch<SetStateAction<boolean>>;
  isSearching: boolean;
}

export const Search = ({
  setStatus,
  setCardData,
  isSearching,
  setIsSearching,
}: ISearchProps) => {
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

    if (!geoServiceResponse.hasData) {
      // This Timeout function is here to show the loading status while the request is finished. It is only for example purposes.
      setTimeout(() => {
        setIsSearching(false);
        setStatus("We couldn't locate a valid address based on your input. Please double-check the details you've provided and try searching again.");
      }, 3000);
      return;
    }

    const { latitude, longitute } = geoServiceResponse;

    const forecastServiceResponse = await ForecastService(latitude, longitute);

    if (forecastServiceResponse.status === 400) {
      setIsSearching(false);
      setStatus("Unfortunately, we were unable to find any weather forecast data for your requested address right now. This might be a temporary issue, so kindly try your search again after a short while.");
      return;
    }

    if (forecastServiceResponse.status === 500) {
      setIsSearching(false);
      setStatus("We're experiencing technical difficulties with our weather data API at the moment. Please bear with us and try again a little later.");
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
            <div className={styles.inputInnerContainer}>
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
