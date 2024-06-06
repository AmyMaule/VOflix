import { useEffect, useState } from "react";
import axios from "axios";

import ShowingsByCinema from "./ShowingsByCinema";

const Films = () => {
  const [showings, setShowings] = useState([]);

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
        {/* Display by film */}

        {/* Display by cinema */}
        <ShowingsByCinema showings={showings} />
      </div>
    </div>
  )
}

export default Films;
