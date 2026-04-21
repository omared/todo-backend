const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/tasks', require('./routes/tasks'));

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Conectado a MongoDB Atlas');
    app.listen(process.env.PORT || 3000, () => {
      console.log('🚀 Servidor corriendo en puerto 3000');
    });
  })
  .catch(err => console.error('❌ Error de conexión:', err));