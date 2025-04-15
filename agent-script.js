document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const header = document.getElementById('header');
    const sidebar = document.getElementById('sidebar');
    const navItems = document.querySelectorAll('.nav-item');
    const propertyTables = document.querySelectorAll('.property-table-container');
    
    // Last scroll position
    let lastScrollTop = 0;
    
    // Handle scroll events
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Header scroll behavior
        if (scrollTop > lastScrollTop && scrollTop > 50) {
            // Scrolling down
            header.classList.add('scrolled');
        } else {
            // Scrolling up
            header.classList.remove('scrolled');
        }
        
        // Mobile sidebar sticky behavior
        if (window.innerWidth <= 767) {
            const headerHeight = header.offsetHeight;
            const sidebarTop = sidebar.getBoundingClientRect().top;
            
            if (sidebarTop <= 0) {
                sidebar.classList.add('sticky');
            } else if (scrollTop <= headerHeight) {
                sidebar.classList.remove('sticky');
            }
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Navigation click handler
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Update active state
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding table
            const type = this.getAttribute('data-type');
            propertyTables.forEach(table => {
                table.style.display = 'none';
            });
            document.getElementById(`${type}-table`).style.display = 'block';
        });
    });
    
    // Add property button click handler
    const addPropertyBtn = document.querySelector('.add-property-btn');
    if (addPropertyBtn) {
        addPropertyBtn.addEventListener('click', function() {
            alert('Add property form will open here');
            // Implement your add property functionality here
        });
    }
    
    // Edit button click handler
    const editButtons = document.querySelectorAll('.action-btn.edit');
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const title = row.querySelector('td:nth-child(2)').textContent;
            alert(`Edit property: ${title}`);
            // Implement your edit functionality here
        });
    });
    
    // Delete button click handler
    const deleteButtons = document.querySelectorAll('.action-btn.delete');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const title = row.querySelector('td:nth-child(2)').textContent;
            if (confirm(`Are you sure you want to delete "${title}"?`)) {
                alert(`Property "${title}" deleted successfully`);
                // Implement your delete functionality here
                // row.remove(); // Uncomment to remove the row from the table
            }
        });
    });
    
    // Initialize the first tab as active
    navItems[0].classList.add('active');
    propertyTables[0].style.display = 'block';
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 767) {
            sidebar.classList.remove('sticky');
        }
    });

    // DOM Elements
    const editImgBtn = document.getElementById('edit-img-btn');
    const imgUpload = document.getElementById('img-upload');
    const profileImg = document.getElementById('profile-img');
    const editNameBtn = document.getElementById('edit-name-btn');
    const profileName = document.getElementById('profile-name');
    const saveNameBtn = document.getElementById('saveNameBtn');
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const loadMoreBtn = document.querySelector('.load-more-btn');
    
    // Bootstrap Modal
    const editNameModalElement = document.getElementById('editNameModal');
    const editNameModal = editNameModalElement ? new bootstrap.Modal(editNameModalElement) : null;
    
    // Edit Profile Image
    if (editImgBtn && imgUpload && profileImg) {
        editImgBtn.addEventListener('click', function() {
            imgUpload.click();
        });
        
        imgUpload.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    profileImg.src = e.target.result;
                    
                    // Here you would typically upload the image to your server
                    // This is a placeholder for that functionality
                    showNotification('Profile picture updated successfully!');
                };
                
                reader.readAsDataURL(file);
            }
        });
    }
    
    // Edit Agent Name
    if (editNameBtn && profileName) {
        editNameBtn.addEventListener('click', function() {
            // Parse current name to populate the form
            const fullName = profileName.textContent.trim();
            const nameParts = fullName.split(' ');
            
            if (nameParts.length >= 2) {
                firstNameInput.value = nameParts[0];
                lastNameInput.value = nameParts.slice(1).join(' ');
            } else {
                firstNameInput.value = fullName;
                lastNameInput.value = '';
            }
            
            // Show the modal
            if (editNameModal) {
                editNameModal.show();
            }
        });
    }
    
    // Save Name Changes
    if (saveNameBtn) {
        saveNameBtn.addEventListener('click', function() {
            const firstName = firstNameInput.value.trim();
            const lastName = lastNameInput.value.trim();
            
            if (firstName) {
                const fullName = lastName ? `${firstName} ${lastName}` : firstName;
                profileName.textContent = fullName;
                
                // Here you would typically save the name to your server
                // This is a placeholder for that functionality
                showNotification('Agent name updated successfully!');
                
                // Close the modal
                if (editNameModal) {
                    editNameModal.hide();
                }
            } else {
                alert('First name is required');
            }
        });
    }
    
    // Load More Reviews
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // Show loading state
            this.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> Loading...';
            this.disabled = true;
            
            // Simulate loading delay
            setTimeout(() => {
                // Add more reviews (in a real app, this would fetch from an API)
                addMoreReviews();
                
                // Reset button state
                this.innerHTML = '<i class="fas fa-spinner me-2"></i> Load More Reviews';
                this.disabled = false;
            }, 1500);
        });
    }
    
    // Function to add more reviews (for demo purposes)
    function addMoreReviews() {
        const reviewsBody = document.querySelector('.reviews-body');
        
        // Sample review data
        const newReviews = [
            {
                name: "David Thompson",
                date: "July 28, 2023",
                rating: 5,
                content: "John is an exceptional agent. He helped us find our vacation home within our budget. His attention to detail and negotiation skills are outstanding.",
                property: "Beach House in Hampton",
                img: "https://via.placeholder.com/50"
            },
            {
                name: "Jennifer Lee",
                date: "July 15, 2023",
                rating: 4,
                content: "Very professional and knowledgeable about the market. John was always responsive and made the whole process much easier for us as first-time buyers.",
                property: "Cozy Studio in SoHo",
                img: "https://via.placeholder.com/50"
            },
            {
                name: "Robert Garcia",
                date: "June 30, 2023",
                rating: 5,
                content: "We had a great experience working with John. He was patient, understanding, and really listened to what we were looking for in a property.",
                property: "Townhouse in Greenwich Village",
                img: "https://via.placeholder.com/50"
            }
        ];
        
        // Create and append new review elements
        newReviews.forEach(review => {
            const reviewItem = document.createElement('div');
            reviewItem.className = 'review-item';
            
            // Generate stars based on rating
            let starsHTML = '';
            for (let i = 1; i <= 5; i++) {
                if (i <= review.rating) {
                    starsHTML += '<i class="fas fa-star"></i>';
                } else if (i - 0.5 === review.rating) {
                    starsHTML += '<i class="fas fa-star-half-alt"></i>';
                } else {
                    starsHTML += '<i class="far fa-star"></i>';
                }
            }
            
            reviewItem.innerHTML = `
                <div class="review-header">
                    <div class="reviewer-info">
                        <img src="${review.img}" alt="Reviewer" class="reviewer-img">
                        <div>
                            <h5 class="reviewer-name">${review.name}</h5>
                            <span class="review-date">${review.date}</span>
                        </div>
                    </div>
                    <div class="review-rating">
                        ${starsHTML}
                    </div>
                </div>
                <div class="review-content">
                    <p>${review.content}</p>
                </div>
                <div class="review-property">
                    <span>Property: </span>
                    <a href="#">${review.property}</a>
                </div>
            `;
            
            reviewsBody.appendChild(reviewItem);
        });
    }
    
    // Function to show notification
    function showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-check-circle"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Add styles
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.right = '20px';
        notification.style.backgroundColor = 'var(--primary)';
        notification.style.color = 'white';
        notification.style.padding = '12px 20px';
        notification.style.borderRadius = 'var(--radius-sm)';
        notification.style.boxShadow = 'var(--shadow-hover)';
        notification.style.zIndex = '9999';
        notification.style.display = 'flex';
        notification.style.alignItems = 'center';
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(20px)';
        notification.style.transition = 'opacity 0.3s, transform 0.3s';
        
        // Add to body
        document.body.appendChild(notification);
        
        // Trigger animation
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        }, 10);
        
        // Remove after delay
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(20px)';
            
            // Remove from DOM after animation
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Form navigation
    const formNavItems = document.querySelectorAll('.form-nav-item');
    const formSections = document.querySelectorAll('.form-section');
    const nextButtons = document.querySelectorAll('.next-btn');
    const prevButtons = document.querySelectorAll('.prev-btn');
    
    // Image upload
    const mainImageInput = document.getElementById('mainImage');
    const mainImagePreview = document.getElementById('mainImagePreview');
    const additionalImagesInput = document.getElementById('additionalImages');
    const additionalImagesPreview = document.getElementById('additionalImagesPreview');
    
    // Form submission
    const propertyForm = document.getElementById('propertyForm');
    const submitPropertyBtn = document.getElementById('submitProperty');
    const saveAsDraftBtn = document.getElementById('saveAsDraft');
    const confirmSubmitBtn = document.getElementById('confirmSubmit');
    
    // Bootstrap Modal
    const propertySummaryModalElement = document.getElementById('propertySummaryModal');
    const propertySummaryModal = propertySummaryModalElement ? new bootstrap.Modal(propertySummaryModalElement) : null;
    
    // Form navigation
    formNavItems.forEach(item => {
        item.addEventListener('click', function() {
            const targetSection = this.getAttribute('data-section');
            
            // Update active nav item
            formNavItems.forEach(navItem => navItem.classList.remove('active'));
            this.classList.add('active');
            
            // Show target section
            formSections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetSection) {
                    section.classList.add('active');
                }
            });
        });
    });
    
    // Next button navigation
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            const nextSection = this.getAttribute('data-next');
            
            // Validate current section before proceeding
            const currentSection = this.closest('.form-section');
            if (validateSection(currentSection)) {
                // Update active nav item
                formNavItems.forEach(navItem => {
                    navItem.classList.remove('active');
                    if (navItem.getAttribute('data-section') === nextSection) {
                        navItem.classList.add('active');
                    }
                });
                
                // Show next section
                formSections.forEach(section => {
                    section.classList.remove('active');
                    if (section.id === nextSection) {
                        section.classList.add('active');
                    }
                });
                
                // Scroll to top
                window.scrollTo(0, 0);
            }
        });
    });
    
    // Previous button navigation
    prevButtons.forEach(button => {
        button.addEventListener('click', function() {
            const prevSection = this.getAttribute('data-prev');
            
            // Update active nav item
            formNavItems.forEach(navItem => {
                navItem.classList.remove('active');
                if (navItem.getAttribute('data-section') === prevSection) {
                    navItem.classList.add('active');
                }
            });
            
            // Show previous section
            formSections.forEach(section => {
                section.classList.remove('active');
                if (section.id === prevSection) {
                    section.classList.add('active');
                }
            });
            
            // Scroll to top
            window.scrollTo(0, 0);
        });
    });
    
    // Main image upload
    if (mainImageInput) {
        mainImageInput.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    mainImagePreview.innerHTML = `
                        <img src="${e.target.result}" alt="Main property image">
                    `;
                };
                
                reader.readAsDataURL(file);
            }
        });
    }
    
    // Additional images upload
    if (additionalImagesInput) {
        additionalImagesInput.addEventListener('change', function() {
            const files = this.files;
            
            if (files.length > 0) {
                // Get current number of images
                const currentImages = additionalImagesPreview.querySelectorAll('.additional-image-item').length;
                
                // Limit total images to 10
                const maxImages = 10 - currentImages;
                const filesToProcess = Math.min(files.length, maxImages);
                
                for (let i = 0; i < filesToProcess; i++) {
                    const file = files[i];
                    const reader = new FileReader();
                    
                    reader.onload = function(e) {
                        const imageItem = document.createElement('div');
                        imageItem.className = 'additional-image-item';
                        imageItem.innerHTML = `
                            <img src="${e.target.result}" alt="Additional property image">
                            <span class="remove-image"><i class="fas fa-times"></i></span>
                        `;
                        
                        // Insert before the placeholder
                        additionalImagesPreview.insertBefore(imageItem, additionalImagesPreview.firstChild);
                        
                        // Add event listener to remove button
                        imageItem.querySelector('.remove-image').addEventListener('click', function() {
                            additionalImagesPreview.removeChild(imageItem);
                        });
                    };
                    
                    reader.readAsDataURL(file);
                }
                
                // Show warning if too many files were selected
                if (files.length > maxImages) {
                    alert(`You can only upload a maximum of 10 images. Only the first ${maxImages} images have been added.`);
                }
            }
        });
    }
    
    // Form submission
    if (propertyForm) {
        propertyForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate all sections
            if (validateForm()) {
                // Generate and show property summary
                generatePropertySummary();
                if (propertySummaryModal) {
                    propertySummaryModal.show();
                }
            }
        });
    }
    
    // Save as draft
    if (saveAsDraftBtn) {
        saveAsDraftBtn.addEventListener('click', function() {
            // Here you would typically save the form data to localStorage or send to server
            alert('Property saved as draft successfully!');
        });
    }
    
    // Confirm submission
    if (confirmSubmitBtn) {
        confirmSubmitBtn.addEventListener('click', function() {
            // Here you would typically submit the form data to the server
            alert('Property submitted successfully!');
            if (propertySummaryModal) {
                propertySummaryModal.hide();
            }
            
            // Redirect to properties list
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        });
    }
    
    // Validate section
    function validateSection(section) {
        const requiredFields = section.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('is-invalid');
                
                // Add event listener to remove invalid class when field is filled
                field.addEventListener('input', function() {
                    if (this.value.trim()) {
                        this.classList.remove('is-invalid');
                    }
                }, { once: true });
            } else {
                field.classList.remove('is-invalid');
            }
        });
        
        if (!isValid) {
            alert('Please fill in all required fields before proceeding.');
        }
        
        return isValid;
    }
    
    // Validate entire form
    function validateForm() {
        const requiredFields = document.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('is-invalid');
                
                // Add event listener to remove invalid class when field is filled
                field.addEventListener('input', function() {
                    if (this.value.trim()) {
                        this.classList.remove('is-invalid');
                    }
                }, { once: true });
            } else {
                field.classList.remove('is-invalid');
            }
        });
        
        if (!isValid) {
            alert('Please fill in all required fields before submitting.');
            
            // Navigate to the first section with invalid fields
            const invalidField = document.querySelector('.is-invalid');
            if (invalidField) {
                const invalidSection = invalidField.closest('.form-section');
                if (invalidSection) {
                    const sectionId = invalidSection.id;
                    
                    // Update active nav item
                    formNavItems.forEach(navItem => {
                        navItem.classList.remove('active');
                        if (navItem.getAttribute('data-section') === sectionId) {
                            navItem.classList.add('active');
                        }
                    });
                    
                    // Show section with invalid field
                    formSections.forEach(section => {
                        section.classList.remove('active');
                        if (section.id === sectionId) {
                            section.classList.add('active');
                        }
                    });
                }
            }
        }
        
        return isValid;
    }
    
    // Generate property summary
    function generatePropertySummary() {
        const summaryContent = document.getElementById('propertySummaryContent');
        
        // Get form values
        const propertyTitle = document.getElementById('propertyTitle').value;
        const propertyType = document.getElementById('propertyType').options[document.getElementById('propertyType').selectedIndex].text;
        const listingType = document.getElementById('listingType').options[document.getElementById('listingType').selectedIndex].text;
        const price = document.getElementById('price').value;
        const priceType = document.getElementById('priceType').options[document.getElementById('priceType').selectedIndex].text;
        const bedrooms = document.getElementById('bedrooms').value;
        const bathrooms = document.getElementById('bathrooms').value;
        const size = document.getElementById('size').value;
        const address = document.getElementById('address').value;
        const city = document.getElementById('city').value;
        const state = document.getElementById('state').value;
        const zipCode = document.getElementById('zipCode').value;
        const description = document.getElementById('propertyDescription').value;
        
        // Get selected features
        const selectedFeatures = [];
        document.querySelectorAll('input[name="features"]:checked').forEach(checkbox => {
            selectedFeatures.push(checkbox.parentElement.querySelector('label').textContent.trim());
        });
        
        // Get selected amenities
        const selectedAmenities = [];
        document.querySelectorAll('input[name="amenities"]:checked').forEach(checkbox => {
            selectedAmenities.push(checkbox.parentElement.querySelector('label').textContent.trim());
        });
        
        // Get main image
        let mainImageSrc = '';
        const mainImageElement = mainImagePreview.querySelector('img');
        if (mainImageElement) {
            mainImageSrc = mainImageElement.src;
        }
        
        // Get additional images
        const additionalImageSrcs = [];
        additionalImagesPreview.querySelectorAll('.additional-image-item img').forEach(img => {
            additionalImageSrcs.push(img.src);
        });
        
        // Build summary HTML
        let summaryHTML = `
            <div class="property-summary">
                <div class="summary-section">
                    <h4 class="summary-section-title">Basic Information</h4>
                    <div class="summary-row">
                        <div class="summary-label">Property Title</div>
                        <div class="summary-value">${propertyTitle}</div>
                    </div>
                    <div class="summary-row">
                        <div class="summary-label">Property Type</div>
                        <div class="summary-value">${propertyType}</div>
                    </div>
                    <div class="summary-row">
                        <div class="summary-label">Listing Type</div>
                        <div class="summary-value">${listingType}</div>
                    </div>
                    <div class="summary-row">
                        <div class="summary-label">Price</div>
                        <div class="summary-value">$${price} ${priceType}</div>
                    </div>
                </div>
                
                <div class="summary-section">
                    <h4 class="summary-section-title">Property Details</h4>
                    <div class="summary-row">
                        <div class="summary-label">Bedrooms</div>
                        <div class="summary-value">${bedrooms}</div>
                    </div>
                    <div class="summary-row">
                        <div class="summary-label">Bathrooms</div>
                        <div class="summary-value">${bathrooms}</div>
                    </div>
                    <div class="summary-row">
                        <div class="summary-label">Size</div>
                        <div class="summary-value">${size} sq ft</div>
                    </div>
                </div>
                
                <div class="summary-section">
                    <h4 class="summary-section-title">Location</h4>
                    <div class="summary-row">
                        <div class="summary-label">Address</div>
                        <div class="summary-value">${address}, ${city}, ${state} ${zipCode}</div>
                    </div>
                </div>
                
                <div class="summary-section">
                    <h4 class="summary-section-title">Description</h4>
                    <div class="summary-row">
                        <div class="summary-value">${description}</div>
                    </div>
                </div>
        `;
        
        // Add features if any are selected
        if (selectedFeatures.length > 0) {
            summaryHTML += `
                <div class="summary-section">
                    <h4 class="summary-section-title">Features</h4>
                    <div class="summary-features-list">
            `;
            
            selectedFeatures.forEach(feature => {
                summaryHTML += `
                    <div class="summary-feature-item">
                        <i class="fas fa-check-circle"></i>
                        <span>${feature}</span>
                    </div>
                `;
            });
            
            summaryHTML += `
                    </div>
                </div>
            `;
        }
        
        // Add amenities if any are selected
        if (selectedAmenities.length > 0) {
            summaryHTML += `
                <div class="summary-section">
                    <h4 class="summary-section-title">Building Amenities</h4>
                    <div class="summary-features-list">
            `;
            
            selectedAmenities.forEach(amenity => {
                summaryHTML += `
                    <div class="summary-feature-item">
                        <i class="fas fa-check-circle"></i>
                        <span>${amenity}</span>
                    </div>
                `;
            });
            
            summaryHTML += `
                    </div>
                </div>
            `;
        }
        
        // Add images
        summaryHTML += `
            <div class="summary-section">
                <h4 class="summary-section-title">Images</h4>
                <div class="summary-images">
        `;
        
        if (mainImageSrc) {
            summaryHTML += `
                <img src="${mainImageSrc}" alt="Main property image" class="summary-main-image">
            `;
        }
        
        additionalImageSrcs.forEach(src => {
            summaryHTML += `
                <img src="${src}" alt="Additional property image" class="summary-additional-image">
            `;
        });
        
        summaryHTML += `
                </div>
            </div>
        </div>
        `;
        
        // Set summary content
        summaryContent.innerHTML = summaryHTML;
    }
    
    // Initialize map placeholder
    const pinLocationBtn = document.getElementById('pinLocation');
    if (pinLocationBtn) {
        pinLocationBtn.addEventListener('click', function() {
            alert('In a real implementation, this would open a map interface to select the exact location.');
        });
    }
    
    // Show/hide rental details based on listing type
    const listingTypeSelect = document.getElementById('listingType');
    const rentalDetailsSection = document.getElementById('rentalDetailsSection');
    
    if (listingTypeSelect && rentalDetailsSection) {
        listingTypeSelect.addEventListener('change', function() {
            const selectedValue = this.value;
            
            if (selectedValue === 'rental' || selectedValue === 'airbee') {
                rentalDetailsSection.style.display = 'flex';
            } else {
                rentalDetailsSection.style.display = 'none';
            }
        });
    }
});