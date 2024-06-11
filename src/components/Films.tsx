import { useEffect, useState } from "react";
import axios from "axios";

import ShowingsByCinema from "./ShowingsByCinema";

const Films = () => {
  const [showings, setShowings] = useState([]);
  const [displayBy, setDisplayBy] = useState<"cinema" | "film">("cinema");

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASEURL}/search`)
    .then((res) =>  {
      setShowings(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);

  if (!showings.length) return null;

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
