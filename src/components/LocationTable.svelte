<script>
  import CellContent from './CellContent.svelte';
  
  export let locations = [];
  
  let sortColumn = 'rating'; // Default sort
  let sortDirection = 'desc'; // Default direction
  
  // Reactive statement to sort locations whenever sort parameters change
  $: sortedLocations = sortLocations(locations, sortColumn, sortDirection);
  
  function sortLocations(locations, column, direction) {
    return [...locations].sort((a, b) => {
      const [valueA, valueB] = getColumnValues(a, b, column);
      return direction === 'asc' ? valueA - valueB : valueB - valueA;
    });
  }
  
  function getColumnValues(a, b, column) {
    switch(column) {
      case 'rating': return [a.rating, b.rating];
      case 'cost': return [getRatingValue(a.costLevel), getRatingValue(b.costLevel)];
      case 'earnings': return [getRatingValue(a.earnings.level), getRatingValue(b.earnings.level)];
      case 'financial': return [a.financialOpportunities.score, b.financialOpportunities.score];
      case 'food': return [a.foodQuality.score, b.foodQuality.score];
      case 'social': return [a.socialOpportunities.score, b.socialOpportunities.score];
      case 'quality': return [a.qualityOfLife.score, b.qualityOfLife.score];
      case 'benefits': return [a.benefits.score, b.benefits.score];
      case 'disadvantages': return [a.disadvantages.score, b.disadvantages.score];
      case 'internet': return [a.internet.score, b.internet.score];
      case 'legal': return [a.legalEase.score, b.legalEase.score];
      case 'adventure': return [a.adventure.score, b.adventure.score];
      default: return [a.rating, b.rating];
    }
  }
  
  function getRatingValue(ratingLevel) {
    const ratings = {
      'exceptional': 5,
      'excellent': 4,
      'very good': 3,
      'good': 2,
      'moderate': 1
    };
    return ratings[ratingLevel] || 0;
  }
  
  function handleSort(column) {
    if (column === sortColumn) {
      sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      sortColumn = column;
      sortDirection = 'desc';
    }
  }
  
  const columnMap = {
    'rating': 'Rating',
    'cost': 'Cost of Living',
    'earnings': 'Potential Earnings',
    'financial': 'Financial Opportunities',
    'food': 'Food Quality',
    'social': 'Social Opportunities',
    'quality': 'Quality of Life',
    'benefits': 'Benefits',
    'disadvantages': 'Disadvantages',
    'internet': 'Internet',
    'legal': 'Legal Ease',
    'adventure': 'Adventure'
  };
</script>

<table class="location-table">
  <thead>
    <tr>
      <th>Location</th>
      {#each Object.entries(columnMap) as [column, label]}
        <th data-column={column} on:click={() => handleSort(column)}>
          {label}
          <span class="sort-indicator">
            {#if column === sortColumn}
              {sortDirection === 'asc' ? ' ▲' : ' ▼'}
            {/if}
          </span>
        </th>
      {/each}
    </tr>
  </thead>
  <tbody>
    {#each sortedLocations as location}
      <tr class="location-row">
        <!-- Location name cell -->
        <td class="location-name" 
            style="font-weight: bold; 
                   color: {location.textColor}; 
                   background-color: {location.color}; 
                   font-size: 1.1em; 
                   vertical-align: middle; 
                   text-align: center; 
                   border-radius: 6px; 
                   width: 180px;">
          {location.name}
        </td>
        
        <!-- Rating cell -->
        <td>
          <CellContent 
            ratingText={location.ratingLevel} 
            valueText={`${location.rating}/10`} 
            ratingClass={`rating-${location.ratingLevel}`}
            ratingScore={location.rating / 2} 
          />
        </td>
        
        <!-- Cost of living cell -->
        <td>
          <CellContent 
            ratingText={location.costLevel} 
            valueText={null}
            ratingClass={`rating-${location.costLevel}`}
            ratingScore={getRatingValue(location.costLevel)} 
          >
            <div class="cost-breakdown">
              <div class="cost-option">
                <span class="cost-label">Budget:</span>
                <span class="cost-amount">€{location.costOfLiving.low}</span>
                <span class="cost-desc">{location.costOfLiving.lowDesc}</span>
              </div>
              <div class="cost-option">
                <span class="cost-label">Mid-range:</span>
                <span class="cost-amount">€{location.costOfLiving.mid}</span>
                <span class="cost-desc">{location.costOfLiving.midDesc}</span>
              </div>
              <div class="cost-option">
                <span class="cost-label">Luxury:</span>
                <span class="cost-amount">€{location.costOfLiving.high}</span>
                <span class="cost-desc">{location.costOfLiving.highDesc}</span>
              </div>
            </div>
          </CellContent>
        </td>
        
        <!-- Earnings cell -->
        <td>
          <CellContent 
            ratingText={location.earnings.level} 
            valueText={`€${location.earnings.range}/day`} 
            description={location.earnings.notes}
            ratingClass={`rating-${location.earnings.level}`}
            ratingScore={getRatingValue(location.earnings.level)} 
          />
        </td>
        
        <!-- Financial opportunities cell -->
        <td>
          <CellContent 
            ratingText={location.financialOpportunities.level} 
            description={location.financialOpportunities.description}
            ratingClass={`rating-${location.financialOpportunities.level}`}
            ratingScore={location.financialOpportunities.score} 
          />
        </td>
        
        <!-- Food quality cell -->
        <td>
          <CellContent 
            ratingText={location.foodQuality.level} 
            valueText={`${location.foodQuality.score}/10`} 
            description={location.foodQuality.description}
            ratingClass={`rating-${location.foodQuality.level}`}
            ratingScore={location.foodQuality.score / 2} 
          />
        </td>
        
        <!-- Social opportunities cell -->
        <td>
          <CellContent 
            ratingText={location.socialOpportunities.level} 
            description={location.socialOpportunities.description}
            ratingClass={`rating-${location.socialOpportunities.level}`}
            ratingScore={location.socialOpportunities.score} 
          />
        </td>
        
        <!-- Quality of life cell -->
        <td>
          <CellContent 
            ratingText={location.qualityOfLife.level} 
            description={location.qualityOfLife.description}
            ratingClass={`rating-${location.qualityOfLife.level}`}
            ratingScore={location.qualityOfLife.score} 
          />
        </td>
        
        <!-- Benefits cell -->
        <td>
          <CellContent 
            ratingText={location.benefits.level} 
            description={location.benefits.description}
            ratingClass={`rating-${location.benefits.level}`}
            ratingScore={location.benefits.score} 
          />
        </td>
        
        <!-- Disadvantages cell -->
        <td>
          <CellContent 
            ratingText={location.disadvantages.level} 
            description={location.disadvantages.description}
            ratingClass={`rating-${location.disadvantages.level}`}
            ratingScore={location.disadvantages.score} 
          />
        </td>
        
        <!-- Internet cell -->
        <td>
          <CellContent 
            ratingText={location.internet.level} 
            description={location.internet.description}
            ratingClass={`rating-${location.internet.level}`}
            ratingScore={location.internet.score} 
          />
        </td>
        
        <!-- Legal ease cell -->
        <td>
          <CellContent 
            ratingText={location.legalEase.level} 
            description={location.legalEase.description}
            ratingClass={`rating-${location.legalEase.level}`}
            ratingScore={location.legalEase.score} 
          />
        </td>
        
        <!-- Adventure cell -->
        <td>
          <CellContent 
            ratingText={location.adventure.level} 
            valueText={`${location.adventure.score}/10`} 
            description={location.adventure.description}
            ratingClass={`rating-${location.adventure.level}`}
            ratingScore={location.adventure.score / 2} 
          />
        </td>
      </tr>
    {/each}
  </tbody>
</table>

<style>
  .location-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    margin-bottom: 50px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    max-width: 1800px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .location-table th {
    background-color: #2c5282;
    color: white;
    padding: 15px 20px;
    text-align: left;
    border: 1px solid #e2e8f0;
    font-weight: 600;
    font-size: 1.1em;
    white-space: nowrap;
    cursor: pointer;
    transition: background-color 0.2s;
    position: relative;
  }
  
  .location-table th:hover {
    background-color: #3182ce;
  }
  
  .sort-indicator {
    margin-left: 5px;
  }
  
  .location-table td {
    padding: 16px 20px;
    border: 1px solid #e2e8f0;
    vertical-align: top;
    background-color: white;
    min-width: 150px;
  }
  
  /* Cost of living breakdown styles */
  :global(.cost-breakdown) {
    margin-top: 10px;
  }
  
  :global(.cost-option) {
    margin-bottom: 12px;
    padding-bottom: 8px;
    border-bottom: 1px dotted #e2e8f0;
  }
  
  :global(.cost-option:last-child) {
    border-bottom: none;
  }
  
  :global(.cost-label) {
    font-weight: 600;
    display: block;
    margin-bottom: 3px;
    color: #2D3748;
  }
  
  :global(.cost-amount) {
    font-size: 1.1em;
    font-weight: 700;
    color: #2C5282;
    display: block;
    margin-bottom: 3px;
  }
  
  :global(.cost-desc) {
    font-size: 0.9em;
    color: #718096;
    display: block;
    line-height: 1.4;
  }
</style>