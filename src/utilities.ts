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
export const getCinemaTowns = (cinemas: Record<string, CinemaType>) => {
  return [... new Set(Object.values(cinemas).map(cinema => cinema.town))];
}
