import axios from "axios";

const baseUrl = import.meta.env.VITE_BASEURL;
const RETRY_DELAY = 1050;

const api = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getData = async <T>(
  url: string,
  retries = 3
): Promise<T> => {
  try {
    const res = await api.get<T>(url);
    return res.data;
  } catch (err) {
    if (retries > 0) {
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      return getData<T>(url, retries - 1);
    }
    throw err;
  }
};
