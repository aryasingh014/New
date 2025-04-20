import axios from "axios";

export const fetchPLCData = async (tag, from, to) => {
  const response = await axios.get(`http://localhost:3001/history`, {
    params: { tag, from, to }
  });
  return response.data;
};
