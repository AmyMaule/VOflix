import { useState, useEffect } from "react";

import ShowingByCinema from "./ShowingByCinema";

import { FilmType } from "../types";

type ShowingsByCinemaProps = {
  showings: FilmType[]
}

type ShowingsByCinemaType = {
  [cinemaName: string]: FilmType[];
};


const ShowingsByCinema = ({ showings }: ShowingsByCinemaProps) => {
  const [showingsByCinema, setShowingsByCinema] = useState<ShowingsByCinemaType>({});

  useEffect(() => {
    if (!Object.keys(showingsByCinema).length) {
      const showingsByCinemaLocal: ShowingsByCinemaType = {};
      showings.forEach(showing => {
        if (showingsByCinemaLocal[showing.name]) {
          showingsByCinemaLocal[showing.name].push(showing);
        } else {
          showingsByCinemaLocal[showing.name] = [showing];
        }
      });
      setShowingsByCinema(showingsByCinemaLocal);
    }
  }, []);

  if (!Object.keys(showingsByCinema).length) {
    return null;
  }

  return (
    <>
      {Object.keys(showingsByCinema).map(cinema => {
        return (
          <div className="showings-by-cinema-container" key={cinema}>
            <div>
              <h4 className="showings-by-cinema-title">{cinema}</h4>
              <h6 className="showings-by-cinema-subtitle">{showingsByCinema[cinema][0].town}</h6>
            </div>
            {showingsByCinema[cinema].map(showing => {
              return <ShowingByCinema showing={showing} key={showing.original_title} />
            })}
          </div>
        )
      })}
    </>
  )
}

export default ShowingsByCinema;
