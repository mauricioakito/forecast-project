export const MESSAGES: {geolocation: {400: string, 500: string}, wheather: {400: string, 500: string}} = {
  geolocation: {
    400: "We couldn't locate a valid address based on your input. Please double-check the details you've provided and try searching again.",
    500: "We're experiencing technical difficulties with our weather data API at the moment. Please bear with us and try again a little later."
  },
  wheather: {
    400: "Unfortunately, we were unable to find any weather forecast data for your requested address right now. This might be a temporary issue, so kindly try your search again after a short while.",
    500: "We're experiencing technical difficulties with our weather data API at the moment. Please bear with us and try again a little later."
  }
}