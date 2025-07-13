# Mindset Assessment Dashboard

## Overview

This is a static web application that displays mindset assessment results in an interactive dashboard format.

## Key Features

- Dynamic data parsing from CSV-like format
- Automatic maxScore detection from data
- Interactive chart visualization
- Responsive design
- No hardcoded values (fully data-driven)

## How to Update Data

### 1. Update the Raw Data

Edit the `data.js` file and replace the content of the `rawCSVData` template literal with your new data.

The data should be in CSV format with the first row as headers and subsequent rows as data:

```
{headers...}
"timestamp","score","question1","question2",...
"date1","X / 20","answer1","answer2",...
"date2","Y / 20","answer1","answer2",...
```

### 2. Score Format

The system automatically detects the maximum score from the data format "X / Y" where:

- X = current score
- Y = maximum possible score

For example: "15 / 20" means the user scored 15 out of 20 points.

### 3. No Manual Configuration Needed

- The `maxScore` is automatically calculated
- Score distribution and statistics are computed dynamically
- Chart and recommendations are generated based on the data

## File Structure

- `index.html` - Main HTML page
- `data.js` - Data storage and parsing logic
- `script.js` - Application logic and visualization
- `styles.css` - Styling and responsive design

## Testing

You can test the application by:

1. Opening `index.html` directly in a browser (modern browsers support this)
2. Or serving it through any HTTP server (Python, Node.js, etc.)

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires JavaScript enabled
- Uses Chart.js for visualization
