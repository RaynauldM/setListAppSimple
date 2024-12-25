const sUl = document.getElementById("setListUl");
const btnPlacement = document.getElementById("btnPlacement");

import { newSetListPage } from "./subPages/newSetList.js";
// globals

const setList = "./json/setlist.json";
const workingList = "/json/workingsetlist.json";

import { showAllSongs } from "./fetch.js";
//button handling
const btns = btnPlacement.children;
for (const child of btns) {
  child.className = "btns";
  child.addEventListener("click", handleClick);
}

function handleClick(event) {
  let btnId = event.target.id;
  switch (btnId) {
    case "allSongsBtn":
      showAllSongs(sUl);
      break;
    case "createSetListBtn":
      newSetListPage();
  }
}

export { setList, workingList };
