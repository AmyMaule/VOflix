import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

import { renderError } from "../utilities";
import { 
  CinemaType,
  DisplayByType,
  FilmType,
  RawShowingType, 
} from "../types";

import CinemaSelector from "./CinemaSelector";
import FilmsContainer from "./FilmsContainer";

const FilmsSection = () => {
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [allFilmData, setallFilmData] = useState<Record<string, FilmType>>({});
  const [showings, setShowings] = useState<RawShowingType[]>([]);
  const [cinemas, setCinemas] = useState<Record<string, CinemaType>>({});
  const storedDisplayBy: DisplayByType | null = localStorage.getItem("displayBy") as DisplayByType | null;
  const [displayBy, setDisplayBy] = useState<DisplayByType>(storedDisplayBy || "cinema");
  const storedSelectedCinemas = localStorage.getItem("selectedCinemas");
  const [selectedCinemas, setSelectedCinemas]  = useState<string[]>(storedSelectedCinemas ? JSON.parse(storedSelectedCinemas) : []);

  const getData = useCallback(<T,>(
    url: string, 
    setData: React.Dispatch<React.SetStateAction<T>>,
    retries = 0
  ) => {
    axios.get<T>(url)
      .then(res => setData(res.data))
      .catch(err => {
        // The server can be temperamental if multiple queries are performed too close together
        if (retries < 3) {
          setTimeout(() => {
            getData(url, setData, retries + 1);
          }, 1050);
        } else {
          renderError(err);
        }
      });
  }, []);
  
  const setAndStoreDisplayBy = (selectedDisplayBy: DisplayByType) => {
    setDisplayBy(selectedDisplayBy);
    localStorage.setItem("displayBy", selectedDisplayBy);
  }
  
  useEffect(() => {
    const baseUrl = import.meta.env.VITE_BASEURL;
    getData<Record<string, FilmType>>(`${baseUrl}/search/movies`, setallFilmData);
    getData<RawShowingType[]>(`${baseUrl}/search/showings`, setShowings);
    getData<Record<string, CinemaType>>(`${baseUrl}/cinemas`, setCinemas);
  }, [getData]);

  if (!showings.length || !Object.keys(allFilmData).length || !Object.keys(cinemas).length) {
    return <div className="films-section" />
  }

  return (
    <div className="films-section">
      <h1 className="films-title">Films currently showing</h1>
      <div className="films-container">
        <div className="films-display-by-container">
          Sort showings by:
          <div className="btn-films-display-by-container">
            <button
              className={`btn btn-films-display-by ${displayBy === "cinema" ? "btn-films-display-by-current" : ""}`}
              onClick={() => setAndStoreDisplayBy("cinema")}
            >
              <span>Cinema</span>
            </button>
            <button
              className={`btn btn-films-display-by ${displayBy === "cinema" ? "" : "btn-films-display-by-current"}`}
              onClick={() => setAndStoreDisplayBy("film")}
            >
              <span>Film</span>
            </button>
          </div>
          <CinemaSelector
            cinemas={cinemas}
            setErrors={setErrors}
            selectedCinemas={selectedCinemas}
            setSelectedCinemas={setSelectedCinemas}
          />
        </div>
        <FilmsContainer
          allFilmData={allFilmData}
          cinemas={cinemas}
          displayBy={displayBy} 
          errors={errors}
          showings={showings}
          selectedCinemas={selectedCinemas}
        />
      </div>
    </div>
  )
}

export default FilmsSection;
