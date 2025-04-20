export const fetchPLCData = async (tag, from, to) => {
  try {
    const response = await fetch(`http://localhost:3001/data?tag=${tag}&from=${from}&to=${to}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch PLC data", error);
    return { data: [] };
  }
};
