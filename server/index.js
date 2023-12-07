// server/index.js
const path = require('path');
const express = require('express');

...

// Hacer que node sirva los archivos de nuestro app React
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Manejar las peticiones GET en la ruta /api
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// Todas las peticiones GET que no hayamos manejado en las líneas anteriores retornaran nuestro app React
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});
