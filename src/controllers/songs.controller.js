// controllers/songs.controller.js
const fs = require('fs');
const path = require('path');
const repertorioPath = path.join(__dirname, '../repertorio.json');

// Función para obtener todas las canciones
const getSongs = (req, res) => {
  fs.readFile(repertorioPath, 'utf8', (err, data) => {
    if (err) return res.status(500).send("Error al leer el repertorio");
    res.json(JSON.parse(data));
  });
};

// Función para agregar una nueva canción
const addSong = (req, res) => {
  const newSong = req.body;
  fs.readFile(repertorioPath, 'utf8', (err, data) => {
    if (err) return res.status(500).send("Error al leer el repertorio");

    const songs = JSON.parse(data);
    newSong.id = Math.floor(Math.random() * 9999); // Genera un ID aleatorio.
    songs.push(newSong);

    fs.writeFile(repertorioPath, JSON.stringify(songs), (err) => {
      if (err) return res.status(500).send("Error al guardar la canción");
      res.status(201).send("Canción agregada al repertorio");
    });
  });
};

// Función para editar una canción existente
const updateSong = (req, res) => {
  const id = parseInt(req.params.id);
  const updatedSong = req.body;

  fs.readFile(repertorioPath, 'utf8', (err, data) => {
    if (err) return res.status(500).send("Error al leer el repertorio");

    let songs = JSON.parse(data);
    const index = songs.findIndex((song) => song.id === id);

    if (index === -1) return res.status(404).send("Canción no encontrada");

    songs[index] = { ...songs[index], ...updatedSong };

    fs.writeFile(repertorioPath, JSON.stringify(songs), (err) => {
      if (err) return res.status(500).send("Error al actualizar la canción");
      res.send("Canción actualizada");
    });
  });
};

// Función para eliminar una canción existente
const deleteSong = (req, res) => {
  const id = parseInt(req.params.id);

  fs.readFile(repertorioPath, 'utf8', (err, data) => {
    if (err) return res.status(500).send("Error al leer el repertorio");

    let songs = JSON.parse(data);
    const index = songs.findIndex((song) => song.id === id);

    if (index === -1) return res.status(404).send("Canción no encontrada");

    songs.splice(index, 1);

    fs.writeFile(repertorioPath, JSON.stringify(songs), (err) => {
      if (err) return res.status(500).send("Error al eliminar la canción");
      res.send("Canción eliminada");
    });
  });
};

module.exports = {
  getSongs,
  addSong,
  updateSong,
  deleteSong
};
