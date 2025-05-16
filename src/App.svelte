<script>
  import LocationTable from './components/LocationTable.svelte';
  import { onMount } from 'svelte';
  import locationData from './data/locations.js';
  
  let locations = [];
  
  onMount(() => {
    // Initialize data and apply any corrections
    locations = locationData.locations.map(location => {
      // Handle special cases (like Hanoi's cost level)
      if (location.name === "Hanoi, Vietnam") {
        return { ...location, costLevel: "exceptional" };
      } else if (location.name === "Buenos Aires, Argentina" || location.name === "Sofia, Bulgaria") {
        return { ...location, costLevel: "excellent" };
      }
      return location;
    });
  });
</script>

<main>
  <h1>PrideLess - Location Comparison for Digital Nomads</h1>
  
  <div class="table-container">
    <LocationTable {locations} />
  </div>
</main>

<style>
  :global(body) {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin: 0;
    padding: 20px;
    background-color: #FBF7EF; /* Warm cream color */
    color: #433422; /* Warm dark brown */
  }
  
  h1 {
    text-align: center;
    margin-bottom: 30px;
    color: #A87F65; /* Lighter brown for title text */
    text-shadow: 0 1px 2px rgba(0,0,0,0.1);
  }
  
  .table-container {
    overflow-x: auto;
  }
</style>