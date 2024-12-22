const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(cors());

// Pad naar het JSON-bestand
const jsonFilePath = path.join(__dirname, "setlist.json");

// Middleware om JSON-gegevens te verwerken
app.use(express.json());

// Route om gegevens toe te voegen aan de JSON
app.post("/addSong", (req, res) => {
  const { name, artist } = req.body;

  if (!name || !artist) {
    return res.status(400).json({ error: "Name and artist are required." });
  }

  // Lees het bestaande JSON-bestand
  fs.readFile(jsonFilePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to read JSON file." });
    }

    let songs = JSON.parse(data);

    // Genereer een nieuwe ID
    const newId = String(songs.length).padStart(3, "0");

    // Maak het nieuwe nummerobject
    const newSong = {
      id: newId,
      name,
      artist,
      working: false,
    };

    // Voeg het nieuwe nummer toe aan de lijst
    songs.push(newSong);

    // Schrijf de bijgewerkte lijst terug naar het JSON-bestand
    fs.writeFile(jsonFilePath, JSON.stringify(songs, null, 2), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to write JSON file." });
      }

      res
        .status(201)
        .json({ message: "Song added successfully.", song: newSong });
    });
  });
});

// Start de server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
