import { useRef, useEffect } from "react";
import { TimeSortedFilmType } from "../types";

type ShowingByCinemaProps = {
  showing: TimeSortedFilmType
}

const ShowingByCinema = ({ showing }: ShowingByCinemaProps) => {
  const showingRef = useRef<HTMLDivElement>(null);
  const trailerURL = showing.original_title.split(" ").join("+") + "" + "+trailer";

  useEffect(() => {
    const activeRef = showingRef.current;
    if (!activeRef) return;

    // use intersection observer to animate showings as they come into view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          activeRef?.classList.add("animate");
          observer.unobserve(activeRef);
        }
      },
      {
        root: null,
        rootMargin: "0px 0px 10px 0px",
        threshold: 0
      }
    );

    if (activeRef) observer.observe(activeRef);
    return () => {
      if (activeRef) observer.unobserve(activeRef);
    }
  }, []);

  if (!showing.dates || !Object.keys(showing.dates).length) {
    return null;
  }

  return (
    <div className="showing-by-cinema-container" ref={showingRef}>
      <div className="showing-by-cinema-poster-container">
        <a
          className="showing-by-cinema-trailer-container"
          href={`https://www.youtube.com/results?search_query=${trailerURL}`}
          rel="noreferrer"
          target="_blank"
        >
          <i className="fa-regular fa-circle-play showing-by-cinema-trailer-play-btn" />
          <div className="showing-by-cinema-trailer-link">
              Watch trailer
          </div>
        </a>
        <img src={showing.poster_hi_res} className="showing-by-cinema-poster" />
      </div>
      <div className="showing-by-cinema-text-container">
        <h4 className="showing-by-cinema-title">{showing.original_title}</h4>
        <div className="showing-by-cinema-genres">{showing.genres}</div>
        <div className="showing-by-cinema-runtime-container">
          <div>2023</div>
          {showing.rating &&
            <a
              className="showing-by-cinema-rating-container"
              href={showing.imdb_url}
              target="_blank"
              rel="noreferrer"
            >
              <img src="imdb-logo.png" className="imdb-logo" />
              {showing.rating.toFixed(1)}
            </a>
          }
          <div>{showing.runtime} minutes</div>
        </div>
        <p className="showing-by-cinema-description">{showing.synopsis}</p>
        <div className="showing-by-cinema-cast-container">
          <span>Cast:</span>
          {showing.cast.split(",").join(", ")}
        </div>
        <div className="showing-show-times-container">
          {Object.keys(showing.dates).map(date => {              
              return (
                <div className="showing-show-times-row" key={date}>
                  <div className="showing-show-time-date">{date}</div>
                  {showing.dates[date].map(time => {
                    return <div className="showing-show-time" key={time}>{time}</div>
                  })}
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}

export default ShowingByCinema;
