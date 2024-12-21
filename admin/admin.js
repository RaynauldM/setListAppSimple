const btnPlacement = document.getElementById("btnPlacement");
const mainScreen = document.querySelector("main");
let btns = btnPlacement.children;

for (let btn of btns) {
  btn.addEventListener("click", handleClick);
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
  mainScreen.append(artistLabel);
  mainScreen.append(artistInput);
}

function handleClick(event) {
  let btnId = event.target.id;
  switch (btnId) {
    case "addBtn":
      addSongPage();
      break;
  }
}
