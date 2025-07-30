interface RawWeatherData {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_probability_max: number[];
  precipitation_sum: number[];
  weathercode: number[];
}

interface TransformedDailyWeather {
  time: string;
  temperature_2m_max: number;
  temperature_2m_min: number;
  precipitation_probability_max: number;
  precipitation_sum: number;
  weathercode: number;
}

export const transformWeatherData = (data: RawWeatherData): TransformedDailyWeather[] => {
  const numEntries = data.time.length;
  const transformedResult: TransformedDailyWeather[] = [];

  for (let i = 0; i < numEntries; i++) {
    transformedResult.push({
      time: data.time[i],
      temperature_2m_max: data.temperature_2m_max[i],
      temperature_2m_min: data.temperature_2m_min[i],
      precipitation_probability_max: data.precipitation_probability_max[i],
      precipitation_sum: data.precipitation_sum[i],
      weathercode: data.weathercode[i],
    });
  }

  return transformedResult;
}