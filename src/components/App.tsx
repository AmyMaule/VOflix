import FilmsSection from "./FilmsSection";
import Hero from "./Hero";

const App = () => {
  return (
    <div className="app-container">
      <Hero />
      <FilmsSection />
      <a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer">
        <img src="TMDB-logo.svg" className="tmdb-logo" />
      </a>
    </div>
  )
}

export default App;
