import React, { useEffect, useState } from "react";
import axios from "axios";

import { getCinemaTowns, renderError } from "../utilities";
import { 
  CinemaType,
  FetchedDataType,
  DisplayByType,
  UnsortedFilmType 
} from "../types";

import CinemaSelector from "./CinemaSelector";
import FilmsContainer from "./FilmsContainer";

const FilmsSection = () => {
  const [loading, setLoading] = useState(true);
  const [showings, setShowings] = useState<UnsortedFilmType[]>([]);
  const [cinemas, setCinemas] = useState<CinemaType[]>([]);
  const storedDisplayBy: DisplayByType | null = localStorage.getItem("displayBy") as DisplayByType | null;
  const [displayBy, setDisplayBy] = useState<DisplayByType>(storedDisplayBy || "cinema");
  const storedSelectedCinemas = localStorage.getItem("selectedCinemas");
  const [selectedCinemas, setSelectedCinemas]  = useState<string[]>(storedSelectedCinemas ? JSON.parse(storedSelectedCinemas) : []);

  const getData = <T extends FetchedDataType>(
    url: string, 
    setData: React.Dispatch<React.SetStateAction<T>>,
    retries = 0
  ) => {
    axios.get<T>(url)
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
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
  };

  const setAndStoreDisplayBy = (selectedDisplayBy: DisplayByType) => {
    setDisplayBy(selectedDisplayBy);
    localStorage.setItem("displayBy", selectedDisplayBy);
  }

  useEffect(() => {
    if (selectedCinemas.length) return;
    const cinemaTowns = getCinemaTowns(cinemas);
    setSelectedCinemas(cinemaTowns);
  }, [cinemas, selectedCinemas.length]);
  
  useEffect(() => {
    const baseUrl = import.meta.env.VITE_BASEURL;
    getData(`${baseUrl}/search`, setShowings);
    getData(`${baseUrl}/cinemas`, setCinemas);
  }, []);

  if (loading) {
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
            selectedCinemas={selectedCinemas}
            setSelectedCinemas={setSelectedCinemas}
          />
        </div>
        <FilmsContainer displayBy={displayBy} showings={showings} selectedCinemas={selectedCinemas} />
      </div>
    </div>
  )
}

export default FilmsSection;
