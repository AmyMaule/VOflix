import React, { useRef, useEffect } from "react";

import {
  CinemaType,
  DatesType,
  DisplayByType,
  FilmType,
  SortedShowingType
} from "../types";

import Showtimes from "./Showtimes";

type ShowingProps = {
  cinemas?: Record<string, CinemaType>
  cinemaId?: string,
  displayBy: DisplayByType
  filmData: FilmType
  showing: SortedShowingType
  filmTitle: string
}

const Showing = ({ cinemas, cinemaId, displayBy, filmData, showing, filmTitle }: ShowingProps) => { 
  const showingRef = useRef<HTMLDivElement>(null);
  const releaseYear = filmData.release_date?.slice(0, 4) || "";
  const trailerURL = `${encodeURIComponent(filmTitle).split(" ").join("+")}+${releaseYear}+trailer`;

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
        rootMargin: "0px 0px 70px 0px",
        threshold: 0
      }
    );

    if (activeRef) observer.observe(activeRef);
    return () => {
      if (activeRef) observer.unobserve(activeRef);
    }
  }, []);

  const renderShowDates = () => {
    console.log(showing, "??")
    return displayBy === "cinema"
      ? renderShowtimes(showing[filmTitle], "")
      : <>
          {
            Object.keys(showing).map(cinema => {
              // console.log(cinemas[cinema])
              const cinemaNameDisplay = cinema.split(",").map(word => word.trim()).join(", ");
              return (
                <React.Fragment key={cinema}>
                  <h6 className="showing-show-times-cinema">{cinemaNameDisplay}</h6>
                  {renderShowtimes(showing[cinema], cinema)}
                </React.Fragment>
              )
            })
          }
        </>
  }

  const renderShowtimes = (showingTimes: DatesType, cinema: string) => {
    const dates = Object.keys(showingTimes);
    const halfLength = Math.ceil(dates.length / 2);
    const maxShowtimes = Math.max(...Object.values(showingTimes).map(arr => arr.length));

    // if there are >2 dates for a showing, break them into 2 columns
    // unless there are >4 showtimes for one date or the screen is <1150px wide
    const columns = (dates.length <=2 || maxShowtimes > 4 || (window.innerWidth < 1150 && window.innerWidth > 830)) && maxShowtimes > 1
      ? [dates]
      : [dates.slice(0, halfLength), dates.slice(halfLength)]

    return columns.map((column, i) => (
      <Showtimes
        cinema={cinemaId || cinemas![cinema].cinema_id}
        columnNumber={i}
        dates={column}
        datesContainer={showingTimes}
        key={i}
      />
     )
    )
  }

  if (!showing) return null;

  return (
    <div className="showing-by-cinema-container" ref={showingRef}>
      <h4 className="showing-by-cinema-title showing-by-cinema-title-mobile">{filmTitle}</h4>
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
        <img src={filmData.poster_hi_res} className="showing-by-cinema-poster" />
      </a>
      <div className="showing-by-cinema-text-container-mobile">
        <div className="showing-by-cinema-details-container">
          {releaseYear &&
            <div className="showing-by-cinema-release">
              <i className="fa-regular fa-calendar" />
              {releaseYear}
            </div>
          }
          <div className="showing-by-cinema-runtime-container">
            <i className="fa-regular fa-clock" />
            {filmData.runtime} mins
          </div>
          {filmData.rating_imdb &&
            <a
              className="showing-by-cinema-rating-container"
              href={filmData.imdb_url}
              target="_blank"
              rel="noreferrer"
            >
              <img src="imdb-logo.png" className="imdb-logo" />
              <div className="imdb-rating">{filmData.rating_imdb.toFixed(1)}</div>
            </a>
          }
        </div>
      </div>
      <div className="showing-by-cinema-optional-text-container">
      <p className="showing-by-cinema-description">{filmData.synopsis}</p>
        {filmData.cast &&
          <div className="showing-by-cinema-cast-container">
            <i className="fa fa-solid fa-user-group showing-by-cinema-cast-icon" />
            <div className="showing-by-cinema-cast">
              {filmData.cast.split(",").map((castMember, i, arr) => (
                <span key={castMember}>
                  {castMember}{i < arr.length - 1 && ","}
                </span>
              ))}
            </div>
          </div>
        }
      </div>
      <div className="showing-by-cinema-text-container">
        <h4 className="showing-by-cinema-title">{filmTitle}</h4>
        <div className="showing-by-cinema-genres">{filmData.genres.split(",").join(", ")}</div>
        <div className="showing-by-cinema-details-container">
          {releaseYear &&
            <div className="showing-by-cinema-release">
              <i className="fa-regular fa-calendar" />
              {releaseYear}
            </div>
          }
          {filmData.rating_imdb &&
            <a
              className="showing-by-cinema-rating-container"
              href={filmData.imdb_url}
              target="_blank"
              rel="noreferrer"
            >
              <img src="imdb-logo.png" className="imdb-logo" />
              <div className="imdb-rating">{filmData.rating_imdb.toFixed(1)}</div>
            </a>
          }
          {filmData.runtime &&
            <div className="showing-by-cinema-runtime-container">
              <i className="fa-regular fa-clock" />
              {filmData.runtime} minutes
            </div>
          }
        </div>
        <p className="showing-by-cinema-description">{filmData.synopsis}</p>
        {filmData.cast &&
          <div className="showing-by-cinema-cast-container">
            <i className="fa fa-solid fa-user-group showing-by-cinema-cast-icon" />
            <div className="showing-by-cinema-cast">
              {filmData.cast.split(",").map((castMember, i, arr) => (
                <span key={castMember}>
                  {castMember}{i < arr.length - 1 && ","}
                </span>
              ))}
            </div>
          </div>
        }
        <div className="showing-show-times-container">{renderShowDates()}</div>
      </div>
      <div className="showing-show-times-container showing-show-times-container-mobile">{renderShowDates()}</div>
    </div>
  )
}

export default Showing;
