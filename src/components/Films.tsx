import { useEffect } from "react";
import axios, { AxiosResponse } from "axios";

import ShowingsByCinema from "./ShowingsByCinema";

const Films = () => {
  const showings = [
    {
      "start_time": "datetime.datetime(2024,5,25,18,0)",
      "original_title": "Dancing Pina",
      "french_title": "Dancing Pina",
      "runtime": 112,
      "synopsis": "Two of Pina Bausch's most famous works are rehearsed in Germany and Senegal, championing the choreographer's legacy through a younger generation of dancers.",
      "cast": "Clémentine Deluy,Malou Airaudo,Josephine Ann Endicott",
      "languages": "English,French,German,Portuguese",
      "genres": "Documentary",
      "release_date": "datetime.date(2024,5,18)",
      "rating": 8.2,
      "imdb_url": "https://www.imdb.com/title/tt21942250",
      "origin_country": "DE",
      "poster_hi_res": "https://image.tmdb.org/t/p/w780/hNnu7bM6OziiPwQGXenhhp2yAjr.jpg",
      "poster_lo_res": "https://image.tmdb.org/t/p/w342/hNnu7bM6OziiPwQGXenhhp2yAjr.jpg",
      "tagline": "",
      "name": "Cinéma Casino",
      "town": "Ax-les-Thermes"
    },
    {
      "start_time": "datetime.datetime(2024,5,25,18,0)",
      "original_title": "Dancing Pina 3",
      "french_title": "Dancing Pina",
      "runtime": 112,
      "synopsis": "Two of Pina Bausch's most famous works are rehearsed in Germany and Senegal, championing the choreographer's legacy through a younger generation of dancers.",
      "cast": "Clémentine Deluy,Malou Airaudo,Josephine Ann Endicott",
      "languages": "English,French,German,Portuguese",
      "genres": "Documentary",
      "release_date": "datetime.date(2024,5,18)",
      "rating": 8.2,
      "imdb_url": "https://www.imdb.com/title/tt21942250",
      "origin_country": "DE",
      "poster_hi_res": "https://image.tmdb.org/t/p/w780/hNnu7bM6OziiPwQGXenhhp2yAjr.jpg",
      "poster_lo_res": "https://image.tmdb.org/t/p/w342/hNnu7bM6OziiPwQGXenhhp2yAjr.jpg",
      "tagline": "",
      "name": "Cinéma Casino",
      "town": "Ax-les-Thermes"
    },
    {
      "start_time": "datetime.datetime(2024,5,25,18,0)",
      "original_title": "Dancing Pina 2",
      "french_title": "Dancing Pina",
      "runtime": 112,
      "synopsis": "Slightly different synopsis! Two of Pina Bausch's most famous works are rehearsed in Germany and Senegal, championing the choreographer's legacy through a younger generation of dancers.",
      "cast": "Clémentine Deluy,Malou Airaudo,Josephine Ann Endicott",
      "languages": "English,French,German,Portuguese",
      "genres": "Documentary",
      "release_date": "datetime.date(2024,5,18)",
      "rating": 8.2,
      "imdb_url": "https://www.imdb.com/title/tt21942250",
      "origin_country": "DE",
      "poster_hi_res": "https://image.tmdb.org/t/p/w780/hNnu7bM6OziiPwQGXenhhp2yAjr.jpg",
      "poster_lo_res": "https://image.tmdb.org/t/p/w342/hNnu7bM6OziiPwQGXenhhp2yAjr.jpg",
      "tagline": "",
      "name": "Other",
      "town": "Ax-les-Thermes"
    }
  ]

  useEffect(() => {
    axios.get(`${import.meta.env.baseURL}/search`)
    .then((res) =>  res.json())
    .then(data => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);

  return (
    <div className="films-section">
      <h1 className="films-title">Films currently showing</h1>
      <div className="films-container">
        {/* Display by film */}

        {/* Display by cinema */}
        <ShowingsByCinema showings={showings} />
      </div>
    </div>
  )
}

export default Films;
