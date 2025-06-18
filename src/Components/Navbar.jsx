import React from 'react';
import '../Style/Navbar.css';
import { FaShoppingCart } from 'react-icons/fa'

const Navbar = () => {
    return (
     <header className="navbar">
      <div className="navbar__logo">🛒 Mercadona</div>

      <nav className="navbar__menu">
        <a href="#" className="navbar__link">Inicio</a>
        <a href="#" className="navbar__link">Productos</a>
        <a href="#" className="navbar__link">Ofertas</a>
        <a href="#" className="navbar__link">Contacto</a>
        <a href="/registrarse" className='navbar__link'>Registrarse</a>
        <a href="#" className='navbar__link'>Iniciar Sesion</a>
      </nav>

      <div className="navbar__cart">
        <FaShoppingCart className="navbar__cart-icon" />
        <span className="navbar__cart-count">3</span>
      </div>
    </header>
    );
};

export default Navbar;