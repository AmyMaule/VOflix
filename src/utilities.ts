import axios, { AxiosError } from "axios";

export const renderError = (err: unknown) => {
  if (axios.isAxiosError(err)) {
    const axiosErr = err as AxiosError;
    console.log("Error:", axiosErr.response?.data || axiosErr.response);
  } else {
    console.log(err);
  }
}
