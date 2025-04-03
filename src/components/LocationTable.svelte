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
      case 'earnings': return [a.earnings.points || 0, b.earnings.points || 0];
      case 'financial': return [a.financialOpportunities.points || 0, b.financialOpportunities.points || 0];
      case 'food': return [a.foodQuality.points || 0, b.foodQuality.points || 0];
      case 'social': return [a.socialOpportunities.points || 0, b.socialOpportunities.points || 0];
      case 'quality': return [a.qualityOfLife.points || 0, b.qualityOfLife.points || 0];
      case 'benefits': return [a.benefits.points || 0, b.benefits.points || 0];
      case 'disadvantages': return [a.disadvantages.points || 0, b.disadvantages.points || 0];
      case 'internet': return [a.internet.points || 0, b.internet.points || 0];
      case 'legal': return [a.legalEase.points || 0, b.legalEase.points || 0];
      case 'adventure': return [a.adventure.points || 0, b.adventure.points || 0];
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
  
  // Calculate default values for incomplete locations data
  function getDefaultPoints(level) {
    const points = {
      'exceptional': 95,
      'excellent': 85,
      'very good': 75,
      'good': 65,
      'moderate': 55
    };
    return points[level] || 50;
  }
  
  // Helper function to get emoji for location
  function getLocationEmoji(locationName) {
    const emojiMap = {
      'Athens, Greece': '🏛️',
      'Lisbon, Portugal': '🏰',
      'Sofia, Bulgaria': '⛰️',
      'Hanoi, Vietnam': '🏯',
      'Buenos Aires, Argentina': '💃',
      'Riga, Latvia': '🌲'
    };
    return emojiMap[locationName] || '🌍';
  }
  
  // Helper function to calculate annual earnings with monthly compound growth
  function calculateAnnualEarnings(location) {
    // Get daily rate (use average if there's a range)
    let dailyRate;
    const rangeStr = location.earnings.range;
    if (rangeStr.includes('-')) {
      const [min, max] = rangeStr.split('-').map(n => parseInt(n));
      dailyRate = (min + max) / 2;
    } else {
      dailyRate = parseInt(rangeStr);
    }
    
    // Get monthly growth rate with location-specific adjustment
    const baseMonthlyGrowthRate = 7; // Conservative baseline of 7% per month
    const locationAdjustment = getLocationGrowthAdjustment(location.name);
    const monthlyGrowthRate = baseMonthlyGrowthRate + locationAdjustment;
    
    // Calculate year-end daily rate with compound growth
    let endOfYearDailyRate = dailyRate;
    for (let month = 1; month <= 12; month++) {
      endOfYearDailyRate *= (1 + (monthlyGrowthRate / 100));
    }
    
    // Calculate annual earnings (assuming 20 work days per month) - average over the year
    const startingMonthlyEarnings = dailyRate * 20;
    const endingMonthlyEarnings = endOfYearDailyRate * 20;
    const averageMonthlyEarnings = (startingMonthlyEarnings + endingMonthlyEarnings) / 2;
    const annualEarnings = Math.round(averageMonthlyEarnings * 12);
    
    // Format with thousands separator
    return {
      monthlyRate: monthlyGrowthRate,
      yearEndDaily: Math.round(endOfYearDailyRate),
      annual: annualEarnings.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    };
  }
  
  // Helper function to determine location-specific growth adjustment
  function getLocationGrowthAdjustment(locationName) {
    const adjustments = {
      'Athens, Greece': 3.5,  // Exceptional diplomatic connections + luxury collaborations
      'Lisbon, Portugal': 2.0, // Excellent digital nomad hub + US/EU overlap
      'Sofia, Bulgaria': 1.0,  // Very good EU access + lowest EU cost
      'Hanoi, Vietnam': 0,     // Good base but distance from Western markets balances exoticism
      'Buenos Aires, Argentina': 1.5, // Very good US overlap + vibrant creative scene
      'Riga, Latvia': -1.0,    // Moderate market with limited ceiling
    };
    return adjustments[locationName] || 0;
  }
  
  // Function to get fun facts about each location
  function getLocationFunFacts(locationName) {
    const funFactsMap = {
      'Athens, Greece': [
        'The Acropolis was built in the 5th century BCE and is still standing',
        'Athens has been continuously inhabited for over 7,000 years',
        'The modern Olympic Games were revived in Athens in 1896',
        'Greek coffee is traditionally served with a glass of cold water',
        'Athens has more theatrical stages than any other European city'
      ],
      'Lisbon, Portugal': [
        'Lisbon is one of the oldest cities in Western Europe, predating London, Paris and Rome',
        'The famous Pastéis de Nata (custard tarts) were first created by monks',
        'Lisbon\'s iconic trams have been running since 1873',
        'The city is built on seven hills, like Rome',
        'Fado music, born in Lisbon, is UNESCO protected cultural heritage'
      ],
      'Sofia, Bulgaria': [
        'Sofia is one of the few capitals with a mountain (Vitosha) visible from the city center',
        'The city sits atop natural mineral springs with free public fountains',
        'Sofia has been inhabited for 6,000 years, with ruins visible downtown',
        'The Alexander Nevsky Cathedral is one of the largest Eastern Orthodox cathedrals',
        'The Bulgarian alphabet (Cyrillic) was created in the First Bulgarian Empire'
      ],
      'Hanoi, Vietnam': [
        'Hanoi celebrated its 1,000-year anniversary in 2010',
        'The Old Quarter has 36 streets named after the trades once conducted there',
        'Egg coffee (Cà Phê Trứng) was invented in Hanoi during milk shortages',
        'Hoan Kiem Lake in the city center has a legendary giant turtle',
        'Street food vendors typically specialize in just one dish, perfected over generations'
      ],
      'Buenos Aires, Argentina': [
        'Buenos Aires has the highest concentration of theaters in the world',
        'The Obelisk, the city\'s iconic monument, was built in just 31 days',
        'Portenos (locals) typically eat dinner after 9:00 PM',
        'The city has the largest Japanese garden outside of Japan',
        'Tango originated in the immigrant neighborhoods of Buenos Aires in the 1880s'
      ],
      'Riga, Latvia': [
        'Riga is home to the world\'s largest collection of Art Nouveau architecture',
        'Latvia has one of the fastest internet speeds in the world',
        'The Christmas tree tradition allegedly originated in Riga in 1510',
        'Riga Black Balsam is a traditional herbal liqueur with 45% alcohol content',
        'Latvians celebrate the summer solstice (Jani) with cheese, beer and bonfires'
      ]
    };
    return funFactsMap[locationName] || [
      'Rich cultural heritage and history',
      'Unique local cuisine worth exploring',
      'Distinct seasons with various activities',
      'Vibrant arts and music scene',
      'Local customs and traditions to discover'
    ];
  }
  
  // Helper function to get top benefits of location
  function getTopBenefits(location) {
    const benefits = [];
    
    // Add top rating if exceptional or excellent
    if (location.ratingLevel === 'exceptional' || location.ratingLevel === 'excellent') {
      benefits.push(`${location.ratingLevel.charAt(0).toUpperCase() + location.ratingLevel.slice(1)} overall rating at ${location.rating}/10`);
    }
    
    // Add cost benefit if excellent or exceptional
    if (location.costLevel === 'exceptional' || location.costLevel === 'excellent') {
      benefits.push(`${location.costLevel.charAt(0).toUpperCase() + location.costLevel.slice(1)} cost of living`);
    }
    
    // Add earnings benefit if excellent
    if (location.earnings.level === 'exceptional' || location.earnings.level === 'excellent') {
      benefits.push(`${location.earnings.level.charAt(0).toUpperCase() + location.earnings.level.slice(1)} earning potential`);
    }
    
    // Add food quality if exceptional or excellent
    if (location.foodQuality.level === 'exceptional' || location.foodQuality.level === 'excellent') {
      benefits.push(`${location.foodQuality.level.charAt(0).toUpperCase() + location.foodQuality.level.slice(1)} food quality (${location.foodQuality.score}/10)`);
    }
    
    // Add social opportunities if exceptional or excellent
    if (location.socialOpportunities.level === 'exceptional' || location.socialOpportunities.level === 'excellent') {
      benefits.push(`${location.socialOpportunities.level.charAt(0).toUpperCase() + location.socialOpportunities.level.slice(1)} social opportunities`);
    }
    
    // Add adventure if exceptional or excellent
    if (location.adventure.level === 'exceptional' || location.adventure.level === 'excellent') {
      benefits.push(`${location.adventure.level.charAt(0).toUpperCase() + location.adventure.level.slice(1)} adventure possibilities (${location.adventure.score}/10)`);
    }
    
    // Add internet if exceptional or excellent
    if (location.internet.level === 'exceptional' || location.internet.level === 'excellent') {
      benefits.push(`${location.internet.level.charAt(0).toUpperCase() + location.internet.level.slice(1)} internet quality`);
    }
    
    // Add financial opportunities if exceptional or excellent
    if (location.financialOpportunities.level === 'exceptional' || location.financialOpportunities.level === 'excellent') {
      benefits.push(`${location.financialOpportunities.level.charAt(0).toUpperCase() + location.financialOpportunities.level.slice(1)} financial advantages`);
    }
    
    // If we don't have enough benefits, add very good ratings too
    if (benefits.length < 3) {
      if (location.qualityOfLife.level === 'very good') {
        benefits.push(`Very good quality of life`);
      }
      
      if (location.legalEase.level === 'very good' || location.legalEase.level === 'exceptional') {
        benefits.push(`Favorable legal environment`);
      }
    }
    
    // Return 3-5 top benefits, prioritizing the most important ones
    return benefits.slice(0, 5);
  }
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
            style="color: {location.textColor}; 
                   background-color: {location.color}; 
                   vertical-align: top; 
                   border-radius: 6px; 
                   width: 250px;">
          <div class="location-title">{location.name}</div>
          
          {#if location.imageUrl}
            <div class="location-image">
              <img src={location.imageUrl} alt={location.name} />
            </div>
          {:else}
            <div class="location-placeholder">
              <!-- Placeholder for location image -->
              <div class="location-emoji">{getLocationEmoji(location.name)}</div>
            </div>
          {/if}
          
          <div class="location-summary">
            <h4>Key Benefits:</h4>
            <ul>
              {#each getTopBenefits(location) as benefit}
                <li>{benefit}</li>
              {/each}
            </ul>
          </div>
          
          <div class="projected-earnings">
            <div class="daily-projection">
              <div class="projection-label">Year-End Daily Rate:</div>
              <div class="projection-amount">
                €{calculateAnnualEarnings(location).yearEndDaily}/day
              </div>
              <div class="projection-note">
                At {calculateAnnualEarnings(location).monthlyRate}% monthly growth
              </div>
            </div>
            
            <div class="annual-projection">
              <div class="projection-label">Projected Annual Earnings:</div>
              <div class="projection-amount">
                €{calculateAnnualEarnings(location).annual}/year
              </div>
              <div class="projection-note">
                Based on avg. 20 stream days/month
              </div>
            </div>
          </div>
          
          <div class="fun-facts">
            <h4>Fun Facts: {location.name.split(',')[0]}</h4>
            <ul>
              {#each getLocationFunFacts(location.name) as fact}
                <li>{fact}</li>
              {/each}
            </ul>
          </div>
        </td>
        
        <!-- Rating cell -->
        <td>
          <CellContent 
            ratingText={location.ratingLevel} 
            ratingClass={`rating-${location.ratingLevel}`}
            pointScore={Math.round(location.rating * 10)}
            factors={location.ratingFactors || [
              "Overall livability assessment",
              "Balance of all criteria",
              "Value for digital nomads/streamers",
              "Location-specific advantages",
              "Potential for long-term residence"
            ]}
            description={location.ratingDescription || `${location.name} offers a ${location.ratingLevel} environment for digital nomads and streamers, balancing cost of living with quality of life and earning potential.`}
          />
        </td>
        
        <!-- Cost of living cell -->
        <td>
          <CellContent 
            ratingText={location.costLevel} 
            ratingClass={`rating-${location.costLevel}`}
            pointScore={location.costOfLiving.points || getDefaultPoints(location.costLevel)}
            factors={location.costOfLiving.factors || [
              "Housing affordability and availability",
              "Food and grocery costs",
              "Transportation expenses",
              "Utilities and internet costs",
              "Entertainment and leisure pricing"
            ]}
          >
            <div class="cost-breakdown">
              <div class="cost-option">
                <span class="cost-label">Budget Lifestyle:</span>
                <span class="cost-amount">€{location.costOfLiving.low}/month</span>
                <span class="cost-desc">{location.costOfLiving.lowDesc}</span>
                <div class="cost-details">
                  <div class="cost-detail-item"><strong>Housing:</strong> ~€{Math.round(location.costOfLiving.low * 0.5)}</div>
                  <div class="cost-detail-item"><strong>Food:</strong> ~€{Math.round(location.costOfLiving.low * 0.25)}</div>
                  <div class="cost-detail-item"><strong>Transport:</strong> ~€{Math.round(location.costOfLiving.low * 0.1)}</div>
                  <div class="cost-detail-item"><strong>Other:</strong> ~€{Math.round(location.costOfLiving.low * 0.15)}</div>
                </div>
              </div>
              <div class="cost-option">
                <span class="cost-label">Quality Lifestyle:</span>
                <span class="cost-amount">€{location.costOfLiving.mid}/month</span>
                <span class="cost-desc">{location.costOfLiving.midDesc}</span>
                <div class="cost-details">
                  <div class="cost-detail-item"><strong>Housing:</strong> ~€{Math.round(location.costOfLiving.mid * 0.45)}</div>
                  <div class="cost-detail-item"><strong>Food:</strong> ~€{Math.round(location.costOfLiving.mid * 0.3)}</div>
                  <div class="cost-detail-item"><strong>Transport:</strong> ~€{Math.round(location.costOfLiving.mid * 0.1)}</div>
                  <div class="cost-detail-item"><strong>Other:</strong> ~€{Math.round(location.costOfLiving.mid * 0.15)}</div>
                </div>
              </div>
              <div class="cost-option">
                <span class="cost-label">Premium Lifestyle:</span>
                <span class="cost-amount">€{location.costOfLiving.high}/month</span>
                <span class="cost-desc">{location.costOfLiving.highDesc}</span>
                <div class="cost-details">
                  <div class="cost-detail-item"><strong>Housing:</strong> ~€{Math.round(location.costOfLiving.high * 0.4)}</div>
                  <div class="cost-detail-item"><strong>Food:</strong> ~€{Math.round(location.costOfLiving.high * 0.3)}</div>
                  <div class="cost-detail-item"><strong>Transport:</strong> ~€{Math.round(location.costOfLiving.high * 0.1)}</div>
                  <div class="cost-detail-item"><strong>Entertainment:</strong> ~€{Math.round(location.costOfLiving.high * 0.1)}</div>
                  <div class="cost-detail-item"><strong>Other:</strong> ~€{Math.round(location.costOfLiving.high * 0.1)}</div>
                </div>
              </div>
            </div>
          </CellContent>
        </td>
        
        <!-- Earnings cell -->
        <td>
          <CellContent 
            ratingText={location.earnings.level} 
            ratingClass={`rating-${location.earnings.level}`}
            pointScore={location.earnings.points || getDefaultPoints(location.earnings.level)}
            factors={location.earnings.factors || [
              "Time zone advantage for target audience",
              "Local collaboration opportunities",
              "Direct contracting potential",
              "Premium content possibilities",
              "Growth trajectory in this market"
            ]}
          >
            <div class="earnings-projection">
              <div class="earnings-section">
                <span class="earnings-label">Current:</span>
                <span class="earnings-amount">€{location.earnings.range}/day</span>
                <span class="earnings-desc">{location.earnings.notes}</span>
              </div>
              <div class="earnings-section">
                <span class="earnings-label">Monthly Growth Rate:</span>
                <span class="earnings-amount">{calculateAnnualEarnings(location).monthlyRate}% per month</span>
                <span class="earnings-desc">{location.earnings.growthReason || `Enhanced growth projections for excellent streamer in ${location.name} market`}</span>
              </div>
              <div class="earnings-section">
                <span class="earnings-label">Year-End Daily Rate:</span>
                <span class="earnings-amount">€{calculateAnnualEarnings(location).yearEndDaily}/day</span>
                <span class="earnings-desc">Projected after 12 months of compounded growth</span>
              </div>
              <div class="earnings-section annual-projection">
                <span class="earnings-label">Annual Earnings:</span>
                <span class="earnings-amount">€{calculateAnnualEarnings(location).annual}/year</span>
                <span class="earnings-desc">Based on 20 stream days per month with compounded growth</span>
              </div>
            </div>
          </CellContent>
        </td>
        
        <!-- Financial opportunities cell -->
        <td>
          <CellContent 
            ratingText={location.financialOpportunities.level} 
            description={location.financialOpportunities.description}
            ratingClass={`rating-${location.financialOpportunities.level}`}
            pointScore={location.financialOpportunities.points || getDefaultPoints(location.financialOpportunities.level)}
            factors={location.financialOpportunities.factors || [
              "Tax advantages and structure",
              "Banking and financial services access",
              "Investment opportunities",
              "Cryptocurrency regulations",
              "Cost-to-income ratio potential"
            ]}
          />
        </td>
        
        <!-- Food quality cell -->
        <td>
          <CellContent 
            ratingText={location.foodQuality.level} 
            description={location.foodQuality.description || `${location.name} offers ${location.foodQuality.level} food quality with a variety of dining options at different price points. Local specialties are ${location.foodQuality.level === 'exceptional' || location.foodQuality.level === 'excellent' ? 'outstanding' : 'good'}, and ingredients are generally fresh and high quality.`}
            ratingClass={`rating-${location.foodQuality.level}`}
            pointScore={location.foodQuality.points || getDefaultPoints(location.foodQuality.level)}
            factors={location.foodQuality.factors || [
              "Local cuisine quality and variety",
              "Ingredient freshness and sourcing",
              "Water quality and safety",
              "Dining options at various price points",
              "International food availability"
            ]}
          />
        </td>
        
        <!-- Social opportunities cell -->
        <td>
          <CellContent 
            ratingText={location.socialOpportunities.level} 
            description={location.socialOpportunities.description || `${location.name} provides ${location.socialOpportunities.level} social opportunities for digital nomads and content creators. The international community is ${location.socialOpportunities.level === 'exceptional' || location.socialOpportunities.level === 'excellent' ? 'vibrant and welcoming' : 'present but more limited'}.`}
            ratingClass={`rating-${location.socialOpportunities.level}`}
            pointScore={location.socialOpportunities.points || getDefaultPoints(location.socialOpportunities.level)}
            factors={location.socialOpportunities.factors || [
              "Digital nomad community presence",
              "English language prevalence",
              "Networking events and meetups",
              "Local integration possibilities",
              "Professional connection opportunities"
            ]}
          />
        </td>
        
        <!-- Quality of life cell -->
        <td>
          <CellContent 
            ratingText={location.qualityOfLife.level} 
            description={location.qualityOfLife.description || `${location.name} offers a ${location.qualityOfLife.level} quality of life with balanced amenities and lifestyle options. Healthcare, safety, and general livability are aligned with what you'd expect for a ${location.qualityOfLife.level} rating.`}
            ratingClass={`rating-${location.qualityOfLife.level}`}
            pointScore={location.qualityOfLife.points || getDefaultPoints(location.qualityOfLife.level)}
            factors={location.qualityOfLife.factors || [
              "Healthcare quality and accessibility",
              "Safety and security situation",
              "Environmental quality and cleanliness",
              "Housing comfort and options",
              "Cultural and leisure activities"
            ]}
          />
        </td>
        
        <!-- Benefits cell -->
        <td>
          <CellContent 
            ratingText={location.benefits.level} 
            description={location.benefits.description || `The ${location.benefits.level} benefits of ${location.name} include its particular advantages for digital nomads and content creators looking for a productive and enjoyable base of operations.`}
            ratingClass={`rating-${location.benefits.level}`}
            pointScore={location.benefits.points || getDefaultPoints(location.benefits.level)}
            factors={location.benefits.factors || [
              "Location-specific advantages",
              "Digital infrastructure quality",
              "Regional travel opportunities",
              "Visa and legal framework",
              "Work-life balance potential"
            ]}
          />
        </td>
        
        <!-- Disadvantages cell -->
        <td>
          <CellContent 
            ratingText={location.disadvantages.level} 
            description={location.disadvantages.description || `${location.name} does have some ${location.disadvantages.level === 'moderate' ? 'significant' : 'minor'} drawbacks to consider. These challenges are generally ${location.disadvantages.level === 'excellent' || location.disadvantages.level === 'very good' ? 'manageable' : 'more substantial'} for most digital nomads.`}
            ratingClass={`rating-${location.disadvantages.level}`}
            pointScore={location.disadvantages.points || getDefaultPoints(location.disadvantages.level)}
            factors={location.disadvantages.factors || [
              "Primary challenges in this location",
              "Seasonal or climate issues",
              "Bureaucratic or administrative hurdles",
              "Cultural adjustment difficulties",
              "Infrastructure limitations"
            ]}
          />
        </td>
        
        <!-- Internet cell -->
        <td>
          <CellContent 
            ratingText={location.internet.level} 
            description={location.internet.description || `Internet quality in ${location.name} is ${location.internet.level}, meeting most digital nomad needs. Speeds and reliability are consistent with what you would expect for a ${location.internet.level} rating in this category.`}
            ratingClass={`rating-${location.internet.level}`}
            pointScore={location.internet.points || getDefaultPoints(location.internet.level)}
            factors={location.internet.factors || [
              "Broadband availability and coverage",
              "Average speeds and performance",
              "Reliability and downtime frequency",
              "Mobile data options and quality",
              "Public WiFi availability"
            ]}
          />
        </td>
        
        <!-- Legal ease cell -->
        <td>
          <CellContent 
            ratingText={location.legalEase.level} 
            description={location.legalEase.description || `The legal environment for digital nomads in ${location.name} is ${location.legalEase.level}, with processes that are ${location.legalEase.level === 'exceptional' || location.legalEase.level === 'excellent' ? 'straightforward' : 'more complex'} compared to other popular digital nomad destinations.`}
            ratingClass={`rating-${location.legalEase.level}`}
            pointScore={location.legalEase.points || getDefaultPoints(location.legalEase.level)}
            factors={location.legalEase.factors || [
              "Visa process complexity",
              "Residency options and requirements",
              "Business and tax registration ease",
              "Banking and financial access",
              "Local bureaucracy navigation"
            ]}
          />
        </td>
        
        <!-- Adventure cell -->
        <td>
          <CellContent 
            ratingText={location.adventure.level} 
            description={location.adventure.description || `${location.name} provides ${location.adventure.level} adventure opportunities, with a range of experiences available for content creation and personal enjoyment. The variety and uniqueness of adventures is ${location.adventure.level === 'exceptional' || location.adventure.level === 'excellent' ? 'outstanding' : 'good'}.`}
            ratingClass={`rating-${location.adventure.level}`}
            pointScore={location.adventure.points || getDefaultPoints(location.adventure.level)}
            factors={location.adventure.factors || [
              "Cultural exploration opportunities",
              "Natural environment and outdoor activities",
              "Unique local experiences",
              "Travel connectivity to nearby destinations",
              "Content creation backdrops and settings"
            ]}
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
    background-color: #FFFAF0; /* Warm cream background */
  }
  
  .location-table th {
    background-color: #8A65C9; /* Lighter purple for main headers */
    color: white;
    padding: 15px 20px;
    text-align: left;
    border: 1px solid #E8E2D5;
    font-weight: 600;
    font-size: 1.1em;
    white-space: nowrap;
    cursor: pointer;
    transition: background-color 0.2s;
    position: relative;
    border-radius: 4px 4px 0 0;
  }
  
  .location-table th:hover {
    background-color: #9D7FD8; /* Even lighter purple on hover */
  }
  
  .sort-indicator {
    margin-left: 5px;
  }
  
  .location-table td {
    padding: 16px 20px;
    border: 1px solid #E8E2D5;
    vertical-align: top;
    background-color: white;
    min-width: 250px; /* Wider columns to match Financial Opportunities */
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.5);
  }
  
  /* Cost of living breakdown styles */
  :global(.cost-breakdown), :global(.earnings-projection) {
    margin-top: 10px;
  }
  
  :global(.cost-option), :global(.earnings-section) {
    margin-bottom: 12px;
    padding-bottom: 8px;
    border-bottom: 1px dotted #e2e8f0;
  }
  
  :global(.cost-option:last-child), :global(.earnings-section:last-child) {
    border-bottom: none;
  }
  
  :global(.cost-label), :global(.earnings-label) {
    font-weight: 600;
    display: block;
    margin-bottom: 3px;
    color: #2D3748;
  }
  
  :global(.cost-amount), :global(.earnings-amount) {
    font-size: 1.1em;
    font-weight: 700;
    color: #5D2E8C; /* Match exceptional color */
    display: block;
    margin-bottom: 3px;
  }
  
  :global(.cost-desc), :global(.earnings-desc) {
    font-size: 0.9em;
    color: #718096;
    display: block;
    line-height: 1.4;
  }
  
  /* Location name cell styling */
  .location-title {
    font-size: 1.5em;
    font-weight: 800;
    text-align: center;
    margin-bottom: 15px;
    padding: 10px;
    background-color: rgba(0, 0, 0, 0.15);
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    text-shadow: 0 1px 2px rgba(0,0,0,0.2);
  }
  
  .location-placeholder {
    background-color: rgba(255, 255, 255, 0.2);
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    margin: 10px 0;
  }
  
  .location-emoji {
    font-size: 60px;
    text-align: center;
  }
  
  .location-image img {
    width: 100%;
    height: 120px;
    object-fit: cover;
    border-radius: 8px;
    margin: 10px 0;
  }
  
  .location-summary {
    background-color: rgba(255, 255, 255, 0.2);
    padding: 10px;
    border-radius: 8px;
    margin: 10px 0;
  }
  
  .location-summary h4 {
    margin: 0 0 8px 0;
    font-size: 1.1em;
  }
  
  .location-summary ul {
    margin: 0;
    padding-left: 20px;
  }
  
  .location-summary li {
    margin-bottom: 4px;
    font-size: 0.9em;
  }
  
  .projected-earnings {
    padding: 12px;
    border-radius: 8px;
    margin: 15px 0 5px 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  .daily-projection {
    background-color: rgba(0, 0, 0, 0.12);
    padding: 10px;
    border-radius: 8px;
  }
  
  .annual-projection {
    background-color: rgba(0, 0, 0, 0.18);
    padding: 10px;
    border-radius: 8px;
  }
  
  .projection-label {
    font-weight: 600;
    font-size: 1em;
    margin-bottom: 4px;
  }
  
  .projection-amount {
    font-size: 1.4em;
    font-weight: 700;
    color: white;
    margin: 5px 0;
    text-shadow: 0 1px 1px rgba(0,0,0,0.3);
  }
  
  .projection-note {
    font-size: 0.8em;
    opacity: 0.9;
  }
  
  .fun-facts {
    background-color: rgba(255, 255, 255, 0.25);
    border-radius: 8px;
    padding: 12px;
    margin-top: 15px;
  }
  
  .fun-facts h4 {
    margin: 0 0 8px 0;
    font-size: 1.1em;
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    padding-bottom: 5px;
  }
  
  .fun-facts ul {
    margin: 0;
    padding-left: 20px;
    font-size: 0.85em;
  }
  
  .fun-facts li {
    margin-bottom: 4px;
  }
  
  /* Cost breakdown detail styling */
  :global(.cost-details) {
    margin-top: 8px;
    padding: 8px;
    background-color: rgba(237, 242, 247, 0.8);
    border-radius: 4px;
    font-size: 0.85em;
  }
  
  :global(.cost-detail-item) {
    margin-bottom: 3px;
  }
  
  :global(.annual-projection) {
    background-color: rgba(237, 242, 247, 0.1);
    border-radius: 4px;
    padding: 8px;
    margin-top: 10px;
  }
</style>