import { useState } from "react";
import styles from "./App.module.scss";
import { Search } from "./components/Search";
import type { ICardDataProps } from "./types/Card";
import { CardContainer } from "./components/CardContainer";
import classNames from "classnames";

function App() {
  const [cardData, setCardData] = useState<ICardDataProps[]>();
  const [isSearching, setIsSearching] = useState(false);
  const [status, setStatus] = useState("Welcome to your personal 7-Day Weather Forecast! To begin exploring the weather in your area, kindly provide your complete address information in the input fields above, then simply click the 'Search' button to retrieve the forecast.");

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>7 - Day Weather</h1>

      <Search
        setStatus={setStatus}
        setCardData={setCardData}
        isSearching={isSearching}
        setIsSearching={setIsSearching}
      />

      <h2>Forecast</h2>

      <div
        className={classNames(styles.infoContainer, {
          [styles.loadedForecast]: isSearching || cardData,
        })}
      >
        {!cardData && !isSearching && (
          <p className={styles.statusText}>{status}</p>
        )}

        {isSearching && <img src="/wheater.gif" />}

        {!isSearching && cardData && <CardContainer cardData={cardData} />}
      </div>
    </div>
  );
}

export default App;
