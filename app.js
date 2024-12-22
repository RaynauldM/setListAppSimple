const sUl = document.getElementById("setListUl");
const btnPlacement = document.getElementById("btnPlacement");
import { fetchJSONData } from "./fetch.js";
//button handling
const btns = btnPlacement.children;
for (const child of btns) {
  child.className = "btns";
  child.addEventListener("click", handleClick);
}

function showAllSongs() {
  fetchJSONData()
    .then((data) => {
      sUl.innerHTML = "";
      for (const song of data) {
        let newLi = document.createElement("li");
        newLi.innerHTML = song.name;
        sUl.append(newLi);
      }
    })
    .catch((error) => {
      console.log("foutje", error);
    });
}

function handleClick(event) {
  let btnId = event.target.id;
  switch (btnId) {
    case "allSongsBtn":
      showAllSongs();
      break;
  }
}
