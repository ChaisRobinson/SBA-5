// Start Express server
const express = require("express");
const app = express();
process.env.NODE_ENV = "development";
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");

// Import data
const pokemonBoosterPacks = require("./Data/dataOne");
const yugiohBoosterPacks = require("./Data/dataTwo");
const mtgBoosterPacks = require("./Data/dataThree");

// Import routes
const pokemonRoutes = require("./Routes_Veiws/dataOne");
const yugiohRoutes = require("./Routes_Veiws/dataTwo");
const mtgRoutes = require("./Routes_Veiws/dataThree");


// We use the body-parser middleware FIRST so that
// we have access to the parsed data within our routes.
// The parsed data will be located in "req.body".
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

//Midelware
// New logging middleware to help us keep track of
// requests during testing!
app.use((req, res, next) => {
  const time = new Date();

  console.log(
    `-----
  ${time.toLocaleTimeString()}: Received a ${req.method} request to ${req.url}.`
  );
  if (Object.keys(req.body).length > 0) {
    console.log("Containing the data:");
    console.log(`${JSON.stringify(req.body)}`);
  }
  next();
});

//app.use(express.json());

// Mount Routes
app.use("/pokemonBoosterPacks", pokemonRoutes);
app.use("/yugiohBoosterPacks", yugiohRoutes);
app.use("/mtgBoosterPacks", mtgRoutes);


// Yu-Gi-Oh! Template Engine
// Require the filesystem module
const fs = require("fs");

// Define the template engine
app.engine("yu_gi_oh", (filePath, options, callback) => {
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

app.set("views", "./views"); // Specify the views directory
app.set("view engine", "yu_gi_oh"); // Register the template engine
app.use(express.static(__dirname + "/public")); // Serve static files from the styles directory

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
