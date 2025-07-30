export const convertDateToString = (dateString: string) => {
  const todayDate = new Date(dateString + "T00:00:00")

  if (isNaN(todayDate.getTime())) {
    return null
  }

  return todayDate.toLocaleDateString('en-US', { weekday: 'long' });
}