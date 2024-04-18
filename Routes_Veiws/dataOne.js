const express = require("express");
const router = express.Router();
const pokemonBoosterPacks = require("../Data/dataOne");

// GET /pokemonBoosterPacks
router.get("/pokemonBoosterPacks", (req, res) => {
  res.json(pokemonBoosterPacks);
});

// Export router
module.exports = router;
