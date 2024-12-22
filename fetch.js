export function fetchJSONData() {
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
