import { _Maybe } from "funcio";
import { fetchData } from "../utils/fetchData"
import { transformWeatherData } from "../utils/transformRawWeatherData";

export const ForecastService = async (latitude: string, longitude: string) => {
  const response = await fetchData(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}
&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum,weathercode
&timezone=auto&forecast_days=8`);

    const daily = _Maybe.of(response)
    .map(response => response.data)
    .map(data => data.daily)
    .getOrElse([])

  return {
    status: response.status,
    data: transformWeatherData(daily) || []
  }
}

