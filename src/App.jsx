import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Inicio from './Pages/Inicio'
import Registrarse from './Pages/Registrarse'
import IniciarSesion from './Pages/IniciarSesion'
import Tabla from './Pages/Tabla'
import Admin from './Pages/Admin'
import Carrito from './Pages/Carrito'
import './App.css'
import Footer from './Components/Footer'

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/Inicio" element={<Inicio />} />
        <Route path="/registrarse" element={<Registrarse />} />
        <Route path = "/IniciarSesion" element={<IniciarSesion/>} />
        <Route path="/Tabla" element={<Tabla />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/Carrito" element={<Carrito />} />
      </Routes>
    </Router>
    <Footer/>
    </>
  )
}

export default App

