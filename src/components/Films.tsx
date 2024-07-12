import React, { useEffect, useState } from "react";
import axios from "axios";

import { renderError } from "../utilities";
import { CinemaType, UnsortedFilmType } from "../types";

import ShowingsByCinema from "./ShowingsByCinema";

type DataType = UnsortedFilmType[] | CinemaType[];

const Films = () => {
  const [showings, setShowings] = useState<UnsortedFilmType[]>([]);
  const [cinemas, setCinemas] = useState<CinemaType[]>([]);
  const [displayBy, setDisplayBy] = useState<"cinema" | "film">("cinema");

  // The server can be temperamental if multiple queries are performed too close together
  const getData = <T extends DataType>(
    url: string, 
    setData: React.Dispatch<React.SetStateAction<T>>, 
    retries = 0
  ) => {
    axios.get<T>(url)
      .then(res => setData(res.data))
      .catch(err => {
        if (retries < 3) {
          setTimeout(() => {
            getData(url, setData, retries + 1);
          }, 1050);
        } else {
          renderError(err);
        }
      });
  };
  
  useEffect(() => {
    const baseUrl = import.meta.env.VITE_BASEURL;
    getData(`${baseUrl}/search`, setShowings);
    getData(`${baseUrl}/cinemas`, setCinemas);
  }, []);

  if (!showings.length || !cinemas.length) return null;

  return (
    <div className="films-section">
      <h1 className="films-title">Films currently showing</h1>
      <div className="films-container">
        <div className="films-display-by-container">
          Sort showings by:
          <div className="films-display-by-btn-container">
            <button
              className={`films-display-by-btn ${displayBy === "cinema" ? "films-display-by-btn-current" : ""}`}
              onClick={() => setDisplayBy("cinema")}
            >
              Cinema
            </button>
            <button
              className={`films-display-by-btn ${displayBy === "cinema" ? "" : "films-display-by-btn-current"}`}
              onClick={() => setDisplayBy("film")}
            >
              Film
            </button>
          </div>
        </div>
        {displayBy === "cinema"
          ? <ShowingsByCinema showings={showings} />
          : <div></div>        
        }
      </div>
    </div>
  )
}

export default Films;
