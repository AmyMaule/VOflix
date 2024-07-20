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
    const today = new Date();
    const showingDate = new Date(date);
    // set hours to 0 for easier comparisons; the time does not matter for these purposes
    today.setHours(0, 0, 0, 0);
    showingDate.setHours(0, 0, 0, 0);

    // the link is different if the showing is today
    if (showingDate.getTime() === today.getTime()) {
      return `https://www.allocine.fr/seance/salle_gen_csalle=${showing.cinema_id}.html`;
    } else {
      const msPerDay = 24 * 60 * 60 * 1000;
      const daysUntilShowing = (showingDate.getTime() - today.getTime()) / msPerDay;
      return `https://www.allocine.fr/seance/d-${daysUntilShowing}/salle_gen_csalle=${showing.cinema_id}.html`;
    }
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
