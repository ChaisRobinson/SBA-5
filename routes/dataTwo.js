const express = require("express");
const router = express.Router();
const yugiohBoosterPacks = require("../Data/dataTwo");

// Serve static files from the styles directory
router.use(express.static("./styles"));

// Require the filesystem module
const fs = require("fs");

// Define the template engine
router.engine("yu_gi_oh", (filePath, options, callback) => {
  fs.readFile(filePath, (err, content) => {
    if (err) return callback(err);

    // Here, we take the content of the template file,
    // convert it to a string, and replace sections of
    // it with the values being passed to the engine.
    const rendered = content
      .toString()
      .replace("#title#", `${options.title}`)
      .replace("#content#", `${options.renderContent()}`);

    return callback(null, rendered);
  });
});

router.set("views", "./views"); // Specify the views directory
router.set("view engine", "yu_gi_oh"); // Register the template engine

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