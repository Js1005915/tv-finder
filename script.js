const showSelect = document.getElementById("show-select");

async function fillDropdown(shows) {
  // Sort by rating.average, highest first (null ratings count as 0)
  const sortedShows = shows.sort((a, b) => {
    const aRating = a.rating?.average || 0;
    const bRating = b.rating?.average || 0;
    return bRating - aRating;
  });

  // Keep only the top 25 shows
  const topShows = sortedShows.slice(0, 25);

  // Clear the dropdown before adding new options
  showSelect.innerHTML = "";

  // Create placeholder option
  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = "Select a show";
  showSelect.appendChild(placeholder);

  // Build options for each show
  topShows.forEach(show => {
    const option = document.createElement("option");
    option.value = show.id.toString();
    option.textContent = show.name;
    showSelect.appendChild(option);
  });
}

async function loadShows() {
  const url = "https://api.tvmaze.com/shows?page=0";

  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }

    const shows = await res.json();
    fillDropdown(shows);
  } catch (error) {
    console.error(error);
  }
}

loadShows();