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
