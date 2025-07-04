import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Inicio from './Pages/Inicio'
import Registrarse from './Pages/Registrarse'
import IniciarSesion from './Pages/IniciarSesion'
import Admin from './Pages/Admin'
import './App.css'
import Welcome from './Pages/Welcome'

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/Welcome" element={<Welcome />} />
        <Route path="/Inicio" element={<Inicio />} />
        <Route path="/registrarse" element={<Registrarse />} />
        <Route path = "/IniciarSesion" element={<IniciarSesion/>} />
        <Route path="/Admin" element={<Admin />} />
      </Routes>
    </Router>
    </>
  )
}

export default App

