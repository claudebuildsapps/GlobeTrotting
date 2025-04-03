<script>
  export let ratingText = '';
  export let valueText = '';
  export let description = '';
  export let ratingClass = '';
  export let ratingScore = 0; // Numeric score for star display
  
  // Function to create star rating with half-star support
  function getStarRating(score) {
    const fullStars = Math.floor(score);
    const hasHalfStar = score % 1 >= 0.5;
    
    let stars = '';
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars += '★';
    }
    
    // Add half star if needed
    if (hasHalfStar) {
      stars += '⯪'; // This is a half-star character
    }
    
    // Add empty stars to make total of 5
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars += '☆';
    }
    
    return stars;
  }
</script>

<div class="cell-content">
  <div class="cell-rating {ratingClass}">{ratingText}</div>
  
  <!-- Star rating display -->
  <div class="cell-stars">{getStarRating(ratingScore)}</div>
  
  {#if valueText}
    <div class="cell-value">{valueText}</div>
  {/if}
  
  {#if description}
    <div class="cell-description">{description}</div>
  {/if}
  
  <!-- Slot for custom content (used for cost breakdown) -->
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
  
  .cell-stars {
    margin-bottom: 8px;
    font-size: 1.2em;
    text-align: center;
    color: #F6AD55; /* Amber color for stars */
  }
  
  .cell-value {
    margin-bottom: 8px;
    font-weight: 600;
    font-size: 1.2em;
    color: #2d3748;
    text-align: center;
  }
  
  .cell-description {
    font-size: 0.9em;
    color: #718096;
    line-height: 1.4;
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