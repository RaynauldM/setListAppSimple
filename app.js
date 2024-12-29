const main = document.getElementById("main");
const btnPlacement = document.getElementById("btnPlacement");
import { showAllSongs, showSongs } from "./fetch.js";

let setList = "./json/setlist.json";
let workingList = "/json/workingsetlist.json";

export let toggleListChange = false;

//button handling
const btns = btnPlacement.children;
for (const child of btns) {
  child.className = "btns";
  child.addEventListener("click", handleClick);
}

if (!window.location.href.includes("admin")) {
  document.addEventListener("DOMContentLoaded", () => {
    showSongs(main);
  });
}

async function saveSetlist() {
  let set1 = document.getElementById("set1");
  let set2 = document.getElementById("set2");
  let set3 = document.getElementById("set3");

  let set1Songs = Array.from(set1.children).map((item) => item.textContent);
  let set2Songs = Array.from(set2.children).map((item) => item.textContent);
  let set3Songs = Array.from(set3.children).map((item) => item.textContent);

  let workingSetlist = {
    set1: set1Songs,
    set2: set2Songs,
    set3: set3Songs,
  };

  try {
    // Stuur de bijgewerkte lijst naar de server
    const response = await fetch(
      "http://localhost:3000/update-workingsetlist",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(workingSetlist),
      }
    );

    if (!response.ok) {
      throw new Error("Fout bij het updaten van de workingsetlist.");
    }

    alert("Workingsetlist succesvol opgeslagen!");
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
      break;
    case "toggle":
      toggleListChange = !toggleListChange; // Wissel tussen true/false
      event.target.style.backgroundColor = toggleListChange ? "green" : "red";

      // Alleen Sortable aan- of uitzetten zonder de hele lijst te resetten
      const songLists = document.querySelectorAll(".songList");
      songLists.forEach((list) => {
        if (toggleListChange) {
          Sortable.create(list, { group: "shared" });
        } else {
          // Verwijder bestaande Sortable-instanties
          Sortable.get(list)?.destroy();
        }
      });
      break;
  }
}

// WebSocket verbinding
const socket = new WebSocket("ws://localhost:3000");

socket.onopen = () => {
  console.log("Verbonden met WebSocket-server.");
};

socket.onmessage = (event) => {
  const message = JSON.parse(event.data);
  if (message.type === "update") {
    console.log("Update ontvangen:", message.data);
    // Hier kun je de UI bijwerken, bijvoorbeeld de workingsetlist herladen
    updateWorkingSetlist(message.data);
  }
};

socket.onclose = () => {
  console.log("WebSocket-verbinding gesloten.");
};

// Functie om de UI te updaten
function updateWorkingSetlist(data) {
  const set1 = document.getElementById("set1");
  const set2 = document.getElementById("set2");
  const set3 = document.getElementById("set3");

  set1.innerHTML = "";
  set2.innerHTML = "";
  set3.innerHTML = "";

  data.set1.forEach((song) => {
    const li = document.createElement("li");
    li.textContent = song;
    set1.appendChild(li);
  });

  data.set2.forEach((song) => {
    const li = document.createElement("li");
    li.textContent = song;
    set2.appendChild(li);
  });

  data.set3.forEach((song) => {
    const li = document.createElement("li");
    li.textContent = song;
    set3.appendChild(li);
  });
}

export { setList, workingList };
