import { 
  CinemaType,
  FilmType, 
  SortedShowingType 
} from "../types";

import Showing from "./Showing";

type ShowingsByFilmProps = {
  allFilmData: Record<string, FilmType>
  cinemas: Record<string, CinemaType>
  timeSortedShowingsByFilm: Record<string, SortedShowingType>
}

const ShowingsByFilm = ({ allFilmData, cinemas, timeSortedShowingsByFilm }: ShowingsByFilmProps) => {
  return (
    <>
      {Object.keys(timeSortedShowingsByFilm).map(filmTitle => {
        const filmData = allFilmData[filmTitle];
        return (
          <div className="showings-by-cinema-container" key={filmTitle}>
            <Showing
              cinemas={cinemas}
              displayBy="film"
              filmData={filmData}
              filmTitle={filmTitle}
              showing={timeSortedShowingsByFilm[filmTitle]}
            />
          </div>
        )
      })}
    </>
  )
}

export default ShowingsByFilm;
