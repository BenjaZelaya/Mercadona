import React from 'react'
import '../Style/Footer.css'
import { FaInstagram, FaFacebookF, FaTwitter } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__content">
        <h2 className="footer__logo">🛒 Mercadona</h2>

        <p className="footer__text">
          Tu tienda online de confianza. Comprá fácil, rápido y seguro desde casa.
        </p>

        <div className="footer__social">
          <a href="#" className="footer__icon"><FaFacebookF /></a>
          <a href="#" className="footer__icon"><FaInstagram /></a>
          <a href="#" className="footer__icon"><FaTwitter /></a>
        </div>

        <p className="footer__copy">© {new Date().getFullYear()} Mercadona. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}

export default Footer