const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Datos de ejemplo (deberías usar una base de datos)
const users = [
  { username: 'admin', password: bcrypt.hashSync('12345', 8) }, // Contraseña cifrada
];

// Clave secreta para JWT
const SECRET_KEY = 'mi_clave_secreta';

// Ruta de inicio de sesión
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }

  const token = jwt.sign({ username: user.username }, SECRET_KEY, {
    expiresIn: '1h', // El token expira en 1 hora
  });

  res.json({ token });
});

// Ruta protegida (requiere token)
app.get('/protected', (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    res.json({ message: 'Acceso permitido', user });
  });
});

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor ejecutándose en http://localhost:${PORT}`));
