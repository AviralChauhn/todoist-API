const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.json());
app.use(cors());
require("./app/routes/projects.routes.js")(app);
require("./app/routes/tasks.router.js")(app);
require("./app/routes/comments.router.js")(app);
require("./app/routes/label.router.js")(app);
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
