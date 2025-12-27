import FilmsSection from "./FilmsSection";
import Hero from "./Hero";

// TODO: get generic film poster in case there isn't one, change poster types to only be strings

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
