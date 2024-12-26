const main = document.getElementById("main");
const btnPlacement = document.getElementById("btnPlacement");
import { showAllSongs, showSongs } from "./fetch.js";
// globals

const setList = "./json/setlist.json";
const workingList = "/json/workingsetlist.json";

//button handling
const btns = btnPlacement.children;
for (const child of btns) {
  child.className = "btns";
  child.addEventListener("click", handleClick);
}

function changeSetlist() {
  console.log("yo");
}

function showSetList() {
  showSongs(main);
}

function handleClick(event) {
  let btnId = event.target.id;
  switch (btnId) {
    case "changeSetlistBtn":
      changeSetlist();
      break;
    case "setListBtn":
      showSetList();
  }
}

export { setList, workingList };
