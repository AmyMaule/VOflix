import FilmsSection from "./FilmsSection";
import Footer from "./Footer";
import Hero from "./Hero";
import Navbar from "./Navbar";

const App = () => {
  return (
    <div className="app-container">
      <Navbar />
      <Hero />
      <FilmsSection />
      <Footer />
    </div>
  )
}

export default App;
