import { TimeSortedShowingsByFilmType } from "../types";
import Showing from "./Showing";

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
            <Showing showing={showing} displayBy="film" />
          </div>
        )
      })}
    </>
  )
}

export default ShowingsByFilm;
