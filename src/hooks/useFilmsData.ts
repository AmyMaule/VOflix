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
    try {
      const [filmsResult, showingsResult, cinemasResult] = await Promise.all([
        filmsApi.getFilms(),
        filmsApi.getShowings(),
        filmsApi.getCinemas(),
      ]);

      console.log("Fetching films...")
      setAllFilmData(filmsResult);
      setShowings(showingsResult);
      setCinemas(cinemasResult);
      setLastFetchedTime(Date.now());
    } catch (err) {
      console.error("Failed to load data", err);
    }
  }, []);

  // Initial load
  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    // If last fetch was > 3 hours ago, refetch
    const checkForRefetch = () => {
      if (document.visibilityState !== "visible") return;
      const lastFetchedTime = getLastFetchedTime();
      const now = Date.now();
      const threeHours = 3 * 60 * 60 * 1000;
      console.log("Checking for refetch", !lastFetchedTime, now - lastFetchedTime > threeHours)
      if (!lastFetchedTime || now - lastFetchedTime > threeHours) {
        loadData();
      }
    };

    // Check when the browser restores the page as well as when the user switches tabs
    document.addEventListener("visibilitychange", checkForRefetch);
    window.addEventListener("pageshow", checkForRefetch);
    return () => {
      document.removeEventListener("visibilitychange", checkForRefetch);
      window.removeEventListener("pageshow", checkForRefetch);
    }
  }, [loadData]);

  return {
    allFilmData,
    showings,
    cinemas,
  };
};
