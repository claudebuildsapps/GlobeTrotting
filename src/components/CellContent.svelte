<script>
  export let ratingText = '';
  export let valueText = '';
  export let description = '';
  export let ratingClass = '';
  export let ratingScore = 0; // Numeric score for star display
  export let factors = []; // Factors that contributed to the rating
  export let useRectangles = false; // Whether to use rectangles instead of stars
  export let pointScore = 0; // Numeric point score (out of 100)
  
  // Function to create star rating with half-star support
  function getStarRating(score) {
    const fullStars = Math.floor(score);
    const hasHalfStar = score % 1 >= 0.5;
    
    let stars = '';
    const symbol = useRectangles ? '■' : '★';
    const emptySymbol = useRectangles ? '□' : '☆';
    
    // Add full stars/rectangles
    for (let i = 0; i < fullStars; i++) {
      stars += symbol;
    }
    
    // Add half star/rectangle if needed
    if (hasHalfStar) {
      stars += useRectangles ? '▣' : '⯪'; // Half-filled symbol
    }
    
    // Add empty stars/rectangles to make total of 5
    const emptySlotsNeeded = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptySlotsNeeded; i++) {
      stars += emptySymbol;
    }
    
    return stars;
  }
</script>

<div class="cell-content">
  <div class="cell-rating {ratingClass}">{ratingText}</div>
  
  <!-- Score display -->
  <div class="cell-points-row">
    <div class="cell-stars">{getStarRating(ratingScore)}</div>
    <div class="cell-points">{pointScore}/100</div>
  </div>
  
  {#if valueText}
    <div class="cell-value">{valueText}</div>
  {/if}
  
  {#if factors && factors.length > 0}
    <div class="cell-factors">
      <span class="factors-label">Key factors:</span>
      <ul>
        {#each factors as factor}
          <li>{factor}</li>
        {/each}
      </ul>
    </div>
  {/if}
  
  {#if description}
    <div class="cell-description">{@html description.replace(/\n/g, '<br>')}</div>
  {/if}
  
  <!-- Slot for custom content (used for cost breakdown, earnings projection) -->
  <slot></slot>
</div>

<style>
  .cell-content {
    display: flex;
    flex-direction: column;
  }
  
  .cell-rating {
    text-transform: uppercase;
    font-weight: bold;
    margin-bottom: 8px;
    border-radius: 4px;
    padding: 4px 8px;
    display: inline-block;
    letter-spacing: 0.5px;
    font-size: 0.8em;
    text-align: center;
  }
  
  .cell-points-row {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 8px;
    gap: 6px;
  }
  
  .cell-stars {
    font-size: 1.2em;
    text-align: center;
    color: #F6AD55; /* Amber color for stars */
  }
  
  .cell-points {
    font-weight: 700;
    font-size: 0.9em;
    color: #553C9A; /* Deep purple */
    background-color: #F7FAFC;
    padding: 2px 6px;
    border-radius: 10px;
    border: 1px solid #E9D8FD;
  }
  
  .cell-value {
    margin-bottom: 10px;
    font-weight: 600;
    font-size: 1.2em;
    color: #2d3748;
    text-align: center;
  }
  
  .cell-factors {
    margin-bottom: 10px;
    font-size: 0.85em;
    color: #4A5568;
    background-color: #EDF2F7;
    padding: 8px;
    border-radius: 4px;
  }
  
  .factors-label {
    font-weight: 700;
    color: #2D3748;
    display: block;
    margin-bottom: 4px;
  }
  
  .cell-factors ul {
    margin: 0;
    padding-left: 16px;
    list-style-type: disc;
  }
  
  .cell-factors li {
    margin-bottom: 2px;
  }
  
  .cell-description {
    font-size: 0.9em;
    color: #4A5568;
    line-height: 1.5;
  }
  
  /* Rating classes applied through the ratingClass prop - reordered by appeal */
  :global(.rating-exceptional) { 
    background-color: #553C9A; /* Deep purple */
    color: white;
  }
  
  :global(.rating-excellent) { 
    background-color: #2B6CB0; /* Royal blue */
    color: white;
  }
  
  :global(.rating-very-good) { 
    background-color: #3182CE; /* Medium blue */
    color: white;
  }
  
  :global(.rating-good) { 
    background-color: #4299E1; /* Light blue */
    color: white;
  }
  
  :global(.rating-moderate) { 
    background-color: #E9D8FD; /* Soft purple */
    color: #44337A; /* Dark purple for contrast */
  }
</style>