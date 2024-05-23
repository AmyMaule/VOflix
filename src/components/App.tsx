import Hero from "./Hero";
import Movies from "./FilmInfo";
import Navbar from "./Navbar";

const App = () => {
  return (
    <div className="app-container">
      <Navbar />
      <Hero />
      <Movies />
    </div>
  )
}

export default App;
