const { Router } = require('express');
const path = require('path');
const { handleGetUsers } = require('../controllers/users.controller');
const {
  getSongs,
  addSong,
  updateSong,
  deleteSong
} = require('../controllers/songs.controller');

const router = Router();

// Ruta para servir el archivo HTML
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/../index.html'));
});

// Ruta para obtener todos los usuarios (ejemplo previo)
router.get('/users', handleGetUsers);

// Ruta para obtener todas las canciones
router.get('/canciones', getSongs);

// Ruta para agregar una nueva canción
router.post('/canciones', addSong);

// Ruta para actualizar una canción
router.put('/canciones/:id', updateSong);

// Ruta para eliminar una canción
router.delete('/canciones/:id', deleteSong);

module.exports = router;

