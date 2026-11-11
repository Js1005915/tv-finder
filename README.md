# 📺 TV Show Finder

>**⚠️ Disclaimer:** This project was created with the assistance of AI. All code, styling, and functionality were developed using AI guidance and implementation help.

---

## About

TV Show Finder is a web application that lets you browse and explore top-rated TV shows from the TVMaze API. The app displays show information including ratings, summaries, genres, premiere dates, and more in an elegant dark-themed interface.

![TV Show Finder Screenshot](https://via.placeholder.com/800x450/1a1a2e/e0e0e0?text=TV+Show+Finder)

## Features

- **Top 25 Rated Shows**: Automatically displays the highest-rated TV shows sorted by user ratings
- **Interactive Dropdown**: Easy-to-use selector to browse through popular shows
- **Rich Show Details**: View show poster, summary, genres, premiere date, status, and rating
- **Responsive Design**: Works beautifully on desktop and mobile devices
- **Professional Dark Theme**: Polished interface with modern styling
- **Loading States**: Visual feedback while content loads
- **Error Handling**: User-friendly messages for missing shows and errors

## Technology Stack

- **HTML5** - Semantic markup and structure
- **CSS3** - Custom dark theme with Flexbox layout, responsive design, and polished styling
- **Vanilla JavaScript** - No frameworks or libraries used
- **TVMaze API** - Public REST API for TV show data (`https://api.tvmaze.com`)

## Files

```
tv-finder/
├── index.html          # Main HTML page with layout structure
├── script.js           # JavaScript logic for API calls and DOM manipulation
├── style.css           # Custom dark theme styling
└── README.md           # This documentation file
```

## How It Works

1. **Initial Load**: The app fetches up to 25 top-rated shows from TVMaze API
2. **Dropdown Population**: Shows are sorted by rating and added to the dropdown
3. **User Selection**: When you select a show, a request is made to fetch its details
4. **Details Display**: Show information including poster, summary, and metadata is displayed
5. **Dynamic Updates**: Each selection replaces previous content with new show data

## API Integration

The app uses the [TVMaze API](https://www.tvmaze.com/api) - a free public API for TV show information:

- **Initial Request**: `https://api.tvmaze.com/shows?page=0` - Gets first page of shows (up to 250, sorted by rating)
- **Details Request**: `https://api.tvmaze.com/shows/{id}` - Fetches full details for a specific show

## Project Steps Completed

This project was built through the following development steps:

### Step 4: Fill the Dropdown
- Implemented sorting logic to rank shows by average rating
- Created dropdown with placeholder and top 25 shows
- Each option stores the show's ID as value

### Step 5: Request Show Details
- Added event listener for dropdown change events
- Implemented second API request using selected show's ID
- Built URL with template literals

### Step 6: Display Details
- Created `displayDetails` function to render show information
- Handles missing images with fallback messages
- Formats HTML summary content properly
- Shows metadata with appropriate defaults for missing values

### Step 7: Handle Loading and Errors
- Added loading messages during API requests
- Displays specific "Show not found" message for 404 errors
- Clears messages when data arrives successfully
- All error messages are visible to users, not just console

### Step 8: Style the Page
- Created custom dark-themed CSS stylesheet
- Implemented polished, professional design
- Centered layout with poster and text side-by-side
- Fully responsive for mobile devices
- Enhanced visual hierarchy and spacing

## Usage

1. Open `index.html` in a modern web browser
2. Wait for shows to load (loading message appears)
3. Select a show from the dropdown
4. View the show details displayed below
5. Try different shows to see more content!

## Browser Compatibility

- Chrome 80+
- Firefox 75+
- Safari 13.1+
- Edge 80+

## Notes

- Show images use the `medium` quality to load faster
- All text is properly escaped except summary which uses HTML formatting
- The app gracefully handles missing API data with user-friendly fallbacks

---

*Created and developed with AI assistance | Built for learning web development fundamentals*