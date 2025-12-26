import { useState, useRef, useMemo, Fragment } from "react";
import { Link } from "react-router-dom";

import { getCinemaTowns } from "../utilities";

import { CinemaType, CinemaTownType } from "../types";

type CinemaSelectorProps = {
  cinemas: Record<string, CinemaType>,
  selectedCinemas: string[],
  setErrors: React.Dispatch<React.SetStateAction<Record<string, boolean>>>,
  setSelectedCinemas: React.Dispatch<React.SetStateAction<string[]>>;
}

const CinemaSelector = ({ cinemas, selectedCinemas, setErrors, setSelectedCinemas }: CinemaSelectorProps) => {
  const [showCinemas, setShowCinemas]  = useState(true);
  const [activeDepts, setActiveDepts] = useState<string[]>([]);
  const cinemaListRef = useRef<HTMLDivElement>(null);
  const cinemaTowns = useMemo(() => getCinemaTowns(cinemas), [cinemas]);

  // Select or de-select all visible cinemas (those whose depts are active)
  const handleSelectDeselectVisible = () => {
    const visibleTowns = Object.entries(cinemaTownsGroupedByDept)
      .filter(([dept]) => activeDepts.includes(dept))
      .flatMap(([, towns]) => towns);
      const allSelected = visibleTowns.every(town => selectedCinemas.includes(town));
    
    // If all visible are selected, deselect them, else select them
    setSelectedCinemas(prev =>
      allSelected
        ? prev.filter(town => !visibleTowns.includes(town))
        : [...new Set([...prev, ...visibleTowns])]
    );

    setErrors({ cinemaSelection: false });
  };

  const handleSearchCinemas = () => {
    if (selectedCinemas.length === 0) {
      setErrors({ cinemaSelection: true });
      return;
    }

    // Add selectedCinemas to local storage for retrieval on next visit
    localStorage.setItem(
      "selectedCinemas",
      JSON.stringify(selectedCinemas)
    );

    setErrors({ cinemaSelection: false });
  };

  const groupByDept = (cinemaTowns: CinemaTownType[]) => {
    const townsGroupedByDept: Record<string, string[]> = {};

    for (const { town, dept } of cinemaTowns) {
      if (!townsGroupedByDept[dept]) {
        townsGroupedByDept[dept] = [];
      }
      townsGroupedByDept[dept].push(town);
    }
    return townsGroupedByDept;
  };

  const cinemaTownsGroupedByDept = groupByDept(cinemaTowns);

  const handleSelectDept = (e: React.MouseEvent<HTMLButtonElement>) => {
    const currentDept = e.currentTarget.dataset.id;
    if (!currentDept) return;
    if (activeDepts.includes(currentDept)) {
      setActiveDepts(prevDepts =>
        prevDepts.filter(dept => dept !== currentDept)
      );
    } else {
      setActiveDepts(prevDepts =>
        [...prevDepts, currentDept]
      );
    }
  }

  if (!Object.keys(cinemas).length) {
    return (
      <div className="cinema-selector-link-container cinema-selector-error-container">
        Hmm, something's gone wrong here. Try refreshing the page.
        {"\n"}If that still doesn't work, <Link to="/contact">Contact us</Link> and we'll look into it!
      </div>
    )
  }

  return (
    <>
      <div className="cinema-selector-dropdown" onClick={() => setShowCinemas(prev => !prev)}>
        {showCinemas ? "Hide cinemas" : "Show cinemas"}
      </div>
      <div className={`cinema-selector-container ${showCinemas ? "" : "cinema-selector-container-hide"}`} ref={cinemaListRef}>
        <div className="cinema-selector-depts-section">
          Show cinemas from:
          <div className="cinema-selector-depts-container">
            {Object.keys(cinemaTownsGroupedByDept).map(dept => {
              const towns = cinemaTownsGroupedByDept[dept];
              const selectedCount = towns.filter(town =>
                selectedCinemas.includes(town)
              ).length;
              return (
                  <button
                    className={`bubble department-selector-bubble ${activeDepts.includes(dept) ? "department-selector-bubble-active" : ""}`}
                    onClick={handleSelectDept}
                    data-id={dept}
                    key={dept}
                  >
                    {dept} {selectedCount > 0 && `(${selectedCount})`}
                  </button>
                )
            })}
          </div>
        </div>
        <div className="cinema-selector-towns-container">
          {activeDepts.length === 0 && 
            <div className="cinema-selector-towns-empty">
              No departments selected. Select a department from the list above to see available towns.
            </div>
          }
          {Object.entries(cinemaTownsGroupedByDept).filter(([dept]) => activeDepts.includes(dept))
            .map(([dept, towns]) => (
              <Fragment key={dept}>
                {towns.map(cinemaTown => (
                  <div key={cinemaTown}>
                    <input
                      className="cinema-selector-town-input"
                      checked={selectedCinemas.includes(cinemaTown)}
                      id={cinemaTown}
                      type="checkbox"
                      value={cinemaTown}
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        setSelectedCinemas(prev =>
                          isChecked
                            ? [...prev, cinemaTown]
                            : prev.filter(town => town !== cinemaTown)
                        );
                      }}
                    />
                    <label
                      className="bubble cinema-selector-bubble"
                      htmlFor={cinemaTown}
                    >
                      {cinemaTown}
                    </label>
                  </div>
                ))}
                </Fragment>
            ))}

        </div>
        <div className="cinema-selector-link-container">
          Don't see your local cinema listed?{"\n"} <Link to="/contact">Contact us</Link> and we'll do our best to add it!
        </div>
        <div className="cinema-selector-btn-container">
          <button className="btn btn-select-cinemas" onClick={handleSelectDeselectVisible}>Select / deselect all</button>
          <button className="btn btn-search" onClick={handleSearchCinemas}>Search</button>
        </div>
      </div>
    </>
  )
}

export default CinemaSelector;
