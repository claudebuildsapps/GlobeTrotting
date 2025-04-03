# Location Comparison Table

A lightweight, framework-agnostic component for displaying and comparing location data for digital nomads and streamers.

## Features

- Sortable columns for easy comparison
- Visual rating indicators with color-coding
- Responsive design for all device sizes
- Modular architecture for easy integration
- Configurable via simple parameters
- Loads data from external JSON file

## Usage

### Basic Setup

Include the required files:

```html
<link rel="stylesheet" href="styles.css">
<script src="render.js"></script>
```

Add the HTML markup:

```html
<div class="table-container">
  <table class="location-table">
    <thead>
      <tr>
        <th>Location</th>
        <th data-column="rating">Rating</th>
        <!-- Add other column headers as needed -->
      </tr>
    </thead>
    <tbody id="location-table-body">
      <!-- JavaScript will populate this -->
    </tbody>
  </table>
</div>
```

Initialize with default settings:

```javascript
const locationTable = new LocationTable();
```

### Custom Configuration

You can customize the table with different options:

```javascript
const locationTable = new LocationTable({
  tableBodyId: 'custom-table-body',
  dataUrl: 'path/to/custom-data.json',
  defaultSortColumn: 'cost',
  defaultSortDirection: 'asc'
});
```

### Data Format

The JSON data file should follow this structure:

```json
{
  "locations": [
    {
      "name": "Location Name",
      "color": "#HexColor",
      "textColor": "#HexColor",
      "rating": 9.5,
      "ratingLevel": "exceptional",
      "costOfLiving": 1200,
      "costLevel": "good",
      "earnings": {
        "range": "400-600",
        "level": "excellent",
        "notes": "Additional notes here"
      },
      // Other properties...
    }
  ]
}
```

## Framework Integration

### React Integration

```jsx
import React, { useEffect, useRef } from 'react';

function LocationTableComponent() {
  const tableRef = useRef(null);
  
  useEffect(() => {
    // Make sure to import the LocationTable script in your HTML or bundle
    const table = new LocationTable({
      tableBodyId: 'location-table-body',
      dataUrl: 'locations.json'
    });
    
    return () => {
      // Clean up if needed
    };
  }, []);
  
  return (
    <div className="table-container">
      <table className="location-table">
        <thead>{/* ... */}</thead>
        <tbody id="location-table-body"></tbody>
      </table>
    </div>
  );
}
```

### Vue Integration

```vue
<template>
  <div class="table-container">
    <table class="location-table">
      <thead><!-- ... --></thead>
      <tbody id="location-table-body"></tbody>
    </table>
  </div>
</template>

<script>
export default {
  mounted() {
    // Make sure LocationTable is available globally or imported
    this.table = new LocationTable({
      tableBodyId: 'location-table-body',
      dataUrl: 'locations.json'
    });
  },
  beforeDestroy() {
    // Clean up if needed
  }
}
</script>
```

## Customization

### CSS Customization

The component uses modular CSS classes that you can easily override in your own stylesheet:

```css
/* Example: Change the table header color */
.location-table th {
  background-color: #your-color;
}

/* Example: Modify the rating badges */
.cell-rating {
  border-radius: 8px;
  padding: 6px 10px;
}
```

### JavaScript Customization

You can extend the `LocationTable` class to add additional functionality:

```javascript
class CustomLocationTable extends LocationTable {
  constructor(config) {
    super(config);
    // Add custom initialization
  }
  
  // Override or add methods
  createCell(ratingText, valueText, descriptionText, ratingClass) {
    // Custom cell creation logic
    const cell = super.createCell(ratingText, valueText, descriptionText, ratingClass);
    // Additional modifications
    return cell;
  }
}
```

## Browser Support

This component works in all modern browsers (Chrome, Firefox, Safari, Edge).