document.addEventListener('DOMContentLoaded', function() {
    const tableBody = document.getElementById('location-table-body');
    let currentSortColumn = 'rating'; // Default sort by overall rating
    let currentSortDirection = 'desc'; // Default sort direction (descending)
    
    // Add click handlers to table headers
    const headers = document.querySelectorAll('.location-table th');
    headers.forEach(header => {
      const columnName = header.getAttribute('data-column');
      if (columnName) {
        header.style.cursor = 'pointer';
        header.addEventListener('click', () => sortTable(columnName));
        
        // Add sort indicator container
        const sortIndicator = document.createElement('span');
        sortIndicator.className = 'sort-indicator';
        sortIndicator.innerHTML = columnName === currentSortColumn ? ' ▼' : '';
        header.appendChild(sortIndicator);
      }
    });
    
    // Clear the loading message
    tableBody.innerHTML = '';
    
    // Data embedded directly
    const data = {
      "locations": [
        {
          "name": "Athens, Greece",
          "color": "#4299E1",
          "textColor": "#FFFFFF",
          "rating": 9.5,
          "ratingLevel": "exceptional",
          "costOfLiving": 1200,
          "costLevel": "good",
          "earnings": {
            "range": "400-600",
            "level": "excellent",
            "notes": "doubled without agency; EU time zone; luxury collaborations in Mykonos"
          },
          "financialOpportunities": {
            "level": "exceptional",
            "description": "Tax benefits via diplomatic channels; Mykonos real estate investment; special status tax advantages"
          },
          "foodQuality": {
            "score": 9,
            "level": "excellent",
            "description": "World-renowned Mediterranean cuisine; fresh seafood; olive oil; exceptional local wines"
          },
          "socialOpportunities": {
            "level": "exceptional",
            "description": "High-value network through influential connections; high-end social circles in Mykonos; international community"
          },
          "qualityOfLife": {
            "level": "excellent",
            "description": "Rich Mediterranean lifestyle; outdoor living; island access; good healthcare"
          },
          "benefits": {
            "level": "exceptional",
            "description": "Diplomatic immunity; infrastructure setup assistance; EU mobility; strong cultural heritage"
          },
          "disadvantages": {
            "level": "excellent",
            "description": "Summer tourist crowds; seasonal price increases"
          },
          "internet": {
            "level": "excellent",
            "description": "Up to 1Gbps fiber in select areas; 100-300Mbps average in Athens; infrastructure assistance available; current 500ms latency can be reduced"
          },
          "legalEase": {
            "level": "exceptional",
            "description": "Exceptional with connections; potential diplomatic passport; streamlined bureaucracy"
          },
          "adventure": {
            "score": 8.5,
            "level": "excellent",
            "description": "Island exploration; ancient sites; vibrant urban culture"
          }
        },
        {
          "name": "Lisbon, Portugal",
          "color": "#63B3ED",
          "textColor": "#FFFFFF",
          "rating": 8.8,
          "ratingLevel": "excellent",
          "costOfLiving": 1500,
          "costLevel": "moderate",
          "earnings": {
            "range": "460-560",
            "level": "excellent",
            "notes": "doubled without agency; ideal US/EU time zone overlap"
          },
          "financialOpportunities": {
            "level": "very good",
            "description": "NHR tax scheme (20% flat rate); established banking for digital nomads; EU financial passporting"
          },
          "foodQuality": {
            "score": 8.5,
            "level": "very good",
            "description": "Fresh seafood; pastéis de nata; excellent wines; affordable high-quality dining"
          },
          "socialOpportunities": {
            "level": "excellent",
            "description": "Massive international digital nomad hub; regular meetups; English widely spoken"
          },
          "qualityOfLife": {
            "level": "excellent",
            "description": "Excellent healthcare; high safety; walkable city; mild climate"
          },
          "benefits": {
            "level": "excellent",
            "description": "Digital Nomad visa program; high English proficiency; strong tech infrastructure"
          },
          "disadvantages": {
            "level": "good",
            "description": "Higher housing costs; tourist crowds; gentrification"
          },
          "internet": {
            "level": "excellent",
            "description": "Up to 1Gbps fiber widely available; very reliable; 200-500Mbps average; competitive market with multiple providers"
          },
          "legalEase": {
            "level": "very good",
            "description": "Clear Digital Nomad visa path; straightforward residency process"
          },
          "adventure": {
            "score": 8,
            "level": "very good",
            "description": "Surfing; vibrant nightlife; nearby historic towns"
          }
        },
        {
          "name": "Sofia, Bulgaria",
          "color": "#90CDF4",
          "textColor": "#2A4365",
          "rating": 8.2,
          "ratingLevel": "very good",
          "costOfLiving": 800,
          "costLevel": "excellent",
          "earnings": {
            "range": "400-440",
            "level": "very good",
            "notes": "doubled without agency; good EU time zone"
          },
          "financialOpportunities": {
            "level": "excellent",
            "description": "10% flat tax rate (lowest in EU); crypto-friendly banking; low business costs"
          },
          "foodQuality": {
            "score": 7,
            "level": "good",
            "description": "Hearty Balkan cuisine; quality dairy; affordable dining; good wine region"
          },
          "socialOpportunities": {
            "level": "good",
            "description": "Growing digital nomad community; smaller but active expat scene"
          },
          "qualityOfLife": {
            "level": "very good",
            "description": "Excellent value; developing infrastructure; high safety; good healthcare access"
          },
          "benefits": {
            "level": "very good",
            "description": "EU access; lowest cost of living in EU; growing tech hub"
          },
          "disadvantages": {
            "level": "good",
            "description": "Language barrier; less international connectivity"
          },
          "internet": {
            "level": "very good",
            "description": "Up to 1Gbps fiber in urban areas; affordable; 100-300Mbps typical; good reliability"
          },
          "legalEase": {
            "level": "very good",
            "description": "Straightforward EU residency; simple business setup"
          },
          "adventure": {
            "score": 7,
            "level": "good",
            "description": "Hiking; ski resorts; historic sites; emerging arts scene"
          }
        },
        {
          "name": "Hanoi, Vietnam",
          "color": "#BEE3F8",
          "textColor": "#2C5282",
          "rating": 7.9,
          "ratingLevel": "good",
          "costOfLiving": 650,
          "costLevel": "exceptional",
          "earnings": {
            "range": "340-440",
            "level": "good",
            "notes": "doubled without agency; potential Asia-Pacific growth"
          },
          "financialOpportunities": {
            "level": "very good",
            "description": "Very low tax burden (<10%); cryptocurrency-friendly; favorable foreign exchange"
          },
          "foodQuality": {
            "score": 9.5,
            "level": "exceptional",
            "description": "World-class street food; fresh ingredients; complex flavors; coffee culture"
          },
          "socialOpportunities": {
            "level": "moderate",
            "description": "Growing digital nomad scene; regular expat gatherings; language barriers"
          },
          "qualityOfLife": {
            "level": "good",
            "description": "Vibrant daily life; affordable luxury; excellent food; some healthcare concerns"
          },
          "benefits": {
            "level": "very good",
            "description": "Extremely low cost of living; exotic setting for content; emerging digital economy"
          },
          "disadvantages": {
            "level": "moderate",
            "description": "Language barrier; distance from Western markets"
          },
          "internet": {
            "level": "moderate",
            "description": "Limited fiber (300Mbps) in expat areas; 20-100Mbps typical; varying reliability; current 500ms latency difficult to improve"
          },
          "legalEase": {
            "level": "moderate",
            "description": "E-visa initial entry; extensions require local sponsor"
          },
          "adventure": {
            "score": 9.5,
            "level": "exceptional",
            "description": "Completely different culture; street life; regional travel"
          }
        },
        {
          "name": "Buenos Aires, Argentina",
          "color": "#E9F2FA",
          "textColor": "#2A4365",
          "rating": 7.3,
          "ratingLevel": "good",
          "costOfLiving": 750,
          "costLevel": "excellent",
          "earnings": {
            "range": "420-500",
            "level": "very good",
            "notes": "doubled without agency; good US time zone overlap"
          },
          "financialOpportunities": {
            "level": "good",
            "description": "Favorable exchange rates; crypto adoption high due to inflation; dollar-based income advantages"
          },
          "foodQuality": {
            "score": 9,
            "level": "excellent",
            "description": "World-famous beef; excellent wines; Italian influences; cafe culture"
          },
          "socialOpportunities": {
            "level": "very good",
            "description": "Large, vibrant expat community; easy social integration; tango culture"
          },
          "qualityOfLife": {
            "level": "very good",
            "description": "Rich cultural offerings; European feel; good private healthcare"
          },
          "benefits": {
            "level": "very good",
            "description": "Unique content opportunities; favorable exchange rates; dynamic creative scene"
          },
          "disadvantages": {
            "level": "moderate",
            "description": "Economic volatility; currency instability; political uncertainty"
          },
          "internet": {
            "level": "moderate",
            "description": "Fiber available in select areas (up to 300Mbps); 50-150Mbps typical; reliability issues; latency concerns for EU viewers"
          },
          "legalEase": {
            "level": "good",
            "description": "Easy initial visa; digital nomad status available"
          },
          "adventure": {
            "score": 8.5,
            "level": "excellent",
            "description": "Tango culture; vibrant arts scene; distinctive neighborhoods"
          }
        },
        {
          "name": "Riga, Latvia",
          "color": "#F0F5FA",
          "textColor": "#2A4365",
          "rating": 6.5,
          "ratingLevel": "moderate",
          "costOfLiving": 1350,
          "costLevel": "moderate",
          "earnings": {
            "range": "400",
            "level": "good",
            "notes": "doubled without agency; current baseline"
          },
          "financialOpportunities": {
            "level": "moderate",
            "description": "Moderate tax burden; limited crypto-friendly options; established EU banking"
          },
          "foodQuality": {
            "score": 7,
            "level": "good",
            "description": "Traditional Baltic cuisine; good bread and dairy; seasonal focus"
          },
          "socialOpportunities": {
            "level": "moderate",
            "description": "Moderate expat community; language barriers; smaller social scene"
          },
          "qualityOfLife": {
            "level": "very good",
            "description": "Good healthcare; high safety; excellent public transport"
          },
          "benefits": {
            "level": "good",
            "description": "EU membership; established legal residency; familiar environment"
          },
          "disadvantages": {
            "level": "moderate",
            "description": "Limited growth ceiling; challenging winters; smaller market"
          },
          "internet": {
            "level": "very good",
            "description": "Up to 1Gbps fiber widely available; very reliable; 100-500Mbps typical; current 500ms latency"
          },
          "legalEase": {
            "level": "moderate",
            "description": "Current residence; complications for Russian heritage"
          },
          "adventure": {
            "score": 6,
            "level": "moderate",
            "description": "Familiar territory; Baltic coastal access; limited new experiences"
          }
        }
      ]
    };
    
    try {
      // Use the data directly
      if (!data || !data.locations || !Array.isArray(data.locations)) {
        throw new Error('Invalid data structure');
      }
      
      // Store locations globally for sorting
      window.allLocations = [...data.locations];
      
      // Set correct cost levels
      window.allLocations.forEach(location => {
        if (location.name === "Hanoi, Vietnam") {
          location.costLevel = "exceptional";
        } else if (location.name === "Buenos Aires, Argentina" || location.name === "Sofia, Bulgaria") {
          location.costLevel = "excellent";
        }
      });
      
      // Render the table with default sorting
      renderTable(sortLocations(window.allLocations, currentSortColumn, currentSortDirection));
    } catch (error) {
      console.error('Error:', error);
      tableBody.innerHTML = `<tr><td colspan="13" style="text-align: center; color: #ff6b6b; padding: 40px;">
        Error: ${error.message}. Please check browser console for details.
      </td></tr>`;
    }
    
    function sortTable(columnName) {
      // Update sort direction if clicking the same column again
      if (columnName === currentSortColumn) {
        currentSortDirection = currentSortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        currentSortColumn = columnName;
        currentSortDirection = 'desc'; // Default to descending for new column
      }
      
      // Update sort indicators in headers
      headers.forEach(header => {
        const headerColumn = header.getAttribute('data-column');
        const indicator = header.querySelector('.sort-indicator');
        if (indicator) {
          indicator.innerHTML = headerColumn === currentSortColumn 
            ? (currentSortDirection === 'asc' ? ' ▲' : ' ▼') 
            : '';
        }
      });
      
      // Sort and render
      const sortedLocations = sortLocations(window.allLocations, currentSortColumn, currentSortDirection);
      renderTable(sortedLocations);
    }
    
    function sortLocations(locations, column, direction) {
      return [...locations].sort((a, b) => {
        let valueA, valueB;
        
        // Extract the correct values based on column
        switch(column) {
          case 'rating':
            valueA = a.rating;
            valueB = b.rating;
            break;
          case 'cost':
            valueA = getRatingValue(a.costLevel);
            valueB = getRatingValue(b.costLevel);
            break;
          case 'earnings':
            valueA = getRatingValue(a.earnings.level);
            valueB = getRatingValue(b.earnings.level);
            break;
          case 'financial':
            valueA = getRatingValue(a.financialOpportunities.level);
            valueB = getRatingValue(b.financialOpportunities.level);
            break;
          case 'food':
            valueA = a.foodQuality.score;
            valueB = b.foodQuality.score;
            break;
          case 'social':
            valueA = getRatingValue(a.socialOpportunities.level);
            valueB = getRatingValue(b.socialOpportunities.level);
            break;
          case 'quality':
            valueA = getRatingValue(a.qualityOfLife.level);
            valueB = getRatingValue(b.qualityOfLife.level);
            break;
          case 'benefits':
            valueA = getRatingValue(a.benefits.level);
            valueB = getRatingValue(b.benefits.level);
            break;
          case 'disadvantages':
            valueA = getRatingValue(a.disadvantages.level);
            valueB = getRatingValue(b.disadvantages.level);
            break;
          case 'internet':
            valueA = getRatingValue(a.internet.level);
            valueB = getRatingValue(b.internet.level);
            break;
          case 'legal':
            valueA = getRatingValue(a.legalEase.level);
            valueB = getRatingValue(b.legalEase.level);
            break;
          case 'adventure':
            valueA = a.adventure.score;
            valueB = b.adventure.score;
            break;
          default:
            valueA = a.rating;
            valueB = b.rating;
        }
        
        // Sort in the selected direction
        if (direction === 'asc') {
          return valueA - valueB;
        } else {
          return valueB - valueA;
        }
      });
    }
    
    function getRatingValue(ratingLevel) {
      // Convert rating levels to numeric values for sorting
      switch(ratingLevel) {
        case 'exceptional': return 5;
        case 'excellent': return 4;
        case 'very good': return 3;
        case 'good': return 2;
        case 'moderate': return 1;
        default: return 0;
      }
    }
    
    function renderTable(locations) {
      // Clear table body
      tableBody.innerHTML = '';
      
      // Create a row for each location
      locations.forEach(location => {
        const row = document.createElement('tr');
        row.className = 'location-row';
        
        // Add location name cell
        const nameCell = document.createElement('td');
        nameCell.style.fontWeight = 'bold';
        nameCell.style.color = location.textColor;
        nameCell.style.backgroundColor = location.color;
        nameCell.style.fontSize = '1.1em';
        nameCell.style.verticalAlign = 'middle';
        nameCell.style.textAlign = 'center';
        nameCell.style.borderRadius = '6px';
        nameCell.style.width = '180px';
        nameCell.textContent = location.name;
        row.appendChild(nameCell);
        
        // Add rating cell
        row.appendChild(createCell(
          location.ratingLevel,
          `${location.rating}/10`,
          '',
          `rating-${location.ratingLevel}`
        ));
        
        // Add cost of living cell
        row.appendChild(createCell(
          location.costLevel,
          `€${location.costOfLiving}`,
          '',
          `rating-${location.costLevel}`
        ));
        
        // Add potential earnings cell
        row.appendChild(createCell(
          location.earnings.level,
          `€${location.earnings.range}/day`,
          location.earnings.notes,
          `rating-${location.earnings.level}`
        ));
        
        // Add financial opportunities cell
        row.appendChild(createCell(
          location.financialOpportunities.level,
          '★★★★★'.substring(0, getRatingStars(location.financialOpportunities.level)),
          location.financialOpportunities.description,
          `rating-${location.financialOpportunities.level}`
        ));
        
        // Add food quality cell
        row.appendChild(createCell(
          location.foodQuality.level,
          `${location.foodQuality.score}/10`,
          location.foodQuality.description,
          `rating-${location.foodQuality.level}`
        ));
        
        // Add social opportunities cell
        row.appendChild(createCell(
          location.socialOpportunities.level,
          '★★★★★'.substring(0, getRatingStars(location.socialOpportunities.level)),
          location.socialOpportunities.description,
          `rating-${location.socialOpportunities.level}`
        ));
        
        // Add quality of life cell
        row.appendChild(createCell(
          location.qualityOfLife.level,
          '★★★★★'.substring(0, getRatingStars(location.qualityOfLife.level)),
          location.qualityOfLife.description,
          `rating-${location.qualityOfLife.level}`
        ));
        
        // Add benefits cell
        row.appendChild(createCell(
          location.benefits.level,
          '★★★★★'.substring(0, getRatingStars(location.benefits.level)),
          location.benefits.description,
          `rating-${location.benefits.level}`
        ));
        
        // Add disadvantages cell
        row.appendChild(createCell(
          location.disadvantages.level,
          '★★★★★'.substring(0, getRatingStars(location.disadvantages.level)),
          location.disadvantages.description,
          `rating-${location.disadvantages.level}`
        ));
        
        // Add internet cell
        row.appendChild(createCell(
          location.internet.level,
          '★★★★★'.substring(0, getRatingStars(location.internet.level)),
          location.internet.description,
          `rating-${location.internet.level}`
        ));
        
        // Add legal ease cell
        row.appendChild(createCell(
          location.legalEase.level,
          '★★★★★'.substring(0, getRatingStars(location.legalEase.level)),
          location.legalEase.description,
          `rating-${location.legalEase.level}`
        ));
        
        // Add adventure cell
        row.appendChild(createCell(
          location.adventure.level,
          `${location.adventure.score}/10`,
          location.adventure.description,
          `rating-${location.adventure.level}`
        ));
        
        // Add the row to the table
        tableBody.appendChild(row);
      });
    }
  
    function createCell(ratingText, valueText, descriptionText, ratingClass) {
      const cell = document.createElement('td');
      
      const content = document.createElement('div');
      content.className = 'cell-content';
      
      // Add rating element (now in uppercase with badge styling from CSS)
      const rating = document.createElement('div');
      rating.className = `cell-rating ${ratingClass || ''}`;
      rating.textContent = ratingText;
      content.appendChild(rating);
      
      // Add value element if provided
      if (valueText) {
        const value = document.createElement('div');
        value.className = 'cell-value';
        value.textContent = valueText;
        content.appendChild(value);
      }
      
      // Add description element if provided
      if (descriptionText) {
        const description = document.createElement('div');
        description.className = 'cell-description';
        description.textContent = descriptionText;
        content.appendChild(description);
      }
      
      cell.appendChild(content);
      return cell;
    }
    
    // Helper function to convert rating level to number of stars
    function getRatingStars(level) {
      return getRatingValue(level);
    }
  });