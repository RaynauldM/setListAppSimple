import {
  showAllSongs,
  addSong,
  deleteSong,
  fetchJSONData,
  updateSong,
} from "./fetch.js";

const btnPlacement = document.getElementById("btnPlacement");
const mainScreen = document.querySelector("main");
let btns = btnPlacement.children;

for (let btn of btns) {
  btn.addEventListener("click", handleClick);
  btn.className = "btns";
}

function clearScreen() {
  mainScreen.innerHTML = "";
}

function addSongPage() {
  clearScreen();
  let songLabel = document.createElement("label");
  let songInput = document.createElement("input");
  let artistLabel = document.createElement("label");
  let artistInput = document.createElement("input");
  let sendBtn = document.createElement("button");
  songLabel.for = "song";
  songLabel.textContent = "Song: ";
  songInput.type = "text";
  songInput.id = "songInput";
  songInput.name = "song";
  songInput.maxLength = "32";
  mainScreen.append(songLabel);
  mainScreen.append(songInput);

  artistLabel.for = "artist";
  artistLabel.textContent = "Artist: ";
  artistInput.type = "text";
  artistInput.id = "artistInput";
  artistInput.name = "artist";
  artistInput.maxLength = "32";

  sendBtn.innerText = "add song";
  sendBtn.id = "sendBtn";

  sendBtn.addEventListener("click", sendSong);
  sendBtn.className = "btns";
  mainScreen.append(artistLabel);
  mainScreen.append(artistInput);
  mainScreen.append(sendBtn);
  function sendSong() {
    let newSong = songInput.value;
    let newArtist = artistInput.value;
    addSong(newSong, newArtist)
      .then((res) => console.log("toegevoegd: ", res))
      .catch((err) => console.log("error: ", err));
    addSongPage();
  }
}

function deleteSongPage() {
  clearScreen();
  let newUl = document.createElement("ul");
  mainScreen.append(newUl);

  fetchJSONData()
    .then((data) => {
      newUl.innerHTML = "";
      for (const song of data) {
        let newLi = document.createElement("li");
        newLi.innerHTML = `${song.name} - ${song.artist}`;

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "btns";
        deleteBtn.type = "button";
        deleteBtn.addEventListener("click", (event) => {
          event.preventDefault();
          deleteSong(song.id)
            .then(() => {
              console.log(`Deleted song: ${song.name}`);
              deleteSongPage(); // Ververst de lijst
            })
            .catch((err) => console.error("Error deleting song:", err));
        });

        newLi.append(deleteBtn);
        newUl.append(newLi);
      }
    })
    .catch((error) => {
      console.log("Error fetching songs:", error);
    });
}

function updateSongPage() {
  clearScreen();
  let newUl = document.createElement("ul");
  mainScreen.append(newUl);

  showAllSongsWithEdit(newUl);
}

function showAllSongsWithEdit(container) {
  fetchJSONData()
    .then((data) => {
      container.innerHTML = "";
      for (const song of data) {
        let listItem = document.createElement("li");

        // Naam invoerveld
        let nameInput = document.createElement("input");
        nameInput.type = "text";
        nameInput.value = song.name;
        nameInput.className = "songNameInput";

        // Artiest invoerveld
        let artistInput = document.createElement("input");
        artistInput.type = "text";
        artistInput.value = song.artist;
        artistInput.className = "artistNameInput";

        // Opslaan-knop
        let saveButton = document.createElement("button");
        saveButton.textContent = "Save";
        saveButton.className = "btns";
        saveButton.addEventListener("click", () => {
          const updatedName = nameInput.value;
          const updatedArtist = artistInput.value;

          updateSong(song.id, updatedName, updatedArtist)
            .then(() => {
              console.log(`Updated song: ${song.id}`);
              updateSongPage(); // Verfrist de lijst na het opslaan
            })
            .catch((err) => console.error("Error updating song:", err));
        });

        listItem.append(nameInput, artistInput, saveButton);
        container.append(listItem);
      }
    })
    .catch((error) => {
      console.log("Error loading songs:", error);
    });
}

function handleClick(event) {
  let btnId = event.target.id;
  switch (btnId) {
    case "addBtn":
      addSongPage();
      break;
    case "deleteBtn":
      deleteSongPage();
      break;
    case "updateBtn":
      updateSongPage();
      break;
  }
}
