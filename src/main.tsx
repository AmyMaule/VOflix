import ReactDOM from 'react-dom/client';
import './assets/scss/index.scss';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes
} from "react-router-dom";

import App from './components/App.tsx';
import Contact from './components/Contact.tsx';
import Footer from './components/Footer.tsx';
import Navbar from './components/Navbar.tsx';

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <BrowserRouter>
    <div className="page-container">
      <Navbar/>
      <Routes>
        <Route path="/" element={<App />}/>
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
      <Footer />
    </div>
  </BrowserRouter>
);
