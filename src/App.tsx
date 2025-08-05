import styles from "./App.module.scss";
import { Search } from "./components/Search";
import { CardContainer } from "./components/CardContainer";
import classNames from "classnames";
import { useWeatherStore } from "./store/useWeatherStore";

function App() {
const { cardData, isSearching, status } = useWeatherStore();

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>7 - Day Weather</h1>

      <Search />

      <h2>Forecast</h2>

      <div
        className={classNames(styles.infoContainer, {
          [styles.loadedForecast]: isSearching || cardData,
        })}
      >
        {!cardData && !isSearching && (
          <p className={styles.statusText}>{status}</p>
        )}

        {isSearching && <img src="/forecast-project/wheater.gif" />}

        {!isSearching && cardData && <CardContainer cardData={cardData} />}
      </div>
    </div>
  );
}

export default App;
