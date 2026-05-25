import { useState, useEffect, useCallback } from "react";
import { filmsApi } from "../api/filmsApi";
import { FilmType, RawShowingType, CinemaType } from "../types";

const LAST_FETCH_KEY = "lastFetched";

const getLastFetchedTime = () => {
  const lastFetchedString = localStorage.getItem(LAST_FETCH_KEY);
  return lastFetchedString ? Number(lastFetchedString) : 0;
};

const setLastFetchedTime = (t: number) => {
  localStorage.setItem(LAST_FETCH_KEY, String(t));
};

export const useFilmsData = () => {
  const [allFilmData, setAllFilmData] = useState<Record<string, FilmType>>({});
  const [showings, setShowings] = useState<RawShowingType[]>([]);
  const [cinemas, setCinemas] = useState<Record<string, CinemaType>>({});

  const loadData = useCallback(async () => {
    const [filmsResult, showingsResult, cinemasResult] = await Promise.all([
      filmsApi.getFilms(),
      filmsApi.getShowings(),
      filmsApi.getCinemas(),
    ]);

    setAllFilmData(filmsResult);
    setShowings(showingsResult);
    setCinemas(cinemasResult);
    setLastFetchedTime(Date.now());
  }, []);

  // Initial load
  useEffect(() => {
    loadData();
  }, [loadData]);

  // When tab changes focus
  useEffect(() => {
    // If last fetch was > 6 hours ago, refetch
    const checkForRefetch = () => {
      if (document.visibilityState !== "visible") return;
      const lastFetchedTime = getLastFetchedTime();
      const now = Date.now();
      const sixHours = 6 * 60 * 60 * 1000;
      if (!lastFetchedTime || now - lastFetchedTime > sixHours) {
        loadData();
      }
    };

    document.addEventListener("visibilitychange", checkForRefetch);
    return () => document.removeEventListener("visibilitychange", checkForRefetch);
  }, [loadData]);

  return {
    allFilmData,
    showings,
    cinemas,
  };
};
