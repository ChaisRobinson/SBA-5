const express = require("express");
const router = express.Router();
const pokemonBoosterPacks = require("../Data/dataOne");

// GET /api/pokemon
router.get("/", (req, res) => {
  res.json(pokemonBoosterPacks);
});

// GET /api/pokemon/:id
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const pokemon = pokemonBoosterPacks.find((pack) => pack.id === id);
  if (pokemon) {
    res.json(pokemon);
  } else {
    res.status(404).json({ error: "Pokemon not found" });
  }
});

// POST /api/pokemon
router.post("/", (req, res) => {
  const { name, price } = req.body;
  const newPokemon = { id: pokemonBoosterPacks.length + 1, name, price };
  pokemonBoosterPacks.push(newPokemon);
  res.status(201).json(newPokemon);
});

// PUT /api/pokemon/:id
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name, price } = req.body;
  const index = pokemonBoosterPacks.findIndex((pack) => pack.id === id);
  if (index !== -1) {
    pokemonBoosterPacks[index] = { id, name, price };
    res.json(pokemonBoosterPacks[index]);
  } else {
    res.status(404).json({ error: "Pokemon not found" });
  }
});

// DELETE /api/pokemon/:id
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = pokemonBoosterPacks.findIndex((pack) => pack.id === id);
  if (index !== -1) {
    pokemonBoosterPacks.splice(index, 1);
    res.sendStatus(204);
  } else {
    res.status(404).json({ error: "Pokemon not found" });
  }
});

module.exports = router;