const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const { defaultMaxListeners } = require("events");
const router = require("./routes");

const PORT = process.env.PORT || 3001;
const app = express();
dotenv.config();

// Node serves the files for the React app
app.use(express.static(path.resolve(__dirname, "../client/build")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api", router);

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
