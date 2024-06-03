import { FilmType } from "../types";

type ShowingByCinemaProps = {
  showing: FilmType
}

const ShowingByCinema = ({ showing }: ShowingByCinemaProps) => {
  return (
    <div className="showing-by-cinema-container">
      <img src={showing.poster_hi_res} className="showing-by-cinema-poster" />
      <div className="showing-by-cinema-text-container">
        <h4 className="showing-by-cinema-title">{showing.original_title}</h4>
        <div className="showing-by-cinema-genres">{showing.genres}</div>
        <div className="showing-by-cinema-runtime-container">
          <div>2023</div>
          <a
            className="showing-by-cinema-rating-container"
            href={showing.imdb_url}
            target="_blank"
            rel="noreferrer"
          >
            <img src="imdb-logo.png" className="imdb-logo" />
            {showing.rating}
          </a>
          <div>{showing.runtime} minutes</div>
        </div>
        <p className="showing-by-cinema-description">{showing.synopsis}</p>
        <div className="showing-by-cinema-cast-container">
          <span>Cast:</span>
          {showing.cast.split(",").join(", ")}
        </div>
        {/* loop over show times once data structure is known */}
        <div className="showing-show-times-container">
          <div className="showing-show-times-row">
            <div className="showing-show-time-date">17th June</div>
            <div className="showing-show-time">15:30</div>
            <div className="showing-show-time">18:30</div>
          </div>
          <div className="showing-show-times-row">
            <div className="showing-show-time-date">21st September</div>
            <div className="showing-show-time">19:00</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShowingByCinema;
