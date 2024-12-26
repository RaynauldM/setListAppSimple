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

        newLi.className = "songs";
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
      container.innerHTML = "";
      for (const song of data) {
        let newLi = document.createElement("li");

        newLi.className = "songs";
        newLi.innerHTML = song.name;
        container.append(newLi);
      }
    })
    .catch((error) => {
      console.log("foutje", error);
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
