const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

const filePath = path.join(__dirname, 'products.json');

// GET todos los productos
app.get('/products', (req, res) => {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  res.json(data);
});

// POST producto
app.post('/products', (req, res) => {
  const products = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const newProduct = req.body;
  newProduct.id = Date.now();
  products.push(newProduct);
  fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
  res.status(201).json(newProduct);
});

// DELETE producto
app.delete('/products/:id', (req, res) => {
  const products = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const filtered = products.filter(p => p.id !== Number(req.params.id));
  fs.writeFileSync(filePath, JSON.stringify(filtered, null, 2));
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
