import { useState, useEffect, useCallback } from "react";
import { fetchFilms, fetchShowings, fetchCinemas } from "../api/filmsApi";
import { FilmType, RawShowingType, CinemaType } from "../types";
import { renderError } from "../utilities";

export const useFilmsData = () => {
  const [allFilmData, setAllFilmData] = useState<Record<string, FilmType>>({});
  const [showings, setShowings] = useState<RawShowingType[]>([]);
  const [cinemas, setCinemas] = useState<Record<string, CinemaType>>({});

  const loadData = useCallback(async () => {
    try {
      const [filmsResult, showingsResult, cinemasResult] = await Promise.all([
        fetchFilms(),
        fetchShowings(),
        fetchCinemas(),
      ]);

      setAllFilmData(filmsResult);
      setShowings(showingsResult);
      setCinemas(cinemasResult);

    } catch (err) {
      renderError(err);
    }
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
