
export async function fetchData(url: string, options?: object) {
  try {
    const response = await fetch(url, {...options});
    const data = await response.json();
    return {
      status: response.status,
      data
    }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error fetching data:', error);
    return {
      status: error.status,
      data: null
    }
  }
}