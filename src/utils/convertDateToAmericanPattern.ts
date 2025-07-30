export const convertDateToAmericanPattern = (dateString: string) => {

  const [year, month, day] = dateString.split("-");
  const formattedDate = `${month}-${day}-${year}`;

  return formattedDate
}
