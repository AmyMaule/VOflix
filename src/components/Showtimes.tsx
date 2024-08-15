import { DatesType } from "../types";

import {
  FilmSortedByCinemaType,
  FilmSortedByFilmType
} from "../types";

type ShowtimesProps = {
  dates: string[],
  datesContainer: DatesType,
  showing: FilmSortedByCinemaType | FilmSortedByFilmType
}

const Showtimes = ({ dates, datesContainer, showing }: ShowtimesProps) => {
  const getShowingLink = (date: string) => {
    const showingDate = new Date(date);
    const day = (showingDate.getDate()).toString().padStart(2, "0");
    const month = (showingDate.getMonth() + 1).toString().padStart(2, "0");
    const year = showingDate.getFullYear();
    const showingDateString = `${year}-${month}-${day}`;
    return `https://www.allocine.fr/seance/salle_gen_csalle=${showing.cinema_id}.html#shwt_date=${showingDateString}`;
  }

  return (
    <div className="showing-show-times-column">
      {dates.map(date => {
        const showingLink = getShowingLink(date);
        const splitDate = date.split(" ");
        const parsedDate = `${parseInt(splitDate[0], 10)} ${splitDate[1]}`;
        
        return (
          <div className="showing-show-times-row" key={date}>
            <div className="showing-show-time-date">{parsedDate}</div>
            <div className="showing-show-times">
              {datesContainer[date].map(time => {
                return (
                  <a
                    className="showing-show-time"
                    href={showingLink}
                    target="_blank"
                    rel="noreferrer"
                    key={time}
                  >
                    {time}
                  </a>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Showtimes;
