document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const editImgBtn = document.getElementById("edit-img-btn")
    const imgUpload = document.getElementById("img-upload")
    const profileImg = document.getElementById("profile-img")
    const editNameBtn = document.getElementById("edit-name-btn")
    const profileName = document.getElementById("profile-name")
    const saveNameBtn = document.getElementById("saveNameBtn")
    const firstNameInput = document.getElementById("firstName")
    const lastNameInput = document.getElementById("lastName")
    const loadMoreBtn = document.querySelector(".load-more-btn")
    const editProfileBtn = document.getElementById("edit-profile-btn")
    const saveProfileBtn = document.getElementById("saveProfileBtn")
  
    // Profile Edit Elements
    const profilePreview = document.getElementById("profile-preview")
    const profileImageUpload = document.getElementById("profile-image-upload")
    const changeImageBtn = document.getElementById("change-image-btn")
    const profileImagePreview = document.querySelector(".profile-image-preview")
    const editFirstName = document.getElementById("edit-first-name")
    const editLastName = document.getElementById("edit-last-name")
    const editEmail = document.getElementById("edit-email")
    const editPhone = document.getElementById("edit-phone")
    const editLocation = document.getElementById("edit-location")
  
    // Bootstrap Modals
    const editNameModalElement = document.getElementById("editNameModal")
    const editProfileModalElement = document.getElementById("editProfileModal")
  
    let editNameModal = null
    let editProfileModal = null
  
    if (editNameModalElement) {
      editNameModal = new bootstrap.Modal(editNameModalElement)
    }
  
    if (editProfileModalElement) {
      editProfileModal = new bootstrap.Modal(editProfileModalElement)
    }
  
    // Edit Profile Image
    if (editImgBtn && imgUpload && profileImg) {
      editImgBtn.addEventListener("click", () => {
        imgUpload.click()
      })
  
      imgUpload.addEventListener("change", function () {
        const file = this.files[0]
        if (file) {
          const reader = new FileReader()
  
          reader.onload = (e) => {
            profileImg.src = e.target.result
  
            // Update profile preview in edit modal
            if (profilePreview) {
              profilePreview.src = e.target.result
            }
  
            // Show success notification
            showNotification("Profile picture updated successfully!")
          }
  
          reader.readAsDataURL(file)
        }
      })
    }
  
    // Edit Agent Name
    if (editNameBtn && profileName) {
      editNameBtn.addEventListener("click", () => {
        // Parse current name to populate the form
        const fullName = profileName.textContent.trim()
        const nameParts = fullName.split(" ")
  
        if (nameParts.length >= 2) {
          firstNameInput.value = nameParts[0]
          lastNameInput.value = nameParts.slice(1).join(" ")
        } else {
          firstNameInput.value = fullName
          lastNameInput.value = ""
        }
  
        // Show the modal
        if (editNameModal) {
          editNameModal.show()
        }
      })
    }
  
    // Save Name Changes
    if (saveNameBtn) {
      saveNameBtn.addEventListener("click", () => {
        const firstName = firstNameInput.value.trim()
        const lastName = lastNameInput.value.trim()
  
        if (firstName) {
          const fullName = lastName ? `${firstName} ${lastName}` : firstName
          profileName.textContent = fullName
  
          // Update name in edit profile modal
          if (editFirstName && editLastName) {
            editFirstName.value = firstName
            editLastName.value = lastName
          }
  
          // Show success notification
          showNotification("Agent name updated successfully!")
  
          // Close the modal
          if (editNameModal) {
            editNameModal.hide()
          }
        } else {
          alert("First name is required")
        }
      })
    }
  
    // Edit Profile Button
    if (editProfileBtn) {
      editProfileBtn.addEventListener("click", () => {
        // Populate form with current values
        if (profileName) {
          const fullName = profileName.textContent.trim()
          const nameParts = fullName.split(" ")
  
          if (nameParts.length >= 2) {
            editFirstName.value = nameParts[0]
            editLastName.value = nameParts.slice(1).join(" ")
          } else {
            editFirstName.value = fullName
            editLastName.value = ""
          }
        }
  
        // Set profile image
        if (profileImg && profilePreview) {
          profilePreview.src = profileImg.src
        }
  
        // Get contact info
        const locationInfo = document.querySelector("#location-info span")
        const phoneInfo = document.querySelector("#phone-info span")
        const emailInfo = document.querySelector("#email-info span")
  
        if (locationInfo) editLocation.value = locationInfo.textContent.trim()
        if (phoneInfo) editPhone.value = phoneInfo.textContent.trim()
        if (emailInfo) editEmail.value = emailInfo.textContent.trim()
  
        // Show the modal
        if (editProfileModal) {
          editProfileModal.show()
        }
      })
    }
  
    // Profile Image Preview Click
    if (profileImagePreview) {
      profileImagePreview.addEventListener("click", () => {
        profileImageUpload.click()
      })
    }
  
    // Change Image Button
    if (changeImageBtn) {
      changeImageBtn.addEventListener("click", () => {
        profileImageUpload.click()
      })
    }
  
    // Profile Image Upload
    if (profileImageUpload && profilePreview) {
      profileImageUpload.addEventListener("change", function () {
        const file = this.files[0]
        if (file) {
          const reader = new FileReader()
  
          reader.onload = (e) => {
            profilePreview.src = e.target.result
          }
  
          reader.readAsDataURL(file)
        }
      })
    }
  
    // Save Profile Changes
    if (saveProfileBtn) {
      saveProfileBtn.addEventListener("click", () => {
        // Validate form
        if (!editFirstName.value.trim()) {
          alert("First name is required")
          return
        }
  
        if (!editEmail.value.trim()) {
          alert("Email is required")
          return
        }
  
        if (!editPhone.value.trim()) {
          alert("Phone number is required")
          return
        }
  
        if (!editLocation.value.trim()) {
          alert("Location is required")
          return
        }
  
        // Update profile information
        const firstName = editFirstName.value.trim()
        const lastName = editLastName.value.trim()
        const fullName = lastName ? `${firstName} ${lastName}` : firstName
  
        // Update name
        if (profileName) {
          profileName.textContent = fullName
        }
  
        // Update profile image
        if (profileImg && profilePreview) {
          profileImg.src = profilePreview.src
        }
  
        // Update contact info
        const locationInfo = document.querySelector("#location-info span")
        const phoneInfo = document.querySelector("#phone-info span")
        const emailInfo = document.querySelector("#email-info span")
  
        if (locationInfo) locationInfo.textContent = editLocation.value.trim()
        if (phoneInfo) phoneInfo.textContent = editPhone.value.trim()
        if (emailInfo) emailInfo.textContent = editEmail.value.trim()
  
        // Show success notification
        showNotification("Profile updated successfully!")
  
        // Close the modal
        if (editProfileModal) {
          editProfileModal.hide()
        }
      })
    }
  
    // Load More Reviews
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener("click", function () {
        // Show loading state
        this.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> Loading...'
        this.disabled = true
  
        // Simulate loading delay
        setTimeout(() => {
          // Add more reviews (in a real app, this would fetch from an API)
          addMoreReviews()
  
          // Reset button state
          this.innerHTML = '<i class="fas fa-spinner me-2"></i> Load More Reviews'
          this.disabled = false
        }, 1500)
      })
    }
  
    // Function to add more reviews (for demo purposes)
    function addMoreReviews() {
      const reviewsBody = document.querySelector(".reviews-body")
  
      // Sample review data
      const newReviews = [
        {
          name: "David Thompson",
          date: "July 28, 2023",
          rating: 5,
          content:
            "John is an exceptional agent. He helped us find our vacation home within our budget. His attention to detail and negotiation skills are outstanding.",
          property: "Beach House in Hampton",
          img: "https://via.placeholder.com/50",
        },
        {
          name: "Jennifer Lee",
          date: "July 15, 2023",
          rating: 4,
          content:
            "Very professional and knowledgeable about the market. John was always responsive and made the whole process much easier for us as first-time buyers.",
          property: "Cozy Studio in SoHo",
          img: "https://via.placeholder.com/50",
        },
        {
          name: "Robert Garcia",
          date: "June 30, 2023",
          rating: 5,
          content:
            "We had a great experience working with John. He was patient, understanding, and really listened to what we were looking for in a property.",
          property: "Townhouse in Greenwich Village",
          img: "https://via.placeholder.com/50",
        },
      ]
  
      // Create and append new review elements
      newReviews.forEach((review) => {
        const reviewItem = document.createElement("div")
        reviewItem.className = "review-item"
  
        // Generate stars based on rating
        let starsHTML = ""
        for (let i = 1; i <= 5; i++) {
          if (i <= review.rating) {
            starsHTML += '<i class="fas fa-star"></i>'
          } else if (i - 0.5 === review.rating) {
            starsHTML += '<i class="fas fa-star-half-alt"></i>'
          } else {
            starsHTML += '<i class="far fa-star"></i>'
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
              `
  
        reviewsBody.appendChild(reviewItem)
      })
    }
  
    // Function to show notification
    function showNotification(message) {
      // Create notification element
      const notification = document.createElement("div")
      notification.className = "notification"
      notification.innerHTML = `
              <div class="notification-content">
                  <i class="fas fa-check-circle"></i>
                  <span>${message}</span>
              </div>
          `
  
      // Add styles
      notification.style.position = "fixed"
      notification.style.bottom = "20px"
      notification.style.right = "20px"
      notification.style.backgroundColor = "var(--primary)"
      notification.style.color = "white"
      notification.style.padding = "12px 20px"
      notification.style.borderRadius = "var(--radius-sm)"
      notification.style.boxShadow = "var(--shadow-hover)"
      notification.style.zIndex = "9999"
      notification.style.display = "flex"
      notification.style.alignItems = "center"
      notification.style.opacity = "0"
      notification.style.transform = "translateY(20px)"
      notification.style.transition = "opacity 0.3s, transform 0.3s"
  
      // Add to body
      document.body.appendChild(notification)
  
      // Trigger animation
      setTimeout(() => {
        notification.style.opacity = "1"
        notification.style.transform = "translateY(0)"
      }, 10)
  
      // Remove after delay
      setTimeout(() => {
        notification.style.opacity = "0"
        notification.style.transform = "translateY(20px)"
  
        // Remove from DOM after animation
        setTimeout(() => {
          document.body.removeChild(notification)
        }, 300)
      }, 3000)
    }
  })
  