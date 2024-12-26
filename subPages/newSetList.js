const mainScreen = document.querySelector("main");

import { showAllSongs, addSetList } from "../fetch.js";

let newList = [];

function clearScreen() {
  mainScreen.innerHTML = "";
}

function pageStart() {
  function handleSubmit() {
    if (dateInput.value) {
      let newDate = dateInput.value;
      let newTitle;
      if (titleInput.value) {
        newTitle = titleInput.value;
      } else {
        titleInput = "";
      }
      addSetList(newDate, newTitle, newList);
    }
  }
  clearScreen();
  const linebreak = document.createElement("br");
  let dateLabel = document.createElement("label");
  let dateInput = document.createElement("input");

  let titleLabel = document.createElement("label");
  let titleInput = document.createElement("input");

  let listContainer = document.createElement("div");
  let fullListContainer = document.createElement("ul");
  let newListContainer = document.createElement("ul");

  let submitBtn = document.createElement("button");

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

  submitBtn.id = "submitBtn";
  submitBtn.textContent = "sla op";
  submitBtn.onclick = handleSubmit;

  mainScreen.append(submitBtn);

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
    // Prevent duplicates
    onAdd: function (evt) {
      const targetList = evt.to; // The target list
      const newItem = evt.item; // The item being added
      const newItemText = newItem.textContent.trim();

      // Check for duplicates
      const isDuplicate = Array.from(targetList.children).some(
        (child) => child !== newItem && child.textContent.trim() === newItemText
      );

      if (isDuplicate) {
        // Remove the duplicate item
        targetList.removeChild(newItem);
        console.log("Dit item staat al in de lijst!");
      } else {
        newList.push(newItemText);
      }
    },
  });
}

export function newSetListPage() {
  pageStart();
}
