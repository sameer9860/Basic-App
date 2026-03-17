const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
});

let users = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
];

// Create
app.post("/users", (req, res) => {
  const newUser = {
    id: users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1,
    name: req.body.name,
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Read
app.get("/users", (req, res) => res.json(users));

app.get("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send("User not found");
  res.json(user);
});

// Update
app.put("/users/:id", (req, res) => {
  const index = users.findIndex((u) => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send("User not found");
  users[index] = { ...users[index], ...req.body };
  res.json(users[index]);
});

// Delete
app.delete("/users/:id", (req, res) => {
  users = users.filter((u) => u.id !== parseInt(req.params.id));
  res.status(204).send();
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
