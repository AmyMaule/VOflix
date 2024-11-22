import { useState, useRef } from "react";
import { Link } from "react-router-dom";

import { getCinemaTowns } from "../utilities";

import { CinemaType } from "../types";

type CinemaSelectorProps = {
  cinemas: CinemaType[],
  selectedCinemas: string[],
  setSelectedCinemas: React.Dispatch<React.SetStateAction<string[]>>;
}

const CinemaSelector = ({ cinemas, selectedCinemas, setSelectedCinemas }: CinemaSelectorProps) => {
  const [showCinemas, setShowCinemas]  = useState(true);
  const cinemaListRef = useRef<HTMLUListElement>(null);
  const cinemaTowns = getCinemaTowns(cinemas);

  const handleDefaultChecked = (cinemaTown: string) => selectedCinemas.includes(cinemaTown) || !selectedCinemas.length;

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

      // Add currentlySelected to local storage for retrieval on next visit
      localStorage.setItem("selectedCinemas", JSON.stringify(currentlySelected));
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
                  <input
                    className="cinema-selector-input"
                    defaultChecked={handleDefaultChecked(cinemaTown)}
                    id={cinemaTown}
                    type="checkbox"
                    value={cinemaTown}
                  />
                  <label className="cinema-selector-bubble" htmlFor={cinemaTown}>
                    {cinemaTown}
                  </label>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="cinema-selector-link-container">
          Don't see your local cinema listed?{"\n"} <Link to="/contact">Contact us</Link> and we'll do our best to add it!
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
