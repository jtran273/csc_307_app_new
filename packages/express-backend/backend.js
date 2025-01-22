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

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/users", (req, res) => {
  const { name, job } = req.query; 
  let filteredUsers = users["users_list"];

  if (name) {
      filteredUsers = filteredUsers.filter(user => user.name === name); // Filter by name
  }
  if (job) {
      filteredUsers = filteredUsers.filter(user => user.job === job); // Filter by job
  }

  res.send({ users_list: filteredUsers }); 
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

const deleteUserById = (id) => {
  const index = users["users_list"].findIndex(user => user["id"] === id);
  if (index !== -1) {
      users["users_list"].splice(index, 1); // Removes the user from the array
      return true; // Deletion successful
  }
  return false; // User not found
};

app.delete("/users/:id", (req, res) => {
    const id = req.params.id; 
    const success = deleteUserById(id); // Attempts to delete the user
    if (success) {
        res.status(204).send(); // 204 No Content if successful
    } else {
        res.status(404).send("Resource not found."); // 404 Not Found if the user doesn't exist
    }
});

