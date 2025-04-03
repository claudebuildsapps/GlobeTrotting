<script>
  export let ratingText = '';
  export let valueText = '';
  export let description = '';
  export let ratingClass = '';
</script>

<div class="cell-content">
  <div class="cell-rating {ratingClass}">{ratingText}</div>
  
  {#if valueText}
    <div class="cell-value">{valueText}</div>
  {/if}
  
  {#if description}
    <div class="cell-description">{description}</div>
  {/if}
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
  
  /* Rating classes applied through the ratingClass prop */
  :global(.rating-exceptional) { 
    background-color: #2C5282; 
    color: white;
  }
  
  :global(.rating-excellent) { 
    background-color: #3182CE; 
    color: white;
  }
  
  :global(.rating-very-good) { 
    background-color: #4299E1; 
    color: white;
  }
  
  :global(.rating-good) { 
    background-color: #63B3ED; 
    color: white;
  }
  
  :global(.rating-moderate) { 
    background-color: #90CDF4; 
    color: #2A4365;
  }
</style>