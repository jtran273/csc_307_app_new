// src/MyApp.jsx
import React, { useState } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  // Initial state
  const [characters, setCharacters] = useState([]);

  // Function to remove a character
  function removeOneCharacter(index) {
    const updated = characters.filter((_, i) => i !== index);
    setCharacters(updated);
  }

  // Function to add a character
  function updateList(person) {
    setCharacters([...characters, person]);
  }

  // Render the table and form
  return (
    <div className="container">
      <h1>Character Management App</h1>
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;
