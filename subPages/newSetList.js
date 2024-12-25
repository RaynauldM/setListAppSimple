const mainScreen = document.querySelector("main");

import { showAllSongs } from "../fetch.js";

function clearScreen() {
  mainScreen.innerHTML = "";
}

function pageStart() {
  clearScreen();
  const linebreak = document.createElement("br");
  let dateLabel = document.createElement("label");
  let dateInput = document.createElement("input");

  let titleLabel = document.createElement("label");
  let titleInput = document.createElement("input");

  let listContainer = document.createElement("div");
  let fullListContainer = document.createElement("ul");
  let newListContainer = document.createElement("ul");
  dateLabel.for = "dateInput";
  dateLabel.innerHTML = "Datum (verplicht)";
  dateInput.name = "dateInput";
  dateInput.id = "dateInput";
  dateInput.type = "date";

  mainScreen.append(dateLabel);
  mainScreen.append(dateInput);

  titleLabel.for = "titleInput";
  titleLabel.innerHTML = "Titel (optioneel)";
  titleInput.name = "titleInput";
  titleInput.id = "titleInput";

  mainScreen.append(linebreak);
  mainScreen.append(titleLabel);
  mainScreen.append(titleInput);
  mainScreen.append(linebreak);

  listContainer.id = "listContainer";
  fullListContainer.id = "fullListContainer";
  newListContainer.id = "newListContainer";
  listContainer.className = "containers";
  fullListContainer.className = "containers";
  newListContainer.className = "containers";

  showAllSongs(fullListContainer);

  listContainer.append(fullListContainer);
  listContainer.append(newListContainer);
  mainScreen.append(listContainer);

  let fullListContainerSort = new Sortable(fullListContainer, {
    group: {
      name: "createNew",
      pull: "clone",
      put: false,
    },
    sort: false,
  });

  let newListContainerSort = new Sortable(newListContainer, {
    group: {
      name: "createNew",
      pull: false,
      put: true,
    },
    animation: 150,
    removeOnSpill: true,
  });
}

export function newSetListPage() {
  pageStart();
}
