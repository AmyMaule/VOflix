import { useState, useEffect, useMemo } from "react";

import ShowingsByCinema from "./ShowingsByCinema";
import ShowingsByFilm from "./ShowingsByFilm";

import { 
  CinemaType,
  DisplayByType,
  FilmType,
  RawShowingType,
  SortedShowingType
} from "../types";

type FilmsContainerProps = {
  allFilmData: Record<string, FilmType>
  cinemas: Record<string, CinemaType>
  displayBy: DisplayByType
  errors: Record<string, boolean>
  selectedCinemas: string[]
  showings: RawShowingType[]
}

const FilmsContainer = ({ allFilmData, cinemas, displayBy, errors, selectedCinemas, showings }: FilmsContainerProps) => {
  const [timeSortedShowingsByCinema, setTimeSortedShowingsByCinema] = useState<Record<string, SortedShowingType>>({});
  const [timeSortedShowingsByFilm, setTimeSortedShowingsByFilm] = useState<Record<string, SortedShowingType>>({});
  // Hidden films is not controlled by the user but contains films that have been incorrectly flagged as being in English
  const hiddenFilms = useMemo(
  () =>
    JSON.parse(import.meta.env.VITE_HIDDEN_FILMS)
      .map((filmTitle: string) => filmTitle.toLowerCase()),
  []
);

  const renderUserError = (message:string) => {
    return (
      <div className="no-showings-found">{message}</div>
    )
  }

  useEffect(() => {
    if (!showings.length) return;
    
    const showingTimesByFilm: Record<string, SortedShowingType> = {};
    const showingTimesByCinema: Record<string, SortedShowingType> = {};

    // Sorted showings by film/cinema have the same structure with film/cinema reversed so field1/2 are the title and cinema
    const getTimeSortedShowings = (showing: RawShowingType, varToUpdate: Record<string, SortedShowingType>, field1: string, field2: string) => {
      const { start_time } = showing;
      const showingDate = `${start_time.date} ${start_time.year}`;
      varToUpdate[field1] ??= {};
      varToUpdate[field1][field2] ??= {};
      varToUpdate[field1][field2][showingDate] ??= [];
      varToUpdate[field1][field2][showingDate].push(start_time.time);
    }

    showings.forEach(showing => {      
      // Ensure user only sees showings from towns they have selected
      if (hiddenFilms.includes(showing.original_title.toLowerCase()) || !selectedCinemas.includes(cinemas[showing.cinema].town)) return;

      const { cinema, original_title } = showing;  
      getTimeSortedShowings(showing, showingTimesByFilm, original_title, cinema);
      getTimeSortedShowings(showing, showingTimesByCinema, cinema, original_title);
    });
    setTimeSortedShowingsByCinema(showingTimesByCinema);
    setTimeSortedShowingsByFilm(showingTimesByFilm);
  }, [cinemas, hiddenFilms, selectedCinemas, showings]);
  
  if (errors.cinemaSelection) {
    return renderUserError("At least one cinema must be selected!");
  }

  if (!Object.keys(timeSortedShowingsByFilm).length || !selectedCinemas.length) {
    return renderUserError("No showings match your search criteria.\nTry searching a broader range of cinemas.");
  }

  return (
    <>
      {displayBy === "cinema"
        ? <ShowingsByCinema
            allFilmData={allFilmData}
            cinemas={cinemas}
            timeSortedShowingsByCinema={timeSortedShowingsByCinema} 
          />
        : <ShowingsByFilm
            allFilmData={allFilmData}
            cinemas={cinemas}
            timeSortedShowingsByFilm={timeSortedShowingsByFilm}
          />
      }
    </>
  )
}

export default FilmsContainer;
