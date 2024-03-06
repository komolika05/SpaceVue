import spaceMissionsData from "../space-mission-data.json";

export async function fetchMissionsData() {
  // Fetch from actual data source in production
  // try {
  //   const response = await fetch(
  //     "host/space-mission-data.json"
  //   );

  //   if (!response.ok) {
  //     throw new Error(HTTP error! Status: ${response.status});
  //   }

  //   const data = await response.json();
  //   return data;
  // } catch (error) {
  //   console.error("Error fetching data:", error);
  //   throw error;
  // }
  return spaceMissionsData
}