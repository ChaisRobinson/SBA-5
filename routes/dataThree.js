const express = require("express");
const router = express.Router();
const mtgBoosterPacks = require("../Data/dataThree");

// GET /mtgBoosterPacks
router.get("/mtgBoosterPacks", (req, res) => {
  res.json(mtgBoosterPacks);
});

// Export router
module.exports = router;
