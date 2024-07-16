import { DatesType } from "../types";

type ShowtimesProps = {
  dates: string[],
  datesContainer: DatesType
}

const Showtimes = ({ dates, datesContainer }: ShowtimesProps) => {
  return (
    <div className="showing-show-times-column">
      {dates.map(date => {
        return (
          <div className="showing-show-times-row" key={date}>
            <div className="showing-show-time-date">{date}</div>
            <div className="showing-show-times">
              {datesContainer[date].map(time => {
                return <div className="showing-show-time" key={time}>{time}</div>
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Showtimes;
