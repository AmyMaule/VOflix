import { useState, useEffect } from "react";

import ShowingByCinema from "./ShowingByCinema";

import { 
  TimeSortedFilmType,
  UnsortedFilmType 
} from "../types";

type ShowingsByCinemaProps = {
  showings: UnsortedFilmType[]
}

type TimeSortedShowingsType = {
  [cinema_name: string]: {
    [film_name: string]: TimeSortedFilmType;
  }
};

const ShowingsByCinema = ({ showings }: ShowingsByCinemaProps) => {
  const [timeSortedShowings, setTimeSortedShowings] = useState<TimeSortedShowingsType>({});

  // normalize showing data so that they are date and time sorted
  useEffect(() => {
    if (!showings.length || Object.keys(timeSortedShowings).length) return;
    const showingTimes: TimeSortedShowingsType = {};

    showings.forEach(showing => {
      const { cinema_name: cinema, original_title: title, start_time: { date, time } } = showing;

      // add cinema to showingTimes
      if (!showingTimes?.[cinema]) {
        showingTimes[cinema] = {};
      }
      
      // add film to cinema
      if (showingTimes[cinema]?.[title]) {
        if (showingTimes[cinema][title]?.dates[date]) {
          showingTimes[cinema][title].dates[date].push(time);
        } else {
          showingTimes[cinema][title].dates[date] = [time];
        }

      } else {
        // Add all extra info except start_time
        const { start_time, ...restOfShowing } = showing;
        showingTimes[cinema][title] = {
          ...restOfShowing,
          dates: {
            [date]: [time]
          }
        }
      }
    })
    setTimeSortedShowings(showingTimes);
  }, [showings]);

  if (!Object.keys(timeSortedShowings).length) {
    return null;
  }

  return (
    <>
      {Object.keys(timeSortedShowings).map(cinema => {
        const films = Object.keys(timeSortedShowings[cinema]);

        return (
          <div className="showings-by-cinema-container" key={cinema}>
            <div>
              <h4 className="showings-by-cinema-title">{cinema}</h4>
              <h6 className="showings-by-cinema-subtitle">{Object.values(timeSortedShowings[cinema])[0].cinema_town}</h6>
            </div>
            {films.map(filmTitle => {
              const showing = timeSortedShowings[cinema][filmTitle];
              return <ShowingByCinema showing={showing} key={showing.original_title} />
            })}
          </div>
        )
      })}
    </>
  )
}

export default ShowingsByCinema;
