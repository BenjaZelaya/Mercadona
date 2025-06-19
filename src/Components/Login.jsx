import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({ user: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
    setError(''); // limpia error al cambiar
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { user, password } = credentials;

    if (!user || !password) {
      setError('Todos los campos son obligatorios');
      return;
    }

    const usersLS = JSON.parse(localStorage.getItem('users')) || [];
    const foundUser = usersLS.find(
      (u) => u.nombreUsuario === user && u.password === password
    );

    if (!foundUser) {
      setError('Usuario o contraseña incorrectos');
      return;
    }

    // Opcional: marcar usuario como logueado en localStorage
    foundUser.login = true;
    const updatedUsers = usersLS.map((u) =>
      u.nombreUsuario === user ? foundUser : u
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    navigate('/Admin'); // redirigir a página de usuario
  };

  return (
    <div className="login container mt-4" style={{ maxWidth: '400px' }}>
      <h2 className="mb-4">Iniciar Sesión</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="loginUser">
          <Form.Label>Usuario</Form.Label>
          <Form.Control
            type="text"
            name="user"
            placeholder="Ingrese su usuario"
            value={credentials.user}
            onChange={handleChange}
            autoComplete="username"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="loginPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Ingrese su contraseña"
            value={credentials.password}
            onChange={handleChange}
            autoComplete="current-password"
          />
        </Form.Group>

        {error && <div className="alert alert-danger">{error}</div>}

        <Button variant="primary" type="submit" className="w-100">
          Iniciar Sesión
        </Button>
      </Form>
    </div>
  );
};

export default Login;
