import axios from "axios";

const API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY;
axios.defaults.baseURL = "https://api.unsplash.com/";
axios.defaults.headers.common["Authorization"] = `Client-ID ${API_KEY}`;
axios.defaults.params = {
  orientation: "landscape",
  per_page: 12,
};

export const getImages = async (query, page) => {
  const { data } = await axios.get(`search/photos?query=${query}&page=${page}`);
  return data;
};
