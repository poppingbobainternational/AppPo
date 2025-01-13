require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const admin = require('firebase-admin');
const expressLayouts = require('express-ejs-layouts'); // Asegúrate de requerir express-ejs-layouts

// Inicializar Firebase Admin
const serviceAccount = require('./firebase-credentials.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://<tu-proyecto>.firebaseio.com"
});

const db = admin.firestore();

const app = express();
const port = 3001;

// Configurar EJS y layouts
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts); // Usar express-ejs-layouts
app.set('layout', 'layout'); // Establece 'layout.ejs' como plantilla base

app.use(express.static(path.join(__dirname, 'public')));

// Configurar body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Importar rutas
const inventoryRoutes = require('./src/routes/inventoryRoutes');
const profileRoutes = require('./src/routes/profileRoutes');

// Rutas principales
app.use('/inventarios', inventoryRoutes);
app.use('/perfil', profileRoutes);

app.get('/', (req, res) => {
  res.render('index', { title: 'Dashboard Siigo-Firebase', companyName: 'Mi Empresa' });
});

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).render('404', { title: 'Página no encontrada' });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

module.exports = db;
