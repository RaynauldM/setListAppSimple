const main = document.getElementById("main");
const btnPlacement = document.getElementById("btnPlacement");
import { showAllSongs, showSongs } from "./fetch.js";

const setList = "./json/setlist.json";
const workingList = "/json/workingsetlist.json";

//button handling
const btns = btnPlacement.children;
for (const child of btns) {
  child.className = "btns";
  child.addEventListener("click", handleClick);
}

function changeSetlist() {
  let setlistContainer = document.createElement("div");
  let fullSetlist = document.createElement("ul");
  let setList = document.createElement("ul");
  setlistContainer.id = "setlistContainer";
  fullSetlist.id = "fullSetlist";
  setList.id = "setList";
  Sortable.create(fullSetlist, {
    group: "changeSetlist",
  });
  Sortable.create(setList, {
    group: "changeSetlist",
  });

  main.innerHTML = "";
  showAllSongs(fullSetlist);
  showSongs(setList);
  setlistContainer.append(fullSetlist);
  setlistContainer.append(setList);
  main.append(setlistContainer);
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
