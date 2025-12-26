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

// Get unique cinema towns and their department number
export const getCinemaTowns = (cinemas: Record<string, CinemaType>) => {
  const townsAlreadyAdded = new Set<string>();

  return Object.values(cinemas)
    .filter(cinema => {
      if (townsAlreadyAdded.has(cinema.town)) {
        return false;
      }
      townsAlreadyAdded.add(cinema.town);
      return true;
    })
    .map(cinema => {
      const postcodeMatches = cinema.address.match(/\b\d{5}\b/g);
      const postcode = postcodeMatches?.[postcodeMatches.length - 1] ?? "00";
      return {
        town: cinema.town,
        deptCode: postcode.slice(0, 2),
        dept: cinema.department
      };
    });
}
