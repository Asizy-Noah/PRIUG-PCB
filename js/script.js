document.addEventListener('DOMContentLoaded', function() {
  // Gallery Variables
  let currentImageIndex = 0;
  const galleryModal = document.getElementById('gallery-modal');
  const galleryMainImage = document.getElementById('gallery-main-image');
  const galleryCounter = document.getElementById('gallery-counter');
  const galleryThumbnails = document.querySelectorAll('.gallery-thumbnail');
  const galleryPrevBtn = document.getElementById('gallery-prev-btn');
  const galleryNextBtn = document.getElementById('gallery-next-btn');
  const galleryCloseBtn = document.getElementById('gallery-close-btn');
  const galleryShareBtn = document.getElementById('gallery-share-btn');
  const galleryFavoriteBtn = document.getElementById('gallery-favorite-btn');
  
  // Desktop Gallery Elements
  const mainImageDesktop = document.getElementById('main-image-desktop');
  const thumbnailItems = document.querySelectorAll('.thumbnail-item');
  const viewAllMediaBtn = document.getElementById('view-all-media');
  
  // Mobile Gallery Elements
  const mobileGallerySlider = document.getElementById('mobile-gallery-slider');
  const mobileGallerySlides = document.querySelectorAll('.mobile-gallery-slide');
  const mobileGalleryCounter = document.getElementById('mobile-gallery-counter');

  // Handle mobile gallery scroll
  function handleMobileGalleryScroll() {
    const scrollPosition = mobileGallerySlider.scrollLeft;
    const slideWidth = mobileGallerySlider.offsetWidth;
    const currentIndex = Math.round(scrollPosition / slideWidth);
    updateMobileGalleryCounter(currentIndex);
  }
  
  // Update mobile gallery counter
  function updateMobileGalleryCounter(index) {
    if (index >= 0 && index < mobileGallerySlides.length) {
      mobileGalleryCounter.textContent = `${index + 1}/${mobileGallerySlides.length}`;
    }
  }

  // Add event listeners to gallery thumbnails
  galleryThumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => selectGalleryImage(index));
  });
  
  // Add event listeners to mobile gallery slides
  mobileGallerySlides.forEach((slide, index) => {
    slide.addEventListener('click', () => openGalleryModal(index));
  });
  
  // Add scroll event listener to mobile gallery
  mobileGallerySlider.addEventListener('scroll', handleMobileGalleryScroll);
  
  // Add event listeners to gallery controls
  galleryPrevBtn.addEventListener('click', prevGalleryImage);
  galleryNextBtn.addEventListener('click', nextGalleryImage);
  galleryCloseBtn.addEventListener('click', closeGalleryModal);
  galleryShareBtn.addEventListener('click', shareProperty);
  galleryFavoriteBtn.addEventListener('click', toggleFavorite);
  
  // Add keyboard navigation
  document.addEventListener('keydown', handleGalleryKeydown);
  
  // Open Gallery Modal
  function openGalleryModal(index) {
    currentImageIndex = index || 0;
    updateGalleryModal();
    galleryModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  }
  
  // Close Gallery Modal
  function closeGalleryModal() {
    galleryModal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
  }
  
  // Select Gallery Image
  function selectGalleryImage(index) {
    currentImageIndex = index;
    updateGalleryModal();
  }
  
  // Next Gallery Image
  function nextGalleryImage() {
    currentImageIndex = (currentImageIndex === galleryThumbnails.length - 1) ? 0 : currentImageIndex + 1;
    updateGalleryModal();
  }
  
  // Previous Gallery Image
  function prevGalleryImage() {
    currentImageIndex = (currentImageIndex === 0) ? galleryThumbnails.length - 1 : currentImageIndex - 1;
    updateGalleryModal();
  }
  
  // Update Gallery Modal
  function updateGalleryModal() {
    // Update main image
    galleryMainImage.src = galleryThumbnails[currentImageIndex].querySelector('img').src;
    
    // Update counter
    galleryCounter.textContent = `${currentImageIndex + 1}/${galleryThumbnails.length}`;
    
    // Update thumbnails
    galleryThumbnails.forEach((thumbnail, index) => {
      if (index === currentImageIndex) {
        thumbnail.classList.add('active');
        // Scroll thumbnail into view
        thumbnail.scrollIntoView({ behavior: 'smooth', inline: 'center' });
      } else {
        thumbnail.classList.remove('active');
      }
    });
  }
  
  // Handle Gallery Keydown
  function handleGalleryKeydown(e) {
    if (!galleryModal.classList.contains('active')) return;
    
    switch (e.key) {
      case 'ArrowLeft':
        prevGalleryImage();
        break;
      case 'ArrowRight':
        nextGalleryImage();
        break;
      case 'Escape':
        closeGalleryModal();
        break;
    }
  }
  
  // Share Property
  function shareProperty() {
    if (navigator.share) {
      navigator.share({
        title: "Modern Luxury Apartment in City Center",
        text: "Check out this property: Modern Luxury Apartment in City Center",
        url: window.location.href
      })
      .catch(error => console.log('Error sharing:', error));
    } else {
      alert('Share feature is not supported in your browser');
    }
  }
  
  // Toggle Favorite
  function toggleFavorite() {
    const isFavorite = galleryFavoriteBtn.querySelector('i').classList.contains('fas');
    
    if (isFavorite) {
      galleryFavoriteBtn.innerHTML = '<i class="far fa-heart"></i>';
    } else {
      galleryFavoriteBtn.innerHTML = '<i class="fas fa-heart" style="color: red;"></i>';
    }
  }

  // Add event listeners to desktop gallery
  mainImageDesktop.addEventListener('click', () => openGalleryModal(0));
  
  thumbnailItems.forEach((item, index) => {
    if (index < 4) {
      item.addEventListener('click', () => {
        if (index === 3) {
          // View all media button is in the last thumbnail
          openGalleryModal(0);
        } else {
          openGalleryModal(index + 1);
        }
      });
    }
  });
  
  // Add event listener to view all media button
  if (viewAllMediaBtn) {
    viewAllMediaBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent triggering the parent's click event
      openGalleryModal(0);
    });
  }

  // Features and Amenities Toggle
  const toggleFeaturesBtn = document.getElementById('toggle-features');
  const toggleAmenitiesBtn = document.getElementById('toggle-amenities');
  const hiddenFeatures = document.querySelectorAll('#features-list .hidden-feature');
  const hiddenAmenities = document.querySelectorAll('#amenities-list .hidden-feature');
  let showAllFeatures = false;
  let showAllAmenities = false;

  toggleFeaturesBtn.addEventListener('click', () => {
    showAllFeatures = !showAllFeatures;
    hiddenFeatures.forEach(feature => {
      feature.style.display = showAllFeatures ? 'flex' : 'none';
    });
    toggleFeaturesBtn.textContent = showAllFeatures ? 'Show Less' : 'Show All Features';
  });

  toggleAmenitiesBtn.addEventListener('click', () => {
    showAllAmenities = !showAllAmenities;
    hiddenAmenities.forEach(amenity => {
      amenity.style.display = showAllAmenities ? 'flex' : 'none';
    });
    toggleAmenitiesBtn.textContent = showAllAmenities ? 'Show Less' : 'Show All Amenities';
  });

  // Map and Nearby Facilities
  let mapInitialized = false;
  let map;
  let markers = [];
  let infoWindow;
  let activeType = null;
  const nearbyMessage = document.getElementById('nearby-message');
  const facilityGroups = document.querySelectorAll('.facility-group');
  const nearbyFacilitiesContainer = document.getElementById('nearby-facilities');

  // Global variable to track if map is ready to initialize
  window.mapReady = false;
  window.mapInitialized = false;

  // Function to initialize map when Google Maps API is loaded
  window.initMapWhenReady = function() {
    window.mapReady = true;
    // Initialize map if we're on the page
    if (document.getElementById('property-map') && !window.mapInitialized) {
      initMap();
    }
  };

  // Helper function to clear markers from the map
  function clearMarkers() {
    markers.forEach(marker => {
      marker.setMap(null);
    });
    markers = [];
  }

  // Helper function to get the appropriate icon class for a facility type
  function getFacilityIconClass(type) {
    switch (type) {
      case 'school':
        return 'fas fa-graduation-cap';
      case 'restaurant':
        return 'fas fa-utensils';
      case 'transit_station':
        return 'fas fa-train';
      case 'supermarket':
        return 'fas fa-shopping-cart';
      case 'park':
        return 'fas fa-tree';
      case 'hospital':
        return 'fas fa-hospital';
      default:
        return 'fas fa-map-marker-alt';
    }
  }

  // Helper function to get the appropriate color for a facility type
  function getColorForType(type) {
    switch (type) {
      case 'school':
        return '#f44336'; // Red
      case 'restaurant':
        return '#e91e63'; // Pink
      case 'transit_station':
        return '#9c27b0'; // Purple
      case 'supermarket':
        return '#3f51b5'; // Indigo
      case 'park':
        return '#4caf50'; // Green
      case 'hospital':
        return '#00bcd4'; // Cyan
      default:
        return '#607d8b'; // Blue Grey
    }
  }

  // Helper function to get the facility name
  function getFacilityTypeName(type) {
    switch (type) {
      case 'school':
        return 'Schools';
      case 'restaurant':
        return 'Restaurants';
      case 'transit_station':
        return 'Transit Stations';
      case 'supermarket':
        return 'Supermarkets';
      case 'park':
        return 'Parks';
      case 'hospital':
        return 'Hospitals';
      default:
        return 'Facilities';
    }
  }

  // Update the initMap function to use AdvancedMarkerElement and custom icons
  function initMap() {
    if (!window.mapReady) {
      console.log('Google Maps API not yet loaded. Map will initialize when API is ready.');
      return;
    }

    if (window.mapInitialized) {
      return;
    }

    window.mapInitialized = true;
    mapInitialized = true;

    // Initialize map
    map = new google.maps.Map(document.getElementById('property-map'), {
      center: { lat: 1.3521, lng: 103.8198 },
      zoom: 15,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true,
      zoomControl: true,
      styles: [
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [{ visibility: "off" }]
        }
      ]
    });
    
    // Create info window
    infoWindow = new google.maps.InfoWindow();
    
    // Add property marker using AdvancedMarkerElement if available
    if (typeof google !== 'undefined' && google.maps.marker && google.maps.marker.AdvancedMarkerElement) {
      // Use AdvancedMarkerElement (newer API)
      const markerElement = document.createElement('div');
      markerElement.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; background-color: #2e7d32; color: white; border-radius: 50%; box-shadow: 0 2px 6px rgba(0,0,0,0.3);">
          <i class="fas fa-home" style="font-size: 18px;"></i>
        </div>
      `;
      
      const propertyMarker = new google.maps.marker.AdvancedMarkerElement({
        map: map,
        position: { lat: 1.3521, lng: 103.8198 },
        content: markerElement,
        title: "Modern Luxury Apartment in City Center",
        zIndex: 999
      });
      
      propertyMarker.addListener('click', () => {
        infoWindow.setContent(`
          <div style="padding: 10px; max-width: 200px;">
            <h3 style="margin: 0 0 5px; font-size: 16px;">Modern Luxury Apartment in City Center</h3>
            <p style="margin: 0; font-size: 14px;">123 Urban Street, Downtown, City 12345</p>
          </div>
        `);
        infoWindow.open(map, propertyMarker);
      });
    } else {
      // Fallback to traditional Marker
      const propertyMarker = new google.maps.Marker({
        position: { lat: 1.3521, lng: 103.8198 },
        map: map,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 15,
          fillColor: "#2e7d32",
          fillOpacity: 1,
          strokeColor: "#ffffff",
          strokeWeight: 2
        },
        title: "Modern Luxury Apartment in City Center",
        zIndex: 999
      });
      
      propertyMarker.addListener('click', () => {
        infoWindow.setContent(`
          <div style="padding: 10px; max-width: 200px;">
            <h3 style="margin: 0 0 5px; font-size: 16px;">Modern Luxury Apartment in City Center</h3>
            <p style="margin: 0; font-size: 14px;">123 Urban Street, Downtown, City 12345</p>
          </div>
        `);
        infoWindow.open(map, propertyMarker);
      });
    }
    
    // Initialize map toggle buttons
    initMapToggleButtons();
  }

  // Function to dynamically create facility list
  function createFacilityList(type, facilities) {
    // Create a container for the facilities
    const facilityList = document.createElement('div');
    facilityList.className = 'facility-group';
    facilityList.id = `${type}-facilities`;
    
    // Add a heading for the facility type
    const heading = document.createElement('h4');
    heading.className = 'facility-type-heading';
    heading.innerHTML = `<i class="${getFacilityIconClass(type)}" style="color: ${getColorForType(type)};"></i> Nearby ${getFacilityTypeName(type)}`;
    facilityList.appendChild(heading);
    
    // Add each facility to the list
    facilities.forEach(facility => {
      const facilityItem = document.createElement('div');
      facilityItem.className = 'nearby-item';
      
      facilityItem.innerHTML = `
        <div class="nearby-name">
          <i class="${getFacilityIconClass(type)} nearby-icon" style="color: ${getColorForType(type)};"></i>
          <span>${facility.name}</span>
        </div>
        <div class="nearby-details">
          <span class="nearby-distance">${facility.distance}</span>
          <span class="nearby-rating">${getRatingStars(facility.rating)}</span>
        </div>
      `;
      
      // Add hover effect to highlight corresponding marker
      facilityItem.addEventListener('mouseenter', () => {
        // Find the corresponding marker and highlight it
        markers.forEach(marker => {
          if (marker.title === facility.name) {
            if (marker.setAnimation) {
              marker.setAnimation(google.maps.Animation.BOUNCE);
            }
          }
        });
      });
      
      facilityItem.addEventListener('mouseleave', () => {
        // Reset marker animation
        markers.forEach(marker => {
          if (marker.setAnimation) {
            marker.setAnimation(null);
          }
        });
      });
      
      facilityList.appendChild(facilityItem);
    });
    
    return facilityList;
  }

  // Helper function to convert rating to stars
  function getRatingStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    let stars = '';
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars += '★';
    }
    
    // Add half star if needed
    if (halfStar) {
      stars += '½';
    }
    
    // Add empty stars
    for (let i = 0; i < emptyStars; i++) {
      stars += '☆';
    }
    
    return stars;
  }

  // Function to show nearby facilities on the map
  function showNearbyFacilities(type) {
    // Clear existing markers
    clearMarkers();
    
    // Clear existing facility lists
    while (nearbyFacilitiesContainer.firstChild) {
      nearbyFacilitiesContainer.removeChild(nearbyFacilitiesContainer.firstChild);
    }
    
    // If no type selected, show default message
    if (!type) {
      const defaultMessage = document.createElement('p');
      defaultMessage.id = 'nearby-message';
      defaultMessage.textContent = 'Select a facility type above to see nearby locations';
      nearbyFacilitiesContainer.appendChild(defaultMessage);
      return;
    }
    
    // Get facilities data based on type
    let facilities = [];
    switch (type) {
      case 'school':
        facilities = [
          { name: "Central Elementary School", distance: "0.3 miles", rating: 4.5, lat: 1.3531, lng: 103.8208 },
          { name: "Downtown High School", distance: "0.7 miles", rating: 4.2, lat: 1.3541, lng: 103.8218 }
        ];
        break;
      case 'restaurant':
        facilities = [
          { name: "Urban Bistro", distance: "0.2 miles", rating: 4.7, lat: 1.3526, lng: 103.8188 },
          { name: "City Cafe", distance: "0.3 miles", rating: 4.3, lat: 1.3516, lng: 103.8178 },
          { name: "Gourmet Kitchen", distance: "0.4 miles", rating: 4.8, lat: 1.3536, lng: 103.8168 }
        ];
        break;
      case 'transit_station':
        facilities = [
          { name: "Central Station", distance: "0.1 miles", rating: 4.5, lat: 1.3511, lng: 103.8208 },
          { name: "Downtown Bus Terminal", distance: "0.4 miles", rating: 4.0, lat: 1.3501, lng: 103.8218 }
        ];
        break;
      case 'supermarket':
        facilities = [
          { name: "Fresh Market", distance: "0.2 miles", rating: 4.6, lat: 1.3531, lng: 103.8178 },
          { name: "City Grocers", distance: "0.5 miles", rating: 4.2, lat: 1.3541, lng: 103.8168 }
        ];
        break;
      case 'park':
        facilities = [
          { name: "Central Park", distance: "0.5 miles", rating: 4.8, lat: 1.3551, lng: 103.8208 },
          { name: "Riverside Gardens", distance: "0.8 miles", rating: 4.7, lat: 1.3561, lng: 103.8218 }
        ];
        break;
      case 'hospital':
        facilities = [
          { name: "City General Hospital", distance: "1.2 miles", rating: 4.4, lat: 1.3571, lng: 103.8208 },
          { name: "Downtown Medical Center", distance: "1.5 miles", rating: 4.6, lat: 1.3581, lng: 103.8218 }
        ];
        break;
    }
    
    // Create and add the facility list to the container
    const facilityList = createFacilityList(type, facilities);
    nearbyFacilitiesContainer.appendChild(facilityList);
    
    // Add markers for facilities
    const bounds = new google.maps.LatLngBounds();
    bounds.extend({ lat: 1.3521, lng: 103.8198 }); // Property location
    
    const iconClass = getFacilityIconClass(type);
    const iconColor = getColorForType(type);
    
    facilities.forEach(facility => {
      const position = { lat: facility.lat, lng: facility.lng };
      
      // Create marker using AdvancedMarkerElement if available
      if (typeof google !== 'undefined' && google.maps.marker && google.maps.marker.AdvancedMarkerElement) {
        // Use AdvancedMarkerElement (newer API) with custom icon
        const markerElement = document.createElement('div');
        markerElement.innerHTML = `
          <div style="display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; background-color: ${iconColor}; color: white; border-radius: 50%; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">
            <i class="${iconClass}" style="font-size: 14px;"></i>
          </div>
        `;
        
        const marker = new google.maps.marker.AdvancedMarkerElement({
          map: map,
          position: position,
          content: markerElement,
          title: facility.name
        });
        
        marker.addListener('click', () => {
          infoWindow.setContent(`
            <div style="padding: 10px; max-width: 200px;">
              <h3 style="margin: 0 0 5px; font-size: 16px;">${facility.name}</h3>
              <p style="margin: 0 0 3px; font-size: 14px;">Distance: ${facility.distance}</p>
              <p style="margin: 0; font-size: 14px;">Rating: ${getRatingStars(facility.rating)}</p>
            </div>
          `);
          infoWindow.open(map, marker);
        });
        
        // Add to markers array
        markers.push(marker);
      } else {
        // Fallback to traditional Marker with custom SVG icon
        const svgMarker = {
          path: 'M12,2C8.13,2 5,5.13 5,9c0,5.25 7,13 7,13s7,-7.75 7,-13c0,-3.87 -3.13,-7 -7,-7zM12,11.5c-1.38,0 -2.5,-1.12 -2.5,-2.5s1.12,-2.5 2.5,-2.5 2.5,1.12 2.5,2.5 -1.12,2.5 -2.5,2.5z',
          fillColor: iconColor,
          fillOpacity: 1,
          strokeWeight: 1,
          strokeColor: '#FFFFFF',
          rotation: 0,
          scale: 1.5,
          anchor: new google.maps.Point(12, 22),
        };
        
        const marker = new google.maps.Marker({
          position: position,
          map: map,
          title: facility.name,
          icon: svgMarker
        });
        
        // Add info window
        marker.addListener('click', () => {
          infoWindow.setContent(`
            <div style="padding: 10px; max-width: 200px;">
              <h3 style="margin: 0 0 5px; font-size: 16px;">${facility.name}</h3>
              <p style="margin: 0 0 3px; font-size: 14px;">Distance: ${facility.distance}</p>
              <p style="margin: 0; font-size: 14px;">Rating: ${getRatingStars(facility.rating)}</p>
            </div>
          `);
          infoWindow.open(map, marker);
        });
        
        // Add to markers array
        markers.push(marker);
      }
      
      // Add to bounds
      bounds.extend(position);
    });
    
    // Fit map to bounds
    map.fitBounds(bounds);
  }

  // Initialize map toggle buttons
  function initMapToggleButtons() {
    const toggleButtons = document.querySelectorAll('.map-toggle-btn');
    toggleButtons.forEach(button => {
      button.addEventListener('click', () => {
        const facilityType = button.getAttribute('data-type');
        
        // Toggle active state
        if (activeType === facilityType) {
          // Deactivate if already active
          button.classList.remove('active');
          clearMarkers();
          showNearbyFacilities(null);
          activeType = null;
        } else {
          // Activate new type
          toggleButtons.forEach(btn => btn.classList.remove('active'));
          button.classList.add('active');
          
          // Show facilities of this type
          showNearbyFacilities(facilityType);
          activeType = facilityType;
        }
      });
    });
  }

  // Save/Favorite Button
  const saveButton = document.getElementById('save-button');
  let isFavorite = false;

  saveButton.addEventListener('click', () => {
    isFavorite = !isFavorite;
    
    if (isFavorite) {
      saveButton.innerHTML = `
        <i class="fas fa-heart icon" style="color: red;"></i>
        Saved
      `;
      saveButton.style.color = 'red';
    } else {
      saveButton.innerHTML = `
        <i class="far fa-heart icon"></i>
        Save
      `;
      saveButton.style.color = '';
    }
  });

  // Inquiry Form
  const showInquiryFormBtn = document.getElementById('show-inquiry-form');
  const cancelInquiryBtn = document.getElementById('cancel-inquiry');
  const inquiryForm = document.getElementById('inquiry-form');
  const agentContactInfo = document.getElementById('agent-contact-info');

  showInquiryFormBtn.addEventListener('click', () => {
    inquiryForm.classList.remove('hidden');
    agentContactInfo.classList.add('hidden');
  });

  cancelInquiryBtn.addEventListener('click', () => {
    inquiryForm.classList.add('hidden');
    agentContactInfo.classList.remove('hidden');
  });

  inquiryForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Your inquiry has been sent to the agent!');
    inquiryForm.classList.add('hidden');
    agentContactInfo.classList.remove('hidden');
  });

  // Initialize map if it's on the page
  if (window.mapReady && document.getElementById('property-map')) {
    initMap();
  }
});