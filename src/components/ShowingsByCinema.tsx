import Showing from "./Showing";

import { 
  CinemaType,
  FilmType,
  SortedShowingType
} from "../types";

type ShowingsByCinemaProps = {
  allFilmData: Record<string, FilmType>
  cinemas: Record<string, CinemaType>
  timeSortedShowingsByCinema: Record<string, SortedShowingType>
}

const ShowingsByCinema = ({ allFilmData, cinemas, timeSortedShowingsByCinema }: ShowingsByCinemaProps) => {
  return (
    <>
      {Object.keys(timeSortedShowingsByCinema).map(cinema => {
        console.log(cinema)
        const { name: cinemaName, town: cinemaTown } = cinemas[cinema];
        const films = Object.keys(timeSortedShowingsByCinema[cinema]);

        return (
          <div className="showings-by-cinema-container" key={cinema}>
            <div>
              <h4 className="showings-by-cinema-title">{cinemaName}</h4>
              <h6 className="showings-by-cinema-subtitle">{cinemaTown}</h6>
            </div>
            {films.map(filmTitle => {
              const filmData = allFilmData[filmTitle];
              const showing = {
                [filmTitle]: timeSortedShowingsByCinema[cinema][filmTitle]
              }
              return (
                <Showing
                  displayBy="cinema"
                  filmData={filmData}
                  filmTitle={filmTitle}
                  showing={showing}
                  key={filmTitle}
                />
              )
            })}
          </div>
        )
      })}
    </>
  )
}

export default ShowingsByCinema;
