const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { sequelize } = require('./src/models');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/productos', require('./src/routes/productos.routes'));
app.use('/api/cotizaciones', require('./src/routes/cotizaciones.routes'));

app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Servidor funcionando' });
});

sequelize.authenticate()
    .then(() => {
        console.log('Conexión con la db exitosa');
        return sequelize.sync({ alter: true });
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Corriendo en http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('Error de conexión:', err);
    });