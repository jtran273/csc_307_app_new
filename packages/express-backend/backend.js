import express from "express";

const app = express();
const port = 8000;

// Middleware to parse incoming JSON requests
app.use(express.json());

// Hardcoded user data
const users = {
    users_list: [
        { id: "xyz789", name: "Charlie", job: "Janitor" },
        { id: "abc123", name: "Mac", job: "Bouncer" },
        { id: "ppp222", name: "Mac", job: "Professor" },
        { id: "yat999", name: "Dee", job: "Aspiring actress" },
        { id: "zap555", name: "Dennis", job: "Bartender" }
    ]
};

// Root route (existing Hello World route)
app.get("/", (req, res) => {
    res.send("Hello World!");
});

// New /users route to return the hardcoded user data
app.get("/users", (req, res) => {
  const name = req.query.name;
  if (name) {
      const result = { users_list: findUserByName(name) };
      res.send(result);
  } else {
      res.send(users);
  }
});

app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  const user = findUserById(id);
  if (user) {
      res.send(user);
  } else {
      res.status(404).send("Resource not found.");
  }
});



// Start the server and listen on the defined port
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

const findUserByName = (name) => {
  return users["users_list"].filter(user => user["name"] === name);
};


const findUserById = (id) => {
  return users["users_list"].find(user => user["id"] === id);
};

const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd);
  res.status(201).send();
});
