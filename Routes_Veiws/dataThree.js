const express = require("express");
const router = express.Router();
const mtgBoosterPacks = require("../Data/dataThree");

// GET /mtgBoosterPacks
router.get("/", (req, res) => {
  res.json(mtgBoosterPacks);
});

// GET /mtgBoosterPacks/:id
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const pack = mtgBoosterPacks.find((pack) => pack.id === id);
  if (pack) {
    res.json(pack);
  } else {
    res.status(404).json({ error: "Pack not found" });
  }
})

// Export router
module.exports = router;
