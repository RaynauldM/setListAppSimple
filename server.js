const express = require("express");
const cors = require("cors");
const fs = require("fs");
const { WebSocketServer } = require("ws");
const app = express();
const PORT = 3000;

app.use(cors());

// Pad naar het JSON-bestand
const jsonFilePath = "./json/setlist.json";

// Middleware om JSON-gegevens te verwerken
app.use(express.json());

const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// WebSocket Server
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("New WebSocket connection established.");

  // Stuur een bericht naar de client
  ws.send(JSON.stringify({ message: "Connected to WebSocket server." }));

  // Luister naar berichten van de client
  ws.on("message", (message) => {
    console.log("Received:", message);
  });

  // Verbreek de verbinding
  ws.on("close", () => {
    console.log("WebSocket connection closed.");
  });
});

// Route om wijzigingen via WebSocket door te sturen
app.post("/save-workingsetlist", (req, res) => {
  const data = req.body;

  // Sla het bestand op
  fs.writeFile(
    "./json/workingsetlist.json",
    JSON.stringify(data, null, 2),
    (err) => {
      if (err) {
        console.error("Fout bij opslaan:", err);
        res.status(500).send("Opslaan mislukt.");
      } else {
        // Stuur de update naar alle verbonden WebSocket-clients
        wss.clients.forEach((client) => {
          if (client.readyState === client.OPEN) {
            client.send(JSON.stringify({ type: "update", data }));
          }
        });

        res.send("Setlist opgeslagen.");
      }
    }
  );
});

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

app.delete("/deleteSong/:id", (req, res) => {
  const songId = req.params.id;

  // Lees het bestaande JSON-bestand
  fs.readFile(jsonFilePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to read JSON file." });
    }

    let songs = JSON.parse(data);

    // Filter de nummers om het opgegeven ID te verwijderen
    const updatedSongs = songs.filter((song) => song.id !== songId);

    // Schrijf de bijgewerkte lijst terug naar het JSON-bestand
    fs.writeFile(jsonFilePath, JSON.stringify(updatedSongs, null, 2), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to write JSON file." });
      }

      res.status(200).json({ message: "Song deleted successfully." });
    });
  });
});

app.put("/updateSong/:id", (req, res) => {
  const songId = req.params.id;
  const { name, artist } = req.body;

  if (!name || !artist) {
    return res.status(400).json({ error: "Name and artist are required." });
  }

  fs.readFile(jsonFilePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to read JSON file." });
    }

    let songs = JSON.parse(data);

    const songIndex = songs.findIndex((song) => song.id === songId);
    if (songIndex === -1) {
      return res.status(404).json({ error: "Song not found." });
    }

    // Update de song
    songs[songIndex].name = name;
    songs[songIndex].artist = artist;

    fs.writeFile(jsonFilePath, JSON.stringify(songs, null, 2), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to write JSON file." });
      }

      res.status(200).json({ message: "Song updated successfully." });
    });
  });
});

app.post("/save-workingsetlist", (req, res) => {
  const data = req.body;

  // Sla het bestand op
  fs.writeFile(
    "./json/workingsetlist.json",
    JSON.stringify(data, null, 2),
    (err) => {
      if (err) {
        console.error("Fout bij opslaan:", err);
        res.status(500).send("Opslaan mislukt.");
      } else {
        res.send("Setlist opgeslagen.");
      }
    }
  );
});
