const express = require('express');
const axios = require('axios');
require('dotenv').config(); // Cargar variables de entorno desde .env
const app = express();
const port = 3000;

// Middleware para servir archivos estáticos
app.use(express.static('public'));

// Middleware para analizar el cuerpo de las solicitudes JSON
app.use(express.json());

// Ruta para buscar producto por tipo
app.get('/api/productos/:type', async (req, res) => {
  const type = req.params.type.toLowerCase();

  try {
    // Realizar la solicitud a la API externa
    const response = await axios.get('http://petstore.execute-api.us-east-1.amazonaws.com/petstore/pets', {
      headers: { 'Authorization': `Bearer ${process.env.API_KEY}` }
    });

    // Buscar el producto por tipo
    const product = response.data.find(p => p.type.toLowerCase() === type);

    if (product) {
      res.json(product);
    } else {
      res.status(404).send('Producto no encontrado');
    }
  } catch (error) {
    res.status(500).send('Error fetching data');
  }
});

// Ruta para agregar un nuevo producto
app.post('/api/productos', async (req, res) => {
  const { type, price } = req.body;

  if (!type || !price) {
    return res.status(400).send('Tipo y precio son requeridos');
  }

  try {
    // Crear un nuevo producto con ID autoincremental
    const response = await axios.get('http://petstore.execute-api.us-east-1.amazonaws.com/petstore/pets', {
      headers: { 'Authorization': `Bearer ${process.env.API_KEY}` }
    });

    const products = response.data;
    const newId = products.length ? products[products.length - 1].id + 1 : 1;

    const newProduct = { id: newId, type, price };

    // Enviar el nuevo producto a la API de AWS
    await axios.post('http://petstore.execute-api.us-east-1.amazonaws.com/petstore/pets', newProduct, {
      headers: { 'Authorization': `Bearer ${process.env.API_KEY}`, 'Content-Type': 'application/json' }
    });

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).send('Error al agregar el producto');
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
