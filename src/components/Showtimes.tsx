import { TimeSortedFilmType } from "../types";

type ShowtimesProps = {
  dates: string[],
  showing: TimeSortedFilmType
}

const Showtimes = ({ dates, showing }: ShowtimesProps) => {
  return (
    <div className="showing-show-times-column">
      {dates.map(date => {
        return (
          <div className="showing-show-times-row" key={date}>
            <div className="showing-show-time-date">{date}</div>
            <div className="showing-show-times">
              {showing.dates[date].map(time => {
                return (
                  <div className="showing-show-time" key={time}>
                    <span>{time}</span>
                  </div>
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
