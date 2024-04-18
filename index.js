// Start Express server
const express = require("express");
const app = express();
const port = 3000;

//import data
const pokemonBoosterPacks = require("./Data/dataOne");
const yugiohBoosterPacks = require("./Data/dataTwo");
const mtgBoosterPacks = require("./Data/dataThree");

//import routes
const pokemonRoutes = require("./Routes_Veiws/dataOne");
const yugiohRoutes = require("./Routes_Veiws/dataTwo");
const mtgRoutes = require("./Routes_Veiws/dataThree");
app.use("/pokemonBoosterPacks", pokemonRoutes);
app.use("/yugiohBoosterPacks", yugiohRoutes);
app.use("/mtgBoosterPacks", mtgRoutes);

//Midelware
app.use(express.json());

// Routes
app.use("/pokemonBoosterPacks", (req, res) => {
  res.json(pokemonBoosterPacks);
});

// Home Route
app.get("/", (req, res) => {
  res.send("This is Chais' Card Shop");
});


// Error Route
app.use((req, res) => {
  res.status(404).send("Page not found");
});

// Error Handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Listen on port 3000
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
