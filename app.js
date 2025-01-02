const saveBtnContainer = document.getElementById("saveBtnContainer");
const main = document.getElementById("main");
const btnPlacement = document.getElementById("btnPlacement");
import { showAllSongs, showSongs, showSongsNoSort } from "./fetch.js";
import { PORT } from "./server.js";
let setList = "./json/setlist.json";
let workingList = "/json/workingsetlist.json";

const btn1 = document.getElementById("changeSetlistBtn");
const btn2 = document.getElementById("setListBtn");
const btn3 = document.getElementById("updateSetlistBtn");

const placeHolder = "";
//button handling
const btns = btnPlacement.children;
for (const child of btns) {
  child.className = "btns";
  child.addEventListener("click", handleClick);
}

if (!window.location.href.includes("admin")) {
  document.addEventListener("DOMContentLoaded", () => {
    showSongsNoSort(main);
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

    console.log("setlist opgeslagen!");
  } catch (error) {
    console.error("Fout bij opslaan:", error);
    alert("Opslaan mislukt.");
  }
}

function createSaveBtn() {
  if (document.getElementById("saveSetlist")) {
    return; // Stop als de knop al bestaat
  }
  let saveButton = document.createElement("button");
  saveButton.textContent = "Opslaan";
  saveButton.id = "saveSetlist";
  saveButton.className = "btn btn-warning";
  saveButton.addEventListener("click", saveSetlist);
  saveBtnContainer.append(saveButton);
}

function changeSetlist() {
  let setlistContainer = document.createElement("div");
  let fsContainer = document.createElement("div");
  let sContainer = document.createElement("ul");
  let fullSetlist = document.createElement("ul");
  let set1 = document.createElement("ul");
  let set2 = document.createElement("ul");
  let set3 = document.createElement("ul");

  sContainer.id = "sContainer";
  fsContainer.id = "fsContainer";
  fsContainer.className = "list-group";
  sContainer.className = "";
  // Styling en ID's toewijzen
  let fullLabel = document.createElement("p");
  let setLabel1 = document.createElement("p");
  let setLabel2 = document.createElement("p");
  let setLabel3 = document.createElement("p");
  fullLabel.className = "setLabel";
  setLabel1.className = "setLabel";
  setLabel2.className = "setLabel";
  setLabel3.className = "setLabel";
  fullLabel.textContent = "Extralist";
  setLabel1.textContent = "Set 1";
  setLabel2.textContent = "Set 2";
  setLabel3.textContent = "Set 3";

  setlistContainer.id = "setlistContainer";
  fullSetlist.id = "fullSetlist";

  set1.id = "set1";
  set1.className = "";
  set1.textContent = placeHolder;
  set2.textContent = placeHolder;
  set3.textContent = placeHolder;
  set2.id = "set2";
  set2.className = "";
  set3.id = "set3";
  set3.className = "";

  // Sortable instellen
  Sortable.create(fullSetlist, {
    group: "changeSetlist",
    onEnd: () => sendSetlistUpdate(),
  });
  Sortable.create(set1, {
    group: "changeSetlist",
    onEnd: () => sendSetlistUpdate(),
  });
  Sortable.create(set2, {
    group: "changeSetlist",
    onEnd: () => sendSetlistUpdate(),
  });
  Sortable.create(set3, {
    group: "changeSetlist",
    onEnd: () => sendSetlistUpdate(),
  });

  // Elementen opbouwen
  main.innerHTML = "";
  showAllSongs(fullSetlist); // Voeg nummers toe aan de linkerlijst
  fsContainer.append(fullLabel, fullSetlist);
  sContainer.append(setLabel1, set1, setLabel2, set2, setLabel3, set3);
  setlistContainer.append(fsContainer, sContainer);
  main.append(setlistContainer);
  createSaveBtn();
}

function goToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

function updateSetlist() {
  // Toon de songs in main
  showSongs(main);

  // Controleer of de save-knop al bestaat, anders toevoegen
  if (!document.getElementById("saveSetlist")) {
    createSaveBtn();
  }
}

function disposeSaveBtn() {
  saveBtnContainer.innerHTML = "";
}
function handleClick(event) {
  let btnId = event.target.id;
  switch (btnId) {
    case "changeSetlistBtn":
      btn1.disabled = true;
      btn2.disabled = false;

      btn3.disabled = false;
      changeSetlist();
      goToTop();
      break;
    case "setListBtn":
      disposeSaveBtn();

      showSongsNoSort(main);
      goToTop();
      btn1.disabled = false;
      btn2.disabled = true;
      btn3.disabled = false;
      break;
    case "updateSetlistBtn":
      updateSetlist();
      goToTop();
      btn1.disabled = false;
      btn2.disabled = false;
      btn3.disabled = true;
      break;
  }
}

// WebSocket verbinding
const socket = new WebSocket("ws://localhost:", PORT);

socket.onopen = () => {
  console.log("Verbonden met WebSocket-server.");
};

socket.onmessage = (event) => {
  const message = JSON.parse(event.data);
  if (message.type === "update") {
    console.log("Update ontvangen:", message.data);
    // Hier kun je de UI bijwerken, bijvoorbeeld de workingsetlist herladen
    showSongs(main);
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

export function sendSetlistUpdate() {
  const set1Songs = Array.from(document.getElementById("set1").children).map(
    (item) => item.textContent
  );
  const set2Songs = Array.from(document.getElementById("set2").children).map(
    (item) => item.textContent
  );
  const set3Songs = Array.from(document.getElementById("set3").children).map(
    (item) => item.textContent
  );

  const updatedSetlist = {
    type: "update",
    data: {
      set1: set1Songs,
      set2: set2Songs,
      set3: set3Songs,
    },
  };

  socket.send(JSON.stringify(updatedSetlist));
}

export { setList, workingList };
