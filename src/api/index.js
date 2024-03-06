async function fetchMissionsData() {
  const response = await fetch("../space-mission-data.json");
  return response.json();
}

export { fetchMissionsData };
