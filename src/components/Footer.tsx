const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-container">
      <div className="footer-copyright">
        <span className="footer-copyright-symbol">&copy;</span>
        VOflix {currentYear}
      </div>
    </footer>
  )
}

export default Footer;
