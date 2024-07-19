import { useState, useRef } from "react";

import { CinemaType } from "../types";

type CinemaSelectorProps = {
  cinemas: CinemaType[]
}

const CinemaSelector = ({ cinemas }: CinemaSelectorProps) => {
  const [showCinemas, setShowCinemas]  = useState(false);
  const cinemaListRef = useRef<HTMLUListElement>(null);

  // Get unique cinema towns
  const cinemaTowns =  [... new Set(cinemas.map(cinema => cinema.town))];

  const handleDeselect = () => {
    if (cinemaListRef.current) {
      const cinemas = [...cinemaListRef.current.querySelectorAll<HTMLInputElement>(".cinema-selector-input")];
      const allSelected = cinemas.every(cinema => cinema.checked)
      cinemas.forEach(cinema => cinema.checked = !allSelected);
    }
  }

  return (
    <div>
      {/* <h6>Select cinemas:</h6> */}
      {showCinemas
        ? (
          <>
            <div className="cinema-selector-container">
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
              <button className="btn btn-search">Search</button>
            </div>
          </>
        )
        : <div></div>
      }

    </div>
  )
}

export default CinemaSelector;
