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

    console.log("Fetching new data for Lavelanet, Foix and Perpignan...")
    setAllFilmData(filmsResult);
    setShowings(showingsResult);
    setCinemas(cinemasResult);
    setLastFetchedTime(Date.now());
    const testShowings: RawShowingType[] = [];
    const testCinemas = ["Méga Castillet,Perpignan", "Le Casino,Lavelanet", "L'Estive,Foix", "Castillet,Perpignan"]
    showingsResult.forEach(showing => {
      if (testCinemas.includes(showing.cinema)) {
        testShowings.push(showing);
      }
    })
    console.log(testShowings)
  } catch (err) {
    console.error("Failed to load data", err);
  }
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
      const threeHours = 3 * 60 * 60 * 1000;
      console.log("Checking for refetch", now - lastFetchedTime)
      if (!lastFetchedTime || now - lastFetchedTime > threeHours) {
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
