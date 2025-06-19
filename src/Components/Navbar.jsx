import React from 'react';
import '../Style/Navbar.css';
import { FaShoppingCart } from 'react-icons/fa'

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar__logo">🛒 Mercadona</div>

      <nav className="navbar__menu">
        <a href="/" className="navbar__link">Inicio</a>
        <a href="/Tabla" className="navbar__link">Tabla</a>
        <a href="#" className="navbar__link">Ofertas</a>
        <a href="/Admin" className="navbar__link">Admin</a>
        <a href="/registrarse" className='navbar__link'>Registrarse</a>
        <a href="/IniciarSesion" className='navbar__link'>Iniciar Sesion</a>
      </nav>

      <div className="navbar__cart">
        <a href="/Carrito"  className="text-light fs-4">
          <FaShoppingCart />
        </a>
      </div>
    </header>
  );
};

export default Navbar;