import Showing from "./Showing";

import { TimeSortedShowingsByCinemaType } from "../types";

type ShowingsByCinemaProps = {
  timeSortedShowingsByCinema: TimeSortedShowingsByCinemaType
}

const ShowingsByCinema = ({ timeSortedShowingsByCinema }: ShowingsByCinemaProps) => {
  return (
    <>
      {Object.keys(timeSortedShowingsByCinema).map(cinema => {
        const films = Object.keys(timeSortedShowingsByCinema[cinema]);

        return (
          <div className="showings-by-cinema-container" key={cinema}>
            <div>
              <h4 className="showings-by-cinema-title">{cinema}</h4>
              <h6 className="showings-by-cinema-subtitle">{Object.values(timeSortedShowingsByCinema[cinema])[0].cinema_town}</h6>
            </div>
            {films.map(filmTitle => {
              const showing = timeSortedShowingsByCinema[cinema][filmTitle];
              return <Showing displayBy="cinema" showing={showing} key={showing.original_title} />
            })}
          </div>
        )
      })}
    </>
  )
}

export default ShowingsByCinema;
