const express = require('express');
const cors = require('cors');
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Rutas
const routerApidoc = require('./routes/apidocs');
const routerTareas = require('./routes/tareas');
const routeRules = require('./routes/rules');

app.use('/', routerApidoc);
app.use('/api/tareas', routerTareas);
app.use('/api/rules',routeRules)

// Inicia el servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});
