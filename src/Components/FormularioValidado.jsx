
import { useState } from 'react';
import { Button, Form, Container, Card } from 'react-bootstrap';
import '../Style/FormularioValidado.css';
import { useNavigate } from 'react-router-dom';

const FormularioValidado = () => {
  const [formValues, setFormValues] = useState({
    user: '',
    email: '',
    password: '',
    password2: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const navigate = useNavigate();
  const usersLS = JSON.parse(localStorage.getItem('users')) || [];

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const sendForm = (ev) => {
    ev.preventDefault();
    const { user, email, password, password2 } = formValues;

    if (!user || !email || !password || !password2) {
      setFormValues({
        ...formValues,
        user: !user ? 'error' : user,
        email: !email ? 'error' : email,
        password: !password ? 'error' : password,
        password2: !password2 ? 'error' : password2
      });
      return;
    }

    if (password !== password2) {
      alert('Las contraseñas no coinciden');
      return;
    }

    const existingUser = usersLS.find((usuario) => usuario.nombreUsuario === user);
    if (existingUser) {
      alert('El usuario ya existe');
      return;
    }

    const newUser = {
      id: usersLS.length ? usersLS[usersLS.length - 1].id + 1 : 1,
      nombreUsuario: user,
      email,
      password,
      login: true,
      deleted: false,
      role: 'user'
    };

    usersLS.push(newUser);
    localStorage.setItem('users', JSON.stringify(usersLS));
    alert('Usuario registrado');

    setTimeout(() => {
      navigate('/Admin');
    }, 1000);
  };

  return (
    <div className="register-bg">
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Card className="p-4 shadow-lg w-100" style={{ maxWidth: '500px' }}>
          <h2 className="text-center mb-4">Registro</h2>
          <Form onSubmit={sendForm}>
            <Form.Group className="mb-3" controlId="formUser">
              <Form.Label>Usuario</Form.Label>
              <Form.Control type="text" placeholder="Ingrese su nombre" name="user" onChange={handleChange}
                className={formValues.user === 'error' ? 'is-invalid' : ''} />
              {formValues.user === 'error' && (
                <div className="invalid-feedback">El usuario es obligatorio</div>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Correo</Form.Label>
              <Form.Control type="email" placeholder="Ingrese su correo" name="email" onChange={handleChange}
                className={formValues.email === 'error' ? 'is-invalid' : ''} />
              {formValues.email === 'error' && (
                <div className="invalid-feedback">El email es obligatorio</div>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Contraseña</Form.Label>
              <div className="d-flex">
                <Form.Control type={showPassword ? 'text' : 'password'} placeholder="Ingrese su contraseña"
                  name="password" onChange={handleChange}
                  className={formValues.password === 'error' ? 'is-invalid' : ''} />
                <Button variant="outline-secondary" onClick={() => setShowPassword(!showPassword)} className="ms-2">
                  {showPassword ? 'Ocultar' : 'Mostrar'}
                </Button>
              </div>
              {formValues.password === 'error' && (
                <div className="invalid-feedback d-block">La contraseña es obligatoria</div>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword2">
              <Form.Label>Confirmar contraseña</Form.Label>
              <div className="d-flex">
                <Form.Control type={showPassword2 ? 'text' : 'password'} placeholder="Confirme su contraseña"
                  name="password2" onChange={handleChange}
                  className={formValues.password2 === 'error' ? 'is-invalid' : ''} />
                <Button variant="outline-secondary" onClick={() => setShowPassword2(!showPassword2)} className="ms-2">
                  {showPassword2 ? 'Ocultar' : 'Mostrar'}
                </Button>
              </div>
              {formValues.password2 === 'error' && (
                <div className="invalid-feedback d-block">El confirmar contraseña es obligatorio</div>
              )}
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Registrarse
            </Button>
          </Form>
        </Card>
      </Container>
    </div>
  );
};

export default FormularioValidado;
