import ShowingByCinema from "./ShowingByCinema";

import { TimeSortedShowingsType } from "../types";

type ShowingsByCinemaProps = {
  timeSortedShowings: TimeSortedShowingsType
}

const ShowingsByCinema = ({ timeSortedShowings }: ShowingsByCinemaProps) => {
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
