const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// MIDDLEWARES
app.use(cors());
app.use(express.json());

// STATE = fausse base de données
let animes = [
    { id: 1, name: "東京リベンジャーズ", rank: 1, image: "🏍️" },
    { id: 2, name: "The seven deadly sins", rank: 2, image: "⚔️" },
    { id: 3, name: "One piece", rank: 3, image: "🏴‍☠️" },
    { id: 4, name: "My héros academia", rank: 4, image: "💥" },
    { id: 5, name: "Given", rank: 5, image: "🎸" }
  ];


// GET – AFFICHER LES ANIMES
app.get("/api/animes", (req, res) => {
  res.json(animes);
});


// POST – AJOUTER UN ANIME

app.post("/api/animes", (req, res) => {
  const animeAAjouter = req.body;

  // 1. copie de la base de données
  const animesCopy = [...animes];

  // 2. manipulation de la copie
  animeAAjouter.id = Date.now();
  animesCopy.push(animeAAjouter);

  // 3. mise à jour de la base
  animes = animesCopy;

  res.status(201).json(animeAAjouter);
});


// PUT – MODIFIER UN ANIME

app.put("/api/animes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const newData = req.body;

  // 1. copie
  const animesCopy = [...animes];

  // 2. modification
  const animeIndex = animesCopy.findIndex(a => a.id === id);
  if (animeIndex === -1) {
    return res.status(404).json({ error: "Animé non trouvé" });
  }

  animesCopy[animeIndex] = {
    ...animesCopy[animeIndex],
    ...newData
  };

  // 3. mise à jour
  animes = animesCopy;

  res.json(animesCopy[animeIndex]);
});


// DELETE – SUPPRIMER UN ANIME

app.delete("/api/animes/:id", (req, res) => {
  const id = parseInt(req.params.id);

  // 1. copie
  const animesCopy = [...animes];

  // 2. filtrage
  const animesUpdated = animesCopy.filter(a => a.id !== id);

  // 3. mise à jour
  animes = animesUpdated;

  res.json({ message: "Animé supprimé" });
});

// SERVEUR
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});