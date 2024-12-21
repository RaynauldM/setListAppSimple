const sUl = document.getElementById("setListUl");
const btnPlacement = document.getElementById("btnPlacement");

//button handling
const btns = btnPlacement.children;
for (const child of btns) {
  child.className = "btns";
  child.addEventListener("click", handleClick);
}

function fetchJSONData() {
  return fetch("./setlist.json")
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

function showAllSongs() {
  fetchJSONData()
    .then((data) => {
      sUl.innerHTML = "";
      for (const song of data) {
        let newLi = document.createElement("li");
        newLi.innerHTML = song.name;
        sUl.append(newLi);
      }
    })
    .catch((error) => {
      console.log("foutje", error);
    });
}

function handleClick(event) {
  let btnId = event.target.id;
  switch (btnId) {
    case "allSongsBtn":
      showAllSongs();
      break;
  }
}

// fetchJSONData()
