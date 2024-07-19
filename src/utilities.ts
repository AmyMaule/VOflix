import axios, { AxiosError } from "axios";

import { CinemaType } from "./types";

export const renderError = (err: unknown) => {
  if (axios.isAxiosError(err)) {
    const axiosErr = err as AxiosError;
    console.log("Error:", axiosErr.response?.data || axiosErr.response);
  } else {
    console.log(err);
  }
}

// Get unique cinema towns
export const getCinemaTowns = (cinemas: CinemaType[]) => {
  return [... new Set(cinemas.map(cinema => cinema.town))];
}
