import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-container">
      <div className="footer-copyright">
        <span className="footer-copyright-symbol">&copy;</span>
        VOflix {currentYear}
      </div>
      <Link to="/contact" className="footer-link">Contact Us</Link>
    </footer>
  )
}

export default Footer;
