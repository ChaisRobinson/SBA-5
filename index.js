// Start Express server
const express = require("express");
const app = express();
const port = 3000;

// Import data
const pokemonBoosterPacks = require("./Data/dataOne");
const yugiohBoosterPacks = require("./Data/dataTwo");
const mtgBoosterPacks = require("./Data/dataThree");

// Import routes
const pokemonRoutes = require("./Routes_Veiws/dataOne");
const yugiohRoutes = require("./Routes_Veiws/dataTwo");
const mtgRoutes = require("./Routes_Veiws/dataThree");


//Midelware
app.use(express.json());

// Mount Routes
app.use("/pokemonBoosterPacks", pokemonRoutes);
app.use("/yugiohBoosterPacks", yugiohRoutes);
app.use("/mtgBoosterPacks", mtgRoutes);


// Home Route
app.get("/", (req, res) => {
  res.send("This is Chais' Card Shop");
});

// 404 Route
app.use((req, res) => {
  res.status(404).send("Page not found");
});

// Error Handler Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Listen on port 3000
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
