const express = require("express");

const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.json());
require("./app/routes/tasks.routes.js")(app);
const db = require("./app/models");
db.sequelize
  .sync()
  .then(() => {
    console.log("Synced db");
  })
  .catch((err) => {
    console.log("Failed TO Sync");
  });
app.get("/", (req, res) => {
  res.status(201).json({ message: "server started" });
});
app.listen(PORT, () => {
  console.log(`Server Started on port ${PORT}`);
});
