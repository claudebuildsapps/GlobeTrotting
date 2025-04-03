<script>
  export let ratingText = '';
  export let valueText = '';
  export let description = '';
  export let ratingClass = '';
  export let factors = []; // Factors that contributed to the rating
  export let pointScore = 0; // Numeric point score (out of 100)
  
  // Function to create star rating out of 10 (no half stars)
  // This now uses the point score (0-100) rather than the star score
  function getStarRating(pointScore) {
    // Convert point score (0-100) to stars out of 10
    const adjustedScore = Math.min(Math.round(pointScore / 10), 10);
    
    let stars = '';
    
    // Add filled stars
    for (let i = 0; i < adjustedScore; i++) {
      stars += '★';
    }
    
    // Add empty stars to make total of 10
    for (let i = adjustedScore; i < 10; i++) {
      stars += '☆';
    }
    
    return stars;
  }
</script>

<div class="cell-content">
  <div class="cell-rating {ratingClass}">{ratingText}</div>
  
  <!-- Score display -->
  <div class="cell-stars">{getStarRating(pointScore || 0)}</div>
  
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
    border-radius: 10px; /* More rounded corners */
    padding: 4px 10px;
    display: inline-block;
    letter-spacing: 0.5px;
    font-size: 0.8em;
    text-align: center;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  .cell-stars {
    margin-bottom: 4px;
    font-size: 1.1em;
    text-align: center;
    color: #F6AD55; /* Amber color for stars */
    letter-spacing: -1px;
  }
  
  .cell-points {
    font-weight: 700;
    font-size: 0.85em;
    margin: 0 auto 12px;
    color: #FFFFFF;
    background-color: #553C9A;
    padding: 2px 8px;
    border-radius: 10px;
    text-align: center;
    display: inline-block;
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
  
  /* New vibrant color palette - earth tones with pop accents */
  :global(.rating-exceptional) { 
    background-color: #5D2E8C; /* Deep purple */
    color: white;
  }
  
  :global(.rating-excellent) { 
    background-color: #2D7D46; /* Forest green */
    color: white;
  }
  
  :global(.rating-very-good) { 
    background-color: #B45309; /* Amber gold */
    color: white;
  }
  
  :global(.rating-good) { 
    background-color: #C05621; /* Terracotta */
    color: white;
  }
  
  :global(.rating-moderate) { 
    background-color: #9F580A; /* Bronze */
    color: white;
  }
</style>