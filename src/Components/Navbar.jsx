import React, { useState } from 'react';
import '../Style/Navbar.css';
import { FaShoppingCart } from 'react-icons/fa';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // (Opcional) sonido al salir
    // const sound = new Audio('/sounds/logout.mp3');
    // sound.play();

    // limpiar sesión (si guardás algo)
    localStorage.removeItem('user'); // o 'users', 'login', etc.

    setShowModal(false);

    // esperar un poco para que suene o animación
    setTimeout(() => {
      navigate('/Welcome');
    }, 500);
  };

  return (
    <>
      <header className="navbar">
        <div className="navbar__logo">🛒 Mercadona</div>

        <nav className="navbar__menu">
          <a href="/Inicio" className="navbar__link">Inicio</a>
          <a href="#" className="navbar__link">Ofertas</a>
          <a href="/Admin" className="navbar__link">Admin</a>
        </nav>

        <div className="navbar__actions">
          <a href="/Carrito" className="text-light fs-4 me-3">
            <FaShoppingCart />
          </a>
          <button className="navbar__logout-btn" onClick={() => setShowModal(true)}>
            Cerrar sesión
          </button>
        </div>
      </header>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton className="bg-dark text-white">
          <Modal.Title>¿Estás seguro?</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-white">
          Esta página ha sido maravillosa... <br />
          <strong>¿De verdad querés irte?</strong>
        </Modal.Body>
        <Modal.Footer className="bg-dark">
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Me quedo 😌
          </Button>
          <Button variant="danger" onClick={handleLogout}>
            Sí, quiero irme 💀
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Navbar;
