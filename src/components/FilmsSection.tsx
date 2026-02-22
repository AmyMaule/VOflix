import { useState } from "react";
import { useFilmsData } from "../hooks/useFilmsData";
import { DisplayByType } from "../types";

import CinemaSelector from "./CinemaSelector";
import FilmsContainer from "./FilmsContainer";

const FilmsSection = () => {
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const storedDisplayBy: DisplayByType | null = localStorage.getItem("displayBy") as DisplayByType | null;
  const [displayBy, setDisplayBy] = useState<DisplayByType>(storedDisplayBy || "cinema");
  const storedSelectedCinemas = localStorage.getItem("selectedCinemas");
  const [selectedCinemas, setSelectedCinemas] = useState<string[]>(storedSelectedCinemas ? JSON.parse(storedSelectedCinemas) : []);
  const [searchSelectedCinemas, setSearchSelectedCinemas] = useState<string[]>(storedSelectedCinemas ? JSON.parse(storedSelectedCinemas) : []);
  
  const { allFilmData, showings, cinemas } = useFilmsData();
  
  const setAndStoreDisplayBy = (selectedDisplayBy: DisplayByType) => {
    setDisplayBy(selectedDisplayBy);
    localStorage.setItem("displayBy", selectedDisplayBy);
  }

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
            setSearchSelectedCinemas={setSearchSelectedCinemas}
          />
        </div>
        <FilmsContainer
          allFilmData={allFilmData}
          cinemas={cinemas}
          displayBy={displayBy}
          errors={errors}
          showings={showings}
          searchSelectedCinemas={searchSelectedCinemas}
        />
      </div>
    </div>
  )
}

export default FilmsSection;
