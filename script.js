const showSelect = document.getElementById("show-select");
const showDetails = document.getElementById("show-details");
const messageEl = document.getElementById("message");

function displayMessage(msg) {
  messageEl.textContent = msg || "";
}

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
  messageEl.textContent = "Loading top-rated shows...";
  const url = "https://api.tvmaze.com/shows?page=0";

  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }

    const shows = await res.json();
    fillDropdown(shows);
    messageEl.textContent = "";
  } catch (error) {
    console.error(error);
    messageEl.textContent = error.message || "Failed to load shows";
  }
}

async function loadShowDetails(id) {
  messageEl.textContent = "Loading show details...";
  const url = `https://api.tvmaze.com/shows/${id}`;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      if (res.status === 404) {
        throw new Error("Show not found");
      }
      throw new Error(`Request failed with status ${res.status}`);
    }

    const show = await res.json();
    displayDetails(show);
    messageEl.textContent = "";
  } catch (error) {
    console.error(error);
    if (error.message === "Show not found") {
      messageEl.textContent = error.message;
    } else {
      messageEl.textContent = error.message || "Failed to load show details";
    }
  }
}

function displayDetails(show) {
  // Clear previous details
  showDetails.innerHTML = "";

  // Create heading with show name
  const heading = document.createElement("h2");
  heading.textContent = show.name;
  showDetails.appendChild(heading);

  // Handle poster image
  if (show.image && show.image.medium) {
    const img = document.createElement("img");
    img.src = show.image.medium;
    img.alt = `Poster for ${show.name}`;
    showDetails.appendChild(img);
  } else {
    const msg = document.createElement("p");
    msg.textContent = "No poster available";
    showDetails.appendChild(msg);
  }

  // Display summary using innerHTML to render the HTML tags
  const summaryContainer = document.createElement("p");
  summaryContainer.innerHTML = show.summary;
  showDetails.appendChild(summaryContainer);

  // Create container for metadata
  const metadata = document.createElement("p");

  // Genres: join array or use fallback for empty/missing
  const genresText = show.genres && show.genres.length > 0
    ? show.genres.join(", ")
    : "Not listed";
  metadata.textContent = `Genres: ${genresText}`;

  // Premiere date with fallback
  const premieredText = show.premiered || "Unknown";
  metadata.textContent += ` | Premiered: ${premieredText}`;

  // Status with fallback
  const statusText = show.status || "Not rated";
  metadata.textContent += ` | Status: ${statusText}`;

  // Rating with fallback for null (treated as Not rated)
  const ratingText = show.rating?.average || "Not rated";
  metadata.textContent += ` | Rating: ${ratingText}`;

  showDetails.appendChild(metadata);
}

showSelect.addEventListener("change", function () {
  const id = showSelect.value;

  if (id === "") {
    return;
  }

  loadShowDetails(id);
});

loadShows();