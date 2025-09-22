import { DatesType } from "../types";

type ShowtimesProps = {
  cinema: string,
  columnNumber: number,
  dates: string[],
  datesContainer: DatesType,
}

const Showtimes = ({ cinema, columnNumber, dates, datesContainer }: ShowtimesProps) => {
  const getShowingLink = (date: string) => {
    const showingDate = new Date(date);
    const day = (showingDate.getDate()).toString().padStart(2, "0");
    const month = (showingDate.getMonth() + 1).toString().padStart(2, "0");
    const year = showingDate.getFullYear();
    const showingDateString = `${year}-${month}-${day}`;
    return `https://www.allocine.fr/seance/salle_gen_csalle=${cinema}.html#shwt_date=${showingDateString}`;
  }

  // Ensure columns have a consistent width whether they have 1, 2, or 3 showings per date
  const setMargin = () => {
    if (columnNumber === 0) {
      // If there are 3 show times in the row, reduce the margin (but not if there are >3)
      if (dates.some(date => datesContainer[date].length === 3) && 
         !dates.some(date => datesContainer[date].length > 3)) {
        return "-4.75rem";
      // If there is one showing only, increase the margin
      } else if (dates.every(date => datesContainer[date].length === 1)) {
        return "4.75rem"
      }
    }
      return "";      
  }

  return (
    <div className="showing-show-times-column" style={{marginRight: setMargin()}}>
      {dates.map(date => {
        const splitDate = date.split(" ");
        const parsedDate = `${parseInt(splitDate[0], 10)} ${splitDate[1]}`;
        
        return (
          <div className="showing-show-times-row" key={date}>
            <div className="showing-show-time-date">{parsedDate}</div>
            <div className="showing-show-times">
              {datesContainer[date].map(time => {
                const showingLink = getShowingLink(date);
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
