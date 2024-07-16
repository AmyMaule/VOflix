import { useState, useEffect } from "react";

import ShowingsByCinema from "./ShowingsByCinema";

import { 
  DisplayByType,
  TimeSortedShowingsType,
  UnsortedFilmType 
} from "../types";

type FilmsContainerProps = {
  displayBy: DisplayByType
  showings: UnsortedFilmType[]
}

const FilmsContainer = ({ displayBy, showings }: FilmsContainerProps) => {
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
      {displayBy === "cinema"
        ? <ShowingsByCinema timeSortedShowings={timeSortedShowings} />
        : <div></div>        
      }
    </>
  )
}

export default FilmsContainer;
