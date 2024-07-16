import { TimeSortedShowingsByFilmType } from "../types";
import ShowingByCinema from "./ShowingByCinema";

type ShowingsByFilmProps = {
  timeSortedShowingsByFilm: TimeSortedShowingsByFilmType
}

const ShowingsByFilm = ({ timeSortedShowingsByFilm }: ShowingsByFilmProps) => {
  return (
    <>
      {Object.keys(timeSortedShowingsByFilm).map(filmTitle => {
        const showing = timeSortedShowingsByFilm[filmTitle];
        return (
          <div className="showings-by-cinema-container" key={filmTitle}>
            <h4 className="showings-by-cinema-title">{filmTitle}</h4>
            <ShowingByCinema showing={showing} displayBy="film" />
          </div>
        )
      })}
    </>
  )
}

export default ShowingsByFilm;
