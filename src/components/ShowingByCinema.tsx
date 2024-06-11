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

  const renderShowtimes = () => {
    const dates = Object.keys(showing.dates);
    const halfLength = Math.ceil(dates.length / 2);
    const maxShowtimes = Math.max(...Object.values(showing.dates).map(arr => arr.length));
    
    // if there are >2 dates for a showing, break them into 2 columns
    // unless there are >4 showtimes for one date or the screen is <1150px wide
    const columns = (dates.length <=2 || maxShowtimes > 4 || (window.innerWidth < 1150 && window.innerWidth > 830)) && maxShowtimes > 1
      ? [dates]
      : [dates.slice(0, halfLength), dates.slice(halfLength)]
    
    return columns.map((column, i) => <Showtimes dates={column} showing={showing} key={i} />)
  }

  if (!showing.dates || !Object.keys(showing.dates).length) {
    return null;
  }

  return (
    <div className="showing-by-cinema-container" ref={showingRef}>
      <h4 className="showing-by-cinema-title showing-by-cinema-title-mobile">{showing.original_title}</h4>
      <a 
        className="showing-by-cinema-poster-container"
        href={`https://www.youtube.com/results?search_query=${trailerURL}`}
        rel="noreferrer"
        target="_blank"
      >
        <div className="showing-by-cinema-trailer-container">
          <i className="fa-regular fa-circle-play showing-by-cinema-trailer-play-btn" />
          <div className="showing-by-cinema-trailer-link">Watch trailer</div>
        </div>
        <img src={showing.poster_hi_res} className="showing-by-cinema-poster" />
      </a>
      <div className="showing-by-cinema-text-container-mobile">
        <div className="showing-by-cinema-details-container">
          <div className="showing-by-cinema-release">
            <i className="fa-regular fa-calendar showing-by-cinema-release-icon" />
            {releaseYear}
          </div>
          <div className="showing-by-cinema-runtime-container">
            <i className="fa-regular fa-clock" />
            {showing.runtime} mins
          </div>
          {showing.rating &&
            <a
              className="showing-by-cinema-rating-container"
              href={showing.imdb_url}
              target="_blank"
              rel="noreferrer"
            >
              <img src="imdb-logo.png" className="imdb-logo" />
              <div className="imdb-rating">{showing.rating.toFixed(1)}</div>
            </a>
          }
        </div>
      </div>
      <div className="showing-by-cinema-optional-text-container">
      <p className="showing-by-cinema-description">{showing.synopsis}</p>
        {showing.cast &&
          <div className="showing-by-cinema-cast-container">
            <span className="showing-by-cinema-cast-title">Cast:</span>
            <div className="showing-by-cinema-cast">
              {showing.cast.split(",").map((castMember, i, arr) => (
                <span key={castMember}>
                  {castMember}{i < arr.length - 1 && ","}
                </span>
              ))}
            </div>
          </div>
        }
      </div>
      <div className="showing-by-cinema-text-container">
        <h4 className="showing-by-cinema-title">{showing.original_title}</h4>
        <div className="showing-by-cinema-genres">{showing.genres.split(",").join(", ")}</div>
        <div className="showing-by-cinema-details-container">
          <div className="showing-by-cinema-release">
            <i className="fa-regular fa-calendar showing-by-cinema-release-icon" />
            {releaseYear}
          </div>
          {showing.rating &&
            <a
              className="showing-by-cinema-rating-container"
              href={showing.imdb_url}
              target="_blank"
              rel="noreferrer"
            >
              <img src="imdb-logo.png" className="imdb-logo" />
              <div className="imdb-rating">{showing.rating.toFixed(1)}</div>
            </a>
          }
          <div className="showing-by-cinema-runtime-container">
            <i className="fa-regular fa-clock" />
            {showing.runtime} minutes
          </div>
        </div>
        <p className="showing-by-cinema-description">{showing.synopsis}</p>
        {showing.cast &&
          <div className="showing-by-cinema-cast-container">
            <span className="showing-by-cinema-cast-title">Cast:</span>
            <div className="showing-by-cinema-cast">
              {showing.cast.split(",").map((castMember, i, arr) => (
                <span key={castMember}>
                  {castMember}{i < arr.length - 1 && ","}
                </span>
              ))}
            </div>
          </div>
        }
        <div className="showing-show-times-container">{renderShowtimes()}</div>
      </div>
      <div className="showing-show-times-container showing-show-times-container-mobile">
        {renderShowtimes()}
      </div>
    </div>
  )
}

export default ShowingByCinema;
