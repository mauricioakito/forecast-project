import { fetchData } from "../utils/fetchData"
import { _Maybe } from 'funcio';

export const GeoService = async (address: string) => {
  const response = await fetchData(`https://nominatim.openstreetmap.org/search?q=${address}&format=json&limit=1`);

  console.log(response)

  const geolocation = _Maybe.of(response)
  .map(response => response.data)
  .map(data => data && data.length > 0 && data[0])
  .getOrElse([])

  return {
    status: response.status,
    hasData: !(response.data && response.data.length === 0),
    latitude: geolocation.length > 0 && geolocation.lat,
    longitute: geolocation.length > 0 && geolocation.lon,
  }
}