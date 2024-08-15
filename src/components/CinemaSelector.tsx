import { useState, useRef } from "react";

import { getCinemaTowns } from "../utilities";

import { CinemaType } from "../types";

type CinemaSelectorProps = {
  cinemas: CinemaType[],
  setSelectedCinemas: React.Dispatch<React.SetStateAction<string[]>>;
}

const CinemaSelector = ({ cinemas, setSelectedCinemas }: CinemaSelectorProps) => {
  const [showCinemas, setShowCinemas]  = useState(false);
  const cinemaListRef = useRef<HTMLUListElement>(null);
  const cinemaTowns = getCinemaTowns(cinemas);

  const handleDeselect = () => {
    if (cinemaListRef.current) {
      const cinemas = [...cinemaListRef.current.querySelectorAll<HTMLInputElement>(".cinema-selector-input")];
      const allSelected = cinemas.every(cinema => cinema.checked);
      cinemas.forEach(cinema => cinema.checked = !allSelected);
    }
  }

  const handleSearchCinemas = () => {
    if (cinemaListRef.current) {
      const cinemas = [...cinemaListRef.current.querySelectorAll<HTMLInputElement>(".cinema-selector-input")];
      const currentlySelected = cinemas
        .filter(cinema => cinema.checked)
        .map(cinema => cinema.id);
      setSelectedCinemas(currentlySelected);
    }
  }

  return (
    <>
      <div className="cinema-selector-dropdown" onClick={() => setShowCinemas(prev => !prev)}>
        {showCinemas ? "Hide cinemas" : "Show cinemas"}
      </div>
      <div className={`cinema-selector-container ${showCinemas ? "" : "cinema-selector-container-hide"}`}>
        <div className="cinema-selector-list-container">
          <ul className="cinema-selector-list" ref={cinemaListRef}>
            {cinemaTowns.map(cinemaTown => {
              return (
                <li className="cinema-selector-list-item" key={cinemaTown}>
                  <input className="cinema-selector-input" type="checkbox" id={cinemaTown} value={cinemaTown} defaultChecked />
                  <label className="cinema-selector-bubble" htmlFor={cinemaTown}>
                    {cinemaTown}
                  </label>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="cinema-selector-btn-container">
          <button className="btn btn-select-cinemas" onClick={handleDeselect}>Select / deselect all</button>
          <button className="btn btn-search" onClick={handleSearchCinemas}>Search</button>
        </div>
      </div>
    </>
  )
}

export default CinemaSelector;
