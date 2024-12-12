const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const { Pool } = require('pg');
const app = express();
const port = 3000;

app.use(bodyParser.json());

// Configuración de la base de datos
const pool = new Pool({
  user: 'tu_usuario',
  host: 'localhost',
  database: 'tu_base_de_datos',
  password: 'tu_contraseña',
  port: 5432,
});

// Configuración de multer para la carga de archivos
const upload = multer({ dest: 'uploads/' });

// Ruta para verificar usuarios
app.post('/login', async (req, res) => {
  const { nombreCompleto, numeroLegajo } = req.body;
  const result = await pool.query('SELECT * FROM usuarios WHERE nombre_completo = $1 AND numero_legajo = $2', [nombreCompleto, numeroLegajo]);

  if (result.rows.length > 0) {
    res.status(200).send('Usuario autenticado');
  } else {
    res.status(401).send('Autenticación fallida');
  }
});

// Ruta para cargar archivos
app.post('/upload', upload.single('file'), (req, res) => {
  const file = req.file;
  // Aquí iría la lógica para procesar el archivo y almacenarlo en la base de datos
  res.status(200).send('Archivo subido exitosamente');
});

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
