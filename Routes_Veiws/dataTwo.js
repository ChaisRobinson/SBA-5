const express = require("express");
const router = express.Router();
const yugiohBoosterPacks = require("../Data/dataTwo");

// GET /yugiohBoosterPacks
router.get("/yugiohBoosterPacks", (req, res) => {
  res.json(yugiohBoosterPacks);
});

// Export router
module.exports = router;
