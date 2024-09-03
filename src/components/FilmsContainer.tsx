import { useState, useEffect } from "react";

import ShowingsByCinema from "./ShowingsByCinema";
import ShowingsByFilm from "./ShowingsByFilm";

import { 
  DisplayByType,
  TimeSortedShowingsByCinemaType,
  TimeSortedShowingsByFilmType,
  UnsortedFilmType 
} from "../types";

type FilmsContainerProps = {
  displayBy: DisplayByType,
  selectedCinemas: string[],
  showings: UnsortedFilmType[]
}

const FilmsContainer = ({ displayBy, selectedCinemas, showings }: FilmsContainerProps) => {
  const [timeSortedShowingsByCinema, setTimeSortedShowingsByCinema] = useState<TimeSortedShowingsByCinemaType>({});
  const [timeSortedShowingsByFilm, setTimeSortedShowingsByFilm] = useState<TimeSortedShowingsByFilmType>({});

  // normalize showing data so that they are date and time sorted
  useEffect(() => {
    if (!showings.length && !Object.keys(timeSortedShowingsByCinema).length) return;

    // Create normalized data sorted by cinema, and by film
    const showingTimesByCinema: TimeSortedShowingsByCinemaType = {};
    const showingTimesByFilm: TimeSortedShowingsByFilmType = {};

    showings.forEach(showing => {
      if (!selectedCinemas.includes(showing.cinema_town)) return;
      const { cinema_name, cinema_town, original_title, start_time: { date: showingDate, time, year } } = showing;
      const date = `${showingDate} ${year}`;
      const cinema = `${cinema_name}, ${cinema_town}`;

      // add cinema to showingTimesByCinema
      if (!showingTimesByCinema?.[cinema_name]) {
        showingTimesByCinema[cinema_name] = {};
      }
      
      // add film to cinema
      if (showingTimesByCinema[cinema_name]?.[original_title]) {
        if (showingTimesByCinema[cinema_name][original_title]?.dates[date]) {
          showingTimesByCinema[cinema_name][original_title].dates[date].push(time);
        } else {
          showingTimesByCinema[cinema_name][original_title].dates[date] = [time];
        }

      } else {
        showingTimesByCinema[cinema_name][original_title] = {
          ...showing,
          dates: { [date]: [time] }
        }
      }

      // Now create normalized data for displaying by film
      // Add all necessary info about the film except start_time
      const { start_time, ...restOfShowing } = showing;    
      if (!showingTimesByFilm[original_title]) {
        showingTimesByFilm[original_title] = {
          ...restOfShowing,
          dates: {
            [cinema]: {
              [date]: [time]
            }
          }
        }
      } else if (showingTimesByFilm[original_title].dates?.[cinema]?.[date]) {
        showingTimesByFilm[original_title].dates[cinema][date].push(time);
      // If cinema exists, but not date
      } else if (showingTimesByFilm[original_title].dates?.[cinema]) {
        showingTimesByFilm[original_title].dates[cinema][date] = [time];
      // If no cinema exists
      } else if (!showingTimesByFilm[original_title].dates?.[cinema]) {
        showingTimesByFilm[original_title].dates[cinema] = {
          [date]: [time]
        };
      }
    })
    setTimeSortedShowingsByCinema(showingTimesByCinema);
    setTimeSortedShowingsByFilm(showingTimesByFilm);
  }, [selectedCinemas, showings]);

  if (!showings.length || !selectedCinemas.length) {
    return (
      <div className="no-showings-found">
        No showings match your search criteria.{"\n"}
        Try searching a broader range of cinemas.
      </div>
    )
  }

  if (!Object.keys(timeSortedShowingsByCinema).length) {
    return null;
  }

  return (
    <>
      {displayBy === "cinema"
        ? <ShowingsByCinema timeSortedShowingsByCinema={timeSortedShowingsByCinema} />
        : <ShowingsByFilm timeSortedShowingsByFilm={timeSortedShowingsByFilm} />     
      }
    </>
  )
}

export default FilmsContainer;
