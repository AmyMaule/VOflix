import Hero from "./Hero";
import FilmsSection from "./FilmsSection";
import Navbar from "./Navbar";

const App = () => {
  return (
    <div className="app-container">
      <Navbar />
      <Hero />
      <FilmsSection />
    </div>
  )
}

export default App;
