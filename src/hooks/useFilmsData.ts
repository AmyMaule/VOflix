import { useState, useEffect, useCallback } from "react";
import { filmsApi } from "../api/filmsApi";
import { FilmType, RawShowingType, CinemaType } from "../types";

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
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return {
    allFilmData,
    showings,
    cinemas,
  };
};
