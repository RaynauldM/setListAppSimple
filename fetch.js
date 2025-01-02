import { sendSetlistUpdate } from "./app.js";

export function fetchJSONData(xSetlist) {
  return fetch(xSetlist)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json(); // Retourneer de JSON-data
    })
    .catch((error) => {
      console.error("Unable to fetch data:", error);
      throw error; // Gooi de fout opnieuw als je deze elders wilt afhandelen
    });
}

export function addSong(name, artist) {
  return fetch("http://localhost:3000/addSong", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, artist }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .catch((error) => {
      console.error("Unable to add song:", error);
      throw error;
    });
}

export function showAllSongs(container) {
  fetchJSONData("./json/setlist.json")
    .then((data) => {
      container.innerHTML = "";

      for (const song of data) {
        let newLi = document.createElement("li");

        newLi.className = "songs list-group-item list-group-item-info";
        newLi.innerHTML = song.name;
        container.append(newLi);
      }
    })
    .catch((error) => {
      console.log("foutje", error);
    });
}

export function showSongs(container) {
  fetchJSONData("./json/workingsetlist.json")
    .then((data) => {
      container.innerHTML = ""; // Maak de container leeg

      let deleteArea = document.createElement("div");
      deleteArea.id = "deleteArea";
      let deleteP = document.createElement("p");
      deleteP.id = "deleteP";
      deleteP.innerText = "Verwijder nummer";
      deleteArea.append(deleteP);

      for (const [setName, songs] of Object.entries(data)) {
        let setContainer = document.createElement("div");
        let setLabel = document.createElement("p");
        let songList = document.createElement("ul");

        setContainer.className = "setContainer";
        setLabel.className = "setLabel";
        songList.className = "songList list-group";
        songList.id = setName;

        setLabel.textContent =
          setName.charAt(0).toUpperCase() + setName.slice(1);

        for (const song of songs) {
          let newLi = document.createElement("li");
          newLi.className = "songs list-group-item list-group-item-light";
          newLi.textContent = song;
          songList.append(newLi);
        }

        Sortable.create(songList, {
          group: "shared",
          onEnd: (evt) => {
            // Call the existing function

            // Check if the item was dropped into the delete area
            const item = evt.item;
            const toContainer = evt.to;

            if (toContainer.id == "deleteArea") {
              // Remove the item from the DOM
              item.remove();
              console.log("Item has been deleted!");
            }
          },
        });
        Sortable.create(deleteArea, {
          group: "shared",
          sort: false, // Disable sorting in the delete area
          onStart(evt) {
            // Optionally handle the start of the drag if needed
          },
        });
        setContainer.append(setLabel, songList);
        container.append(setContainer, deleteArea);
      }
    })
    .catch((error) => {
      console.error("Fout bij het laden van de setlijst:", error);
    });
}

export function showSongsNoSort(container) {
  fetchJSONData("./json/workingsetlist.json")
    .then((data) => {
      container.innerHTML = ""; // Maak de container leeg

      for (const [setName, songs] of Object.entries(data)) {
        let setContainer = document.createElement("div");
        let setLabel = document.createElement("p");
        let songList = document.createElement("ul");

        setContainer.className = "setContainer list";
        setLabel.className = "setLabel";
        songList.className = "songList list-group";
        songList.id = setName;

        setLabel.textContent =
          setName.charAt(0).toUpperCase() + setName.slice(1);

        for (const song of songs) {
          let newLi = document.createElement("li");
          newLi.className = "songs list-group-item list-group-item-light";
          newLi.textContent = song;
          songList.append(newLi);
        }

        setContainer.append(setLabel, songList);
        container.append(setContainer);
      }
    })
    .catch((error) => {
      console.error("Fout bij het laden van de setlijst:", error);
    });
}

export function deleteSong(id) {
  return fetch(`http://localhost:3000/deleteSong/${id}`, {
    method: "DELETE",
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .catch((error) => {
      console.error("Unable to delete song:", error);
      throw error;
    });
}

export function updateSong(id, updatedName, updatedArtist) {
  return fetch(`http://localhost:3000/updateSong/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: updatedName, artist: updatedArtist }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .catch((error) => {
      console.error("Unable to update song:", error);
      throw error;
    });
}
