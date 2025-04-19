document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const header = document.getElementById("header")
    const sidebar = document.getElementById("sidebar")
    const navItems = document.querySelectorAll(".nav-item")
    const contentSections = document.querySelectorAll(".content-section")
    const statusSelects = document.querySelectorAll(".status-select")
    const availabilitySelects = document.querySelectorAll(".availability-select")
    const propertyLinks = document.querySelectorAll(".property-link")
    const quickActionBtns = document.querySelectorAll(".quick-action-btn")
    const addBlogBtn = document.querySelector(".add-blog-btn")
    const editTermsBtn = document.querySelector(".edit-terms-btn")
    const markAllReadBtn = document.querySelector(".mark-all-read-btn")
    const markReadBtns = document.querySelectorAll(".mark-read-btn")
    const propertyTables = document.querySelectorAll('.property-table-container');
  
    // Bootstrap Modals
    const disapprovalReasonModalElement = document.getElementById("disapprovalReasonModal")
    const blogEditorModalElement = document.getElementById("blogEditorModal")
    const termsEditorModalElement = document.getElementById("termsEditorModal")
    const propertyViewModalElement = document.getElementById("propertyViewModal")
  
    const disapprovalReasonModal = disapprovalReasonModalElement
      ? new bootstrap.Modal(disapprovalReasonModalElement)
      : null
    const blogEditorModal = blogEditorModalElement ? new bootstrap.Modal(blogEditorModalElement) : null
    const termsEditorModal = termsEditorModalElement ? new bootstrap.Modal(termsEditorModalElement) : null
    const propertyViewModal = propertyViewModalElement ? new bootstrap.Modal(propertyViewModalElement) : null
  
    // Last scroll position
    let lastScrollTop = 0
  
    // Handle scroll events
    window.addEventListener("scroll", () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  
      // Header scroll behavior
      if (scrollTop > lastScrollTop && scrollTop > 50) {
        // Scrolling down
        header.classList.add("scrolled")
      } else {
        // Scrolling up
        header.classList.remove("scrolled")
      }
  
      
    })

    // Navigation click handler Agent CMS
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
  
    // Navigation click handler ADMIN CMS
    navItems.forEach((item) => {
      item.addEventListener("click", function (e) {
        e.preventDefault()
  
        // Update active state
        navItems.forEach((nav) => nav.classList.remove("active"))
        this.classList.add("active")
  
        // Show corresponding section
        const type = this.getAttribute("data-type")
        contentSections.forEach((section) => {
          section.style.display = "none"
        })
        document.getElementById(`${type}-section`).style.display = "block"
      })
    })
  
    // Quick action buttons
    quickActionBtns.forEach((btn) => {
      btn.addEventListener("click", function (e) {
        e.preventDefault()
  
        const type = this.getAttribute("data-type")
  
        // Activate the corresponding nav item
        navItems.forEach((nav) => {
          if (nav.getAttribute("data-type") === type) {
            nav.click()
          }
        })
      })
    })
  
    // Status select change handler
    statusSelects.forEach((select) => {
      select.addEventListener("change", function () {
        const originalValue = this.getAttribute("data-original")
        const currentValue = this.value
        const row = this.closest("tr")
        const updateCell = row.querySelector(".update-cell")
  
        // Check if value has changed
        if (originalValue !== currentValue) {
          // Show update button
          if (!updateCell.querySelector(".update-btn")) {
            const updateBtn = document.createElement("button")
            updateBtn.className = "update-btn"
            updateBtn.textContent = "Update"
            updateBtn.addEventListener("click", () => {
              // Handle status update
              select.setAttribute("data-original", currentValue)
  
              // If status is changed to disapproved, show reason modal
              if (currentValue === "disapproved") {
                // Get property and agent info
                const propertyTitle = row.querySelector("td:nth-child(2)").textContent
                const agentName = row.querySelector("td:nth-child(3)")?.textContent || "Unknown"
  
                // Set modal values
                document.getElementById("propertyTitle").value = propertyTitle
                document.getElementById("agentName").value = agentName
  
                // Show modal
                disapprovalReasonModal?.show()
              } else {
                // Show success notification
                showNotification(`Status updated successfully to ${currentValue}`)
              }
  
              // Remove update button
              updateCell.innerHTML = ""
            })
            updateCell.appendChild(updateBtn)
          }
        } else {
          // Remove update button if exists
          updateCell.innerHTML = ""
        }
      })
    })
  
    // Availability select change handler
    availabilitySelects.forEach((select) => {
      select.addEventListener("change", function () {
        const originalValue = this.getAttribute("data-original")
        const currentValue = this.value
        const row = this.closest("tr")
        const updateCell = row.querySelector(".update-cell")
  
        // Check if value has changed
        if (originalValue !== currentValue) {
          // Show update button
          if (!updateCell.querySelector(".update-btn")) {
            const updateBtn = document.createElement("button")
            updateBtn.className = "update-btn"
            updateBtn.textContent = "Update"
            updateBtn.addEventListener("click", () => {
              // Handle availability update
              select.setAttribute("data-original", currentValue)
  
              // Show success notification
              showNotification(`Availability updated successfully to ${currentValue}`)
  
              // Remove update button
              updateCell.innerHTML = ""
            })
            updateCell.appendChild(updateBtn)
          }
        } else {
          // Remove update button if exists
          updateCell.innerHTML = ""
        }
      })
    })
  
    // Property link click handler
    propertyLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault()
  
        // Get property details
        const propertyTitle = this.textContent
        const row = this.closest("tr")
        const propertyType = row.querySelector("td:nth-child(4)").textContent
        const propertyLocation = row.querySelector("td:nth-child(5)").textContent
  
        // Set property view content
        const propertyViewContent = document.getElementById("propertyViewContent")
        propertyViewContent.innerHTML = `
                  <div class="property-view">
                      <div class="property-view-header">
                          <div class="property-view-title">
                              <h4>${propertyTitle}</h4>
                              <p>${propertyLocation}</p>
                          </div>
                          <div class="property-view-status">
                              <span class="status-badge ${row.querySelector(".status-select").value}">${row.querySelector(".status-select").value}</span>
                              <span class="status-badge ${row.querySelector(".availability-select").value}">${row.querySelector(".availability-select").value}</span>
                          </div>
                      </div>
                      
                      <div class="property-view-images">
                          <div class="property-view-main-image">
                              <img src="https://via.placeholder.com/600x400" alt="${propertyTitle}" class="property-view-image">
                          </div>
                          <div>
                              <img src="https://via.placeholder.com/300x200" alt="${propertyTitle}" class="property-view-image">
                          </div>
                          <div>
                              <img src="https://via.placeholder.com/300x200" alt="${propertyTitle}" class="property-view-image">
                          </div>
                          <div>
                              <img src="https://via.placeholder.com/300x200" alt="${propertyTitle}" class="property-view-image">
                          </div>
                          <div>
                              <img src="https://via.placeholder.com/300x200" alt="${propertyTitle}" class="property-view-image">
                          </div>
                      </div>
                      
                      <div class="property-view-details">
                          <div class="property-view-detail">
                              <h5>Type</h5>
                              <p>${propertyType}</p>
                          </div>
                          <div class="property-view-detail">
                              <h5>Price</h5>
                              <p>$2,500/mo</p>
                          </div>
                          <div class="property-view-detail">
                              <h5>Bedrooms</h5>
                              <p>3</p>
                          </div>
                          <div class="property-view-detail">
                              <h5>Bathrooms</h5>
                              <p>2</p>
                          </div>
                          <div class="property-view-detail">
                              <h5>Size</h5>
                              <p>1,200 sq ft</p>
                          </div>
                          <div class="property-view-detail">
                              <h5>Year Built</h5>
                              <p>2020</p>
                          </div>
                      </div>
                      
                      <div class="property-view-description">
                          <h5>Description</h5>
                          <p>This beautiful property features modern amenities and a prime location. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisi vel consectetur euismod, nisi nisl consectetur nisi, euismod nisi nisl euismod nisi.</p>
                      </div>
                      
                      <div class="property-view-features">
                          <h5>Features</h5>
                          <div class="property-view-features-list">
                              <div class="property-view-feature">
                                  <i class="fas fa-check-circle"></i>
                                  <span>Air Conditioning</span>
                              </div>
                              <div class="property-view-feature">
                                  <i class="fas fa-check-circle"></i>
                                  <span>Heating</span>
                              </div>
                              <div class="property-view-feature">
                                  <i class="fas fa-check-circle"></i>
                                  <span>Parking</span>
                              </div>
                              <div class="property-view-feature">
                                  <i class="fas fa-check-circle"></i>
                                  <span>Laundry</span>
                              </div>
                              <div class="property-view-feature">
                                  <i class="fas fa-check-circle"></i>
                                  <span>Dishwasher</span>
                              </div>
                              <div class="property-view-feature">
                                  <i class="fas fa-check-circle"></i>
                                  <span>Balcony</span>
                              </div>
                          </div>
                      </div>
                  </div>
              `
  
        // Show property view modal
        propertyViewModal?.show()
      })
    })
  
    // Add blog button click handler
    if (addBlogBtn) {
      addBlogBtn.addEventListener("click", () => {
        // Reset form
        document.getElementById("blogForm").reset()
        document.getElementById("blogEditorModalLabel").textContent = "Add New Blog"
  
        // Show modal
        blogEditorModal?.show()
      })
    }
  
    // Edit terms button click handler
    if (editTermsBtn) {
      editTermsBtn.addEventListener("click", () => {
        // Get current terms content
        const termsTitle = document.querySelector(".terms-content h3").textContent
        const termsLastUpdated = document
          .querySelector(".terms-content .text-muted")
          .textContent.replace("Last Updated: ", "")
        const termsContent = document.querySelector(".terms-content").innerHTML
  
        // Set form values
        document.getElementById("termsTitle").value = termsTitle
        document.getElementById("termsLastUpdated").value = "2023-08-15" // Convert to date format
        document.getElementById("termsContent").value = termsContent
  
        // Show modal
        termsEditorModal?.show()
      })
    }
  
    // Mark all read button click handler
    if (markAllReadBtn) {
      markAllReadBtn.addEventListener("click", () => {
        // Mark all notifications as read
        document.querySelectorAll(".notification-item.unread").forEach((item) => {
          item.classList.remove("unread")
        })
  
        // Update badge count
        const badge = document.querySelector('.nav-item[data-type="notifications"] .badge')
        badge.textContent = "0"
  
        // Show notification
        showNotification("All notifications marked as read")
      })
    }
  
    // Mark read button click handler
    markReadBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        const notificationItem = this.closest(".notification-item")
  
        // Mark notification as read
        if (notificationItem.classList.contains("unread")) {
          notificationItem.classList.remove("unread")
  
          // Update badge count
          const badge = document.querySelector('.nav-item[data-type="notifications"] .badge')
          const currentCount = Number.parseInt(badge.textContent)
          badge.textContent = currentCount - 1
        }
      })
    })
  
    // Submit disapproval reason handler
    const submitDisapprovalReasonBtn = document.getElementById("submitDisapprovalReason")
    if (submitDisapprovalReasonBtn) {
      submitDisapprovalReasonBtn.addEventListener("click", () => {
        const reason = document.getElementById("disapprovalReason").value
  
        if (reason.trim() === "") {
          alert("Please provide a reason for disapproval")
          return
        }
  
        // Handle disapproval submission
        const propertyTitle = document.getElementById("propertyTitle").value
  
        // Show success notification
        showNotification(`Property "${propertyTitle}" has been disapproved`)
  
        // Close modal
        disapprovalReasonModal?.hide()
      })
    }
  
    // Save blog handler
    const saveBlogBtn = document.getElementById("saveBlog")
    if (saveBlogBtn) {
      saveBlogBtn.addEventListener("click", () => {
        const blogTitle = document.getElementById("blogTitle").value
        const blogCategory = document.getElementById("blogCategory").value
        const blogStatus = document.getElementById("blogStatus").value
        const blogContent = document.getElementById("blogContent").value
  
        if (blogTitle.trim() === "" || blogCategory === "" || blogContent.trim() === "") {
          alert("Please fill in all required fields")
          return
        }
  
        // Handle blog save
        const isNewBlog = document.getElementById("blogEditorModalLabel").textContent === "Add New Blog"
  
        // Show success notification
        showNotification(`Blog "${blogTitle}" has been ${isNewBlog ? "created" : "updated"} successfully`)
  
        // Close modal
        blogEditorModal?.hide()
  
        // If it's a new blog, add it to the table
        if (isNewBlog) {
          const blogTable = document.querySelector(".blog-table tbody")
          const newRow = document.createElement("tr")
  
          // Get the next ID
          const lastId = Number.parseInt(blogTable.lastElementChild.querySelector("td:first-child").textContent)
  
          newRow.innerHTML = `
                      <td>${lastId + 1}</td>
                      <td>${blogTitle}</td>
                      <td>Admin</td>
                      <td>${blogCategory}</td>
                      <td>${new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</td>
                      <td><span class="status-badge ${blogStatus}">${blogStatus === "published" ? "Published" : "Draft"}</span></td>
                      <td>
                          <button class="action-btn view"><i class="fas fa-eye"></i></button>
                          <button class="action-btn edit"><i class="fas fa-edit"></i></button>
                          <button class="action-btn delete"><i class="fas fa-trash"></i></button>
                      </td>
                  `
  
          blogTable.appendChild(newRow)
  
          // Add event listeners to new buttons
          const viewBtn = newRow.querySelector(".action-btn.view")
          const editBtn = newRow.querySelector(".action-btn.edit")
          const deleteBtn = newRow.querySelector(".action-btn.delete")
  
          viewBtn.addEventListener("click", () => {
            alert(`View blog: ${blogTitle}`)
          })
  
          editBtn.addEventListener("click", () => {
            // Set form values
            document.getElementById("blogTitle").value = blogTitle
            document.getElementById("blogCategory").value = blogCategory
            document.getElementById("blogStatus").value = blogStatus
            document.getElementById("blogContent").value = blogContent
  
            // Set modal title
            document.getElementById("blogEditorModalLabel").textContent = "Edit Blog"
  
            // Show modal
            blogEditorModal?.show()
          })
  
          deleteBtn.addEventListener("click", () => {
            if (confirm(`Are you sure you want to delete "${blogTitle}"?`)) {
              newRow.remove()
              showNotification(`Blog "${blogTitle}" deleted successfully`)
            }
          })
        }
      })
    }
  
    // Save terms handler
    const saveTermsBtn = document.getElementById("saveTerms")
    if (saveTermsBtn) {
      saveTermsBtn.addEventListener("click", () => {
        const termsTitle = document.getElementById("termsTitle").value
        const termsLastUpdated = document.getElementById("termsLastUpdated").value
        const termsContent = document.getElementById("termsContent").value
  
        if (termsTitle.trim() === "" || termsLastUpdated === "" || termsContent.trim() === "") {
          alert("Please fill in all required fields")
          return
        }
  
        // Handle terms save
        const formattedDate = new Date(termsLastUpdated).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })
  
        // Update terms content
        document.querySelector(".terms-content h3").textContent = termsTitle
        document.querySelector(".terms-content .text-muted").textContent = `Last Updated: ${formattedDate}`
        document.querySelector(".terms-content").innerHTML = termsContent
  
        // Show success notification
        showNotification("Terms & Conditions updated successfully")
  
        // Close modal
        termsEditorModal?.hide()
      })
    }
  
    // Delete button click handler
    const deleteButtons = document.querySelectorAll(".action-btn.delete")
    deleteButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const row = this.closest("tr")
        const title = row.querySelector("td:nth-child(2)").textContent
  
        if (confirm(`Are you sure you want to delete "${title}"?`)) {
          // Remove row
          row.remove()
  
          // Show notification
          showNotification(`"${title}" deleted successfully`)
        }
      })
    })
  
    // Edit button click handler
    const editButtons = document.querySelectorAll(".action-btn.edit")
    editButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const row = this.closest("tr")
        const title = row.querySelector("td:nth-child(2)").textContent
  
        // Check if it's a blog or property
        if (row.closest(".blog-table")) {
          // Set form values
          document.getElementById("blogTitle").value = title
          document.getElementById("blogCategory").value = row.querySelector("td:nth-child(4)").textContent
          document.getElementById("blogStatus").value = row.querySelector(".status-badge").classList.contains("published")
            ? "published"
            : "draft"
          document.getElementById("blogContent").value = "Sample blog content for " + title
  
          // Set modal title
          document.getElementById("blogEditorModalLabel").textContent = "Edit Blog"
  
          // Show modal
          blogEditorModal?.show()
        } else {
          // For properties, just show an alert for now
          alert(`Edit property: ${title}`)
        }
      })
    })
  
    // View button click handler
    const viewButtons = document.querySelectorAll(".action-btn.view")
    viewButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const row = this.closest("tr")
        const title = row.querySelector("td:nth-child(2)").textContent
  
        // Check if it's an agent or blog
        if (row.closest(".agent-table")) {
          alert(`View agent profile: ${title}`)
        } else if (row.closest(".blog-table")) {
          alert(`View blog: ${title}`)
        }
      })
    })
  
    // Property filter change handler
    const propertyFilter = document.querySelector(".property-filter")
    if (propertyFilter) {
      propertyFilter.addEventListener("change", function () {
        const filterValue = this.value
        const propertyRows = document.querySelectorAll(".property-table tbody tr")
  
        propertyRows.forEach((row) => {
          const statusSelect = row.querySelector(".status-select")
          const status = statusSelect.value
  
          if (filterValue === "all" || status === filterValue) {
            row.style.display = ""
          } else {
            row.style.display = "none"
          }
        })
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

    // Initialize the first tab as active
    navItems[0].classList.add('active');
    propertyTables[0].style.display = 'block';
  
    // Initialize the first tab as active
    navItems[0].classList.add("active")
    contentSections[0].style.display = "block"
  
    // Handle window resize
    window.addEventListener("resize", () => {
      if (window.innerWidth > 767) {
        sidebar.classList.remove("sticky")
      }
    })
  })
  