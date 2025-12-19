const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();

app.get("/", (req, res) => {
  res.send("Cloud API is live 🚀");
});

const client = new MongoClient(process.env.MONGODB_URI);

async function startServer() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("test");
    const users = db.collection("users");

    app.get("/users/:id", async (req, res) => {
      const user = await users.findOne({ id: Number(req.params.id) });
      res.send(user || { message: "User not found" });
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

startServer();
