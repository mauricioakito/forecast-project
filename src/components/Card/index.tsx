import styles from './Card.module.scss'
import { weatherCodeToText } from '../../utils/weatherCode'
import type { ICardDataProps } from '../../types/Card'
import { convertDateToString } from '../../utils/convertDateToString'
import { convertDateToAmericanPattern } from '../../utils/convertDateToAmericanPattern'

interface ICardProps {
  item: ICardDataProps
  cardKey: number
}

export const Card = ({item, cardKey}: ICardProps) => {
  return (
    <div className={styles.card} key={cardKey}>
      <div className={styles.titleContainer}>
        <p className={styles.day}>{cardKey === 0 ? 'Today' : convertDateToString(item.time)}</p>
        <p className={styles.date}>{convertDateToAmericanPattern(item.time)}</p>
      </div>
      <p className={styles.statusText}>{weatherCodeToText(item.weathercode)}</p>
      <div className={styles.statusContainer}>
        <div className={styles.statusItem}>
          <span className={styles.statusText}>Max: {Math.round(item.temperature_2m_max)}°C</span>
          <img className={styles.statusIcon} src="/temp.svg" alt="Temperature" />
          <span className={styles.statusText}>Min: {Math.round(item.temperature_2m_min)}°C</span>
        </div>
        <div className={styles.statusItem}>
          <span className={styles.statusText}>Probability: {item.precipitation_probability_max}%</span>
          <img className={styles.statusIcon} src="/rain.svg" alt="Precipitation" />
          <span className={styles.statusText}>Quantity: {item.precipitation_sum}mm</span>
        </div>
      </div>
    </div>
  )
}
