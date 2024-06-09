import { useRef, useEffect } from "react";
import { TimeSortedFilmType } from "../types";

import Showtimes from "./Showtimes";

type ShowingByCinemaProps = {
  showing: TimeSortedFilmType
}

const ShowingByCinema = ({ showing }: ShowingByCinemaProps) => {
  const showingRef = useRef<HTMLDivElement>(null);
  const releaseYear = showing.release_date.slice(0, 4);
  const trailerURL = `${showing.original_title.split(" ").join("+")}+${releaseYear}+trailer`;
  
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

  // if there are more than 2 dates for a showing, break them into 2 columns
  const renderShowtimes = () => {
    const dates = Object.keys(showing.dates);
    const halfLength = Math.ceil(dates.length / 2);
    const columns = dates.length < 3 ? [dates] : [dates.slice(0, halfLength), dates.slice(halfLength)];
    return columns.map(column => <Showtimes dates={column} showing={showing} />)
  }

  if (!showing.dates || !Object.keys(showing.dates).length) {
    return null;
  }

  return (
    <div className="showing-by-cinema-container" ref={showingRef}>
      <a 
        className="showing-by-cinema-poster-container"
        href={`https://www.youtube.com/results?search_query=${trailerURL}`}
        rel="noreferrer"
        target="_blank"
      >
        <div className="showing-by-cinema-trailer-container">
          <i className="fa-regular fa-circle-play showing-by-cinema-trailer-play-btn" />
          <div className="showing-by-cinema-trailer-link">
              Watch trailer
          </div>
        </div>
        <img src={showing.poster_hi_res} className="showing-by-cinema-poster" />
      </a>
      <div className="showing-by-cinema-text-container">
        <h4 className="showing-by-cinema-title">{showing.original_title}</h4>
        <div className="showing-by-cinema-genres">{showing.genres.split(",").join(", ")}</div>
        <div className="showing-by-cinema-runtime-container">
          <div>{releaseYear}</div>
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
        <div className="showing-show-times-container">{renderShowtimes()}</div>
      </div>
    </div>
  )
}

export default ShowingByCinema;
