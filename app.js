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

async function saveSetlist() {
  // Haal de ul-elementen op
  let set1 = document.getElementById("set1");
  let set2 = document.getElementById("set2");
  let set3 = document.getElementById("set3");

  // Zet de inhoud van de lijsten om in arrays
  let set1Songs = Array.from(set1.children).map((item) => item.textContent);
  let set2Songs = Array.from(set2.children).map((item) => item.textContent);
  let set3Songs = Array.from(set3.children).map((item) => item.textContent);

  // Bouw het JSON-object
  let workingSetlist = {
    set1: set1Songs,
    set2: set2Songs,
    set3: set3Songs,
  };

  try {
    // Stuur de JSON naar de server
    await fetch("http://localhost:3000/save-workingsetlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(workingSetlist),
    });
    alert("Setlist opgeslagen!");
  } catch (error) {
    console.error("Fout bij opslaan:", error);
    alert("Opslaan mislukt.");
  }
}

function changeSetlist() {
  let setlistContainer = document.createElement("div");
  let fsContainer = document.createElement("div");
  let sContainer = document.createElement("div");
  let fullSetlist = document.createElement("ul");
  let set1 = document.createElement("ul");
  let set2 = document.createElement("ul");
  let set3 = document.createElement("ul");
  let fullLabel = document.createElement("p");
  let setLabel1 = document.createElement("p");
  let setLabel2 = document.createElement("p");
  let setLabel3 = document.createElement("p");

  // Styling en ID's toewijzen
  fullLabel.className = "listLabel";
  setLabel1.className = "listLabel";
  setLabel2.className = "listLabel";
  setLabel3.className = "listLabel";
  fullLabel.textContent = "Extralist";
  setLabel1.textContent = "Set 1";
  setLabel2.textContent = "Set 2";
  setLabel3.textContent = "Set 3";

  setlistContainer.id = "setlistContainer";
  fullSetlist.id = "fullSetlist";
  set1.id = "set1";
  set2.id = "set2";
  set3.id = "set3";

  // Sortable instellen
  Sortable.create(fullSetlist, {
    group: "changeSetlist",
  });
  Sortable.create(set1, {
    group: "changeSetlist",
  });
  Sortable.create(set2, {
    group: "changeSetlist",
  });
  Sortable.create(set3, {
    group: "changeSetlist",
  });

  // Elementen opbouwen
  main.innerHTML = "";
  showAllSongs(fullSetlist); // Voeg nummers toe aan de linkerlijst
  fsContainer.append(fullLabel, fullSetlist);
  sContainer.append(setLabel1, set1, setLabel2, set2, setLabel3, set3);
  setlistContainer.append(fsContainer, sContainer);
  main.append(setlistContainer);

  let saveButton = document.createElement("button");
  saveButton.textContent = "Opslaan";
  saveButton.id = "saveSetlist";
  saveButton.className = "btns";
  saveButton.addEventListener("click", saveSetlist);
  setlistContainer.append(saveButton);
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
