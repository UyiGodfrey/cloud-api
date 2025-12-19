const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Cloud API is live 🚀");
});

app.get("/users/:id", (req, res) => {
  res.send({ id: req.params.id });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
