const express = require("express");
const router = express.Router();
const yugiohBoosterPacks = require("../Data/dataTwo");

// Serve static files from the styles directory
router.use(express.static("./styles"));

// Require the filesystem module
const fs = require("fs");

// GET /yugiohBoosterPacks
router.get("/", (req, res) => {
  const options = {
    title: "Yu-Gi-Oh! Booster Packs",
    renderContent: () => {
      let content = "";
      yugiohBoosterPacks.forEach((pack) => {
        content += `
          <div class="booster">
            <h2>${pack.name}</h2>
            <p>Price: $${pack.price}</p>
          </div>
        `;
      });
      return content;
    },
  };
  res.render("index", options);
});



module.exports = router;