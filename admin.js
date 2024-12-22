import { showAllSongs, addSong } from "./fetch.js";

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
  showAllSongs(newUl);
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
  }
}
