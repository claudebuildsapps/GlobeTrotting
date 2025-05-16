# PrideLess - Location Comparison Tool

A Svelte-based application for comparing locations for digital nomads.

## Getting Started

### Prerequisites

- Node.js (v14 or later recommended)
- npm (comes with Node.js)

### Installation

```bash
# Install dependencies
npm install
```

## Development

```bash
# Start the development server
npm run dev

# Visit http://localhost:5173 in your browser
```

## Building for Production

```bash
# Create an optimized production build
npm run build

# The built files will be in the 'dist' directory
```

## Previewing the Production Build Locally

```bash
# Serve the production build locally
npm run preview

# Visit http://localhost:4173 in your browser
```

## Deployment

Deploy the `dist` directory to any static hosting service like:
- Netlify (recommended) - Just drag and drop the dist folder
- Vercel - Automatically detects and builds Svelte projects
- GitHub Pages - Free hosting directly from your repository
- Cloudflare Pages - Unlimited bandwidth on free tier

Each of these services offers free tiers that are perfect for this application.

## Project Structure

- `src/App.svelte` - Main application component
- `src/components/LocationTable.svelte` - Table component for displaying location data
- `src/components/CellContent.svelte` - Reusable cell component
- `src/data/locations.js` - Location data

## Key Features

- **Reactive UI**: Data changes instantly update the UI
- **Component-based architecture**: Clean separation of concerns
- **Sortable columns**: Click on any column header to sort
- **Visually appealing**: Maintains the same attractive styling as the original
- **Minimal bundle size**: Much smaller than equivalent React/Vue implementations
- **Zero runtime overhead**: Svelte compiles away framework code