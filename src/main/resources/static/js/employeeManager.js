/**
 * Employee Manager
 * Handles employee CRUD operations and business logic
 */

class EmployeeManager {
  constructor(dataManager) {
    this.dataManager = dataManager;
    this.currentPage = 1;
    this.itemsPerPage = 10;
    this.editingEmployeeId = null;
  }

  /**
   * Initialize the employee manager
   */
  init() {
    this.renderEmployees();
    this.updatePagination();
  }

  /**
   * Render employee list
   */
  renderEmployees() {
    const employeeList = document.getElementById("employee-list");
    const paginationData = this.dataManager.getPaginatedEmployees(
      this.currentPage,
      this.itemsPerPage
    );

    if (paginationData.employees.length === 0) {
      employeeList.innerHTML = this.getEmptyStateHTML();
      return;
    }

    const employeeGrid = document.createElement("div");
    employeeGrid.className = "employee-grid";

    paginationData.employees.forEach((employee) => {
      const employeeCard = this.createEmployeeCard(employee);
      employeeGrid.appendChild(employeeCard);
    });

    employeeList.innerHTML = "";
    employeeList.appendChild(employeeGrid);
  }

  /**
   * Create employee card HTML
   * @param {Object} employee - Employee data
   * @returns {HTMLElement} Employee card element
   */
  createEmployeeCard(employee) {
    const card = document.createElement("div");
    card.className = "employee-card";
    card.setAttribute("data-employee-id", employee.id);

    card.innerHTML = `
            <div class="employee-card__header">
                <div>
                    <h3 class="employee-card__name">${employee.firstName} ${
      employee.lastName
    }</h3>
                    <p class="employee-card__id">ID: ${employee.id}</p>
                </div>
                <div class="employee-card__actions">
                    <button class="btn btn--secondary btn--sm edit-btn" data-id="${
                      employee.id
                    }" aria-label="Edit ${employee.firstName} ${
      employee.lastName
    }">
                        <i class="fas fa-edit"></i>
                        Edit
                    </button>
                    <button class="btn btn--danger btn--sm delete-btn" data-id="${
                      employee.id
                    }" aria-label="Delete ${employee.firstName} ${
      employee.lastName
    }">
                        <i class="fas fa-trash"></i>
                        Delete
                    </button>
                </div>
            </div>
            <div class="employee-card__info">
                <div class="employee-card__field">
                    <i class="fas fa-envelope"></i>
                    <span>${employee.email}</span>
                </div>
                <div class="employee-card__field">
                    <i class="fas fa-building"></i>
                    <span>${employee.department}</span>
                </div>
                <div class="employee-card__field">
                    <i class="fas fa-user-tie"></i>
                    <span>${employee.role}</span>
                </div>
                <div class="employee-card__field">
                    <i class="fas fa-calendar-alt"></i>
                    <span>Joined: ${this.formatDate(employee.createdAt)}</span>
                </div>
            </div>
        `;

    // Add event listeners
    const editBtn = card.querySelector(".edit-btn");
    const deleteBtn = card.querySelector(".delete-btn");

    editBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.editEmployee(employee.id);
    });

    deleteBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.deleteEmployee(employee.id);
    });

    return card;
  }

  /**
   * Get empty state HTML
   * @returns {string} Empty state HTML
   */
  getEmptyStateHTML() {
    return `
            <div class="empty-state">
                <div class="empty-state__icon">
                    <i class="fas fa-users"></i>
                </div>
                <h3 class="empty-state__title">No employees found</h3>
                <p class="empty-state__description">
                    ${
                      this.dataManager.getFilterState().search ||
                      Object.keys(
                        this.dataManager.getFilterState().filters
                      ).some(
                        (key) => this.dataManager.getFilterState().filters[key]
                      )
                        ? "Try adjusting your search or filter criteria."
                        : 'No employees have been added yet. Click "Add Employee" to get started.'
                    }
                </p>
                ${
                  !this.dataManager.getFilterState().search &&
                  !Object.keys(this.dataManager.getFilterState().filters).some(
                    (key) => this.dataManager.getFilterState().filters[key]
                  )
                    ? '<button class="btn btn--primary" id="add-first-employee-btn"><i class="fas fa-plus"></i> Add First Employee</button>'
                    : '<button class="btn btn--secondary" id="clear-filters-btn"><i class="fas fa-times"></i> Clear Filters</button>'
                }
            </div>
        `;
  }

  /**
   * Add new employee
   * @param {Object} employeeData - Employee data
   * @returns {Object} Result object with success status and message
   */
  addEmployee(employeeData) {
    try {
      // Validate employee data
      const validation = this.dataManager.validateEmployee(employeeData);
      if (!validation.isValid) {
        return {
          success: false,
          message: "Please fix the validation errors.",
          errors: validation.errors,
        };
      }

      // Add employee
      const newEmployee = this.dataManager.addEmployee(employeeData);

      // Reset to first page when adding new employee
      this.currentPage = 1;
      this.renderEmployees();
      this.updatePagination();

      return {
        success: true,
        message: `Employee ${newEmployee.firstName} ${newEmployee.lastName} added successfully!`,
        employee: newEmployee,
      };
    } catch (error) {
      console.error("Error adding employee:", error);
      return {
        success: false,
        message:
          "An error occurred while adding the employee. Please try again.",
      };
    }
  }

  /**
   * Edit employee
   * @param {number} employeeId - Employee ID to edit
   */
  editEmployee(employeeId) {
    const employee = this.dataManager.getEmployeeById(employeeId);
    if (!employee) {
      this.showNotification("Employee not found.", "error");
      return;
    }

    this.editingEmployeeId = employeeId;

    // Populate form with employee data
    this.populateForm(employee);

    // Show form and update title
    this.showForm("Edit Employee");
  }

  /**
   * Update employee
   * @param {Object} employeeData - Updated employee data
   * @returns {Object} Result object with success status and message
   */
  updateEmployee(employeeData) {
    try {
      // Add ID to employee data for validation
      const employeeWithId = { ...employeeData, id: this.editingEmployeeId };

      // Validate employee data
      const validation = this.dataManager.validateEmployee(employeeWithId);
      if (!validation.isValid) {
        return {
          success: false,
          message: "Please fix the validation errors.",
          errors: validation.errors,
        };
      }

      // Update employee
      const updatedEmployee = this.dataManager.updateEmployee(
        this.editingEmployeeId,
        employeeData
      );

      if (!updatedEmployee) {
        return {
          success: false,
          message: "Employee not found.",
        };
      }

      this.renderEmployees();
      this.updatePagination();

      return {
        success: true,
        message: `Employee ${updatedEmployee.firstName} ${updatedEmployee.lastName} updated successfully!`,
        employee: updatedEmployee,
      };
    } catch (error) {
      console.error("Error updating employee:", error);
      return {
        success: false,
        message:
          "An error occurred while updating the employee. Please try again.",
      };
    }
  }

  /**
   * Delete employee
   * @param {number} employeeId - Employee ID to delete
   */
  deleteEmployee(employeeId) {
    const employee = this.dataManager.getEmployeeById(employeeId);
    if (!employee) {
      this.showNotification("Employee not found.", "error");
      return;
    }

    // Show confirmation dialog
    this.showConfirmDialog(
      `Are you sure you want to delete ${employee.firstName} ${employee.lastName}?`,
      "This action cannot be undone.",
      () => {
        this.performDelete(employeeId);
      }
    );
  }

  /**
   * Perform the actual delete operation
   * @param {number} employeeId - Employee ID to delete
   */
  performDelete(employeeId) {
    try {
      const success = this.dataManager.deleteEmployee(employeeId);

      if (success) {
        // Adjust current page if necessary
        const totalPages = Math.ceil(
          this.dataManager.getFilteredEmployees().length / this.itemsPerPage
        );
        if (this.currentPage > totalPages && totalPages > 0) {
          this.currentPage = totalPages;
        }

        this.renderEmployees();
        this.updatePagination();
        this.showNotification("Employee deleted successfully.", "success");
      } else {
        this.showNotification("Employee not found.", "error");
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
      this.showNotification(
        "An error occurred while deleting the employee.",
        "error"
      );
    }
  }

  /**
   * Populate form with employee data
   * @param {Object} employee - Employee data
   */
  populateForm(employee) {
    const form = document.getElementById("employee-form");
    const fields = ["firstName", "lastName", "email", "department", "role"];

    fields.forEach((field) => {
      const input = form.querySelector(`[name="${field}"]`);
      if (input) {
        input.value = employee[field] || "";
        this.clearFieldError(field);
      }
    });
  }

  /**
   * Clear form
   */
  clearForm() {
    const form = document.getElementById("employee-form");
    const fields = ["firstName", "lastName", "email", "department", "role"];

    fields.forEach((field) => {
      const input = form.querySelector(`[name="${field}"]`);
      if (input) {
        input.value = "";
        this.clearFieldError(field);
      }
    });

    this.editingEmployeeId = null;
  }

  /**
   * Show form
   * @param {string} title - Form title
   */
  showForm(title = "Add New Employee") {
    const dashboardSection = document.getElementById("dashboard-section");
    const formSection = document.getElementById("form-section");
    const formTitle = document.getElementById("form-title");

    formTitle.textContent = title;
    dashboardSection.style.display = "none";
    formSection.style.display = "block";
  }

  /**
   * Hide form
   */
  hideForm() {
    const dashboardSection = document.getElementById("dashboard-section");
    const formSection = document.getElementById("form-section");

    formSection.style.display = "none";
    dashboardSection.style.display = "block";
    this.clearForm();
  }

  /**
   * Handle form submission
   * @param {Event} event - Form submit event
   */
  handleFormSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const employeeData = {
      firstName: formData.get("firstName").trim(),
      lastName: formData.get("lastName").trim(),
      email: formData.get("email").trim(),
      department: formData.get("department"),
      role: formData.get("role"),
    };

    let result;
    if (this.editingEmployeeId) {
      result = this.updateEmployee(employeeData);
    } else {
      result = this.addEmployee(employeeData);
    }

    if (result.success) {
      this.showNotification(result.message, "success");
      this.hideForm();
    } else {
      this.showNotification(result.message, "error");
      if (result.errors) {
        this.displayFormErrors(result.errors);
      }
    }
  }

  /**
   * Display form validation errors
   * @param {Object} errors - Validation errors
   */
  displayFormErrors(errors) {
    Object.keys(errors).forEach((field) => {
      this.showFieldError(field, errors[field]);
    });
  }

  /**
   * Show field error
   * @param {string} field - Field name
   * @param {string} message - Error message
   */
  showFieldError(field, message) {
    const input = document.querySelector(`[name="${field}"]`);
    const errorElement = document.getElementById(`${field}-error`);

    if (input && errorElement) {
      input.classList.add("input--error");
      errorElement.textContent = message;
    }
  }

  /**
   * Clear field error
   * @param {string} field - Field name
   */
  clearFieldError(field) {
    const input = document.querySelector(`[name="${field}"]`);
    const errorElement = document.getElementById(`${field}-error`);

    if (input && errorElement) {
      input.classList.remove("input--error");
      errorElement.textContent = "";
    }
  }

  /**
   * Update pagination
   */
  updatePagination() {
    const paginationData = this.dataManager.getPaginatedEmployees(
      this.currentPage,
      this.itemsPerPage
    );

    // Update pagination info
    const paginationInfo = document.getElementById("pagination-info");
    if (paginationInfo) {
      paginationInfo.textContent = `Showing ${paginationData.startIndex}-${paginationData.endIndex} of ${paginationData.totalItems} employees`;
    }

    // Update pagination controls
    this.updatePaginationControls(paginationData);
  }

  /**
   * Update pagination controls
   * @param {Object} paginationData - Pagination data
   */
  updatePaginationControls(paginationData) {
    const prevBtn = document.getElementById("prev-page-btn");
    const nextBtn = document.getElementById("next-page-btn");
    const pageNumbers = document.getElementById("page-numbers");

    // Update previous/next buttons
    if (prevBtn) {
      prevBtn.disabled = paginationData.currentPage <= 1;
    }

    if (nextBtn) {
      nextBtn.disabled =
        paginationData.currentPage >= paginationData.totalPages;
    }

    // Update page numbers
    if (pageNumbers) {
      pageNumbers.innerHTML = this.generatePageNumbers(paginationData);
    }
  }

  /**
   * Generate page numbers HTML
   * @param {Object} paginationData - Pagination data
   * @returns {string} Page numbers HTML
   */
  generatePageNumbers(paginationData) {
    if (paginationData.totalPages <= 1) {
      return "";
    }

    const pages = [];
    const currentPage = paginationData.currentPage;
    const totalPages = paginationData.totalPages;

    // Always show first page
    pages.push(this.createPageNumber(1, currentPage === 1));

    // Show ellipsis if needed
    if (currentPage > 4) {
      pages.push('<span class="page-ellipsis">...</span>');
    }

    // Show pages around current page
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(this.createPageNumber(i, i === currentPage));
    }

    // Show ellipsis if needed
    if (currentPage < totalPages - 3) {
      pages.push('<span class="page-ellipsis">...</span>');
    }

    // Always show last page
    if (totalPages > 1) {
      pages.push(this.createPageNumber(totalPages, currentPage === totalPages));
    }

    return pages.join("");
  }

  /**
   * Create page number HTML
   * @param {number} pageNumber - Page number
   * @param {boolean} isActive - Whether page is active
   * @returns {string} Page number HTML
   */
  createPageNumber(pageNumber, isActive) {
    const activeClass = isActive ? "page-number--active" : "";
    return `<button class="page-number ${activeClass}" data-page="${pageNumber}">${pageNumber}</button>`;
  }

  /**
   * Go to specific page
   * @param {number} page - Page number
   */
  goToPage(page) {
    const paginationData = this.dataManager.getPaginatedEmployees(
      this.currentPage,
      this.itemsPerPage
    );

    if (page >= 1 && page <= paginationData.totalPages) {
      this.currentPage = page;
      this.renderEmployees();
      this.updatePagination();
    }
  }

  /**
   * Change items per page
   * @param {number} itemsPerPage - Items per page
   */
  changeItemsPerPage(itemsPerPage) {
    this.itemsPerPage = itemsPerPage;
    this.currentPage = 1; // Reset to first page
    this.renderEmployees();
    this.updatePagination();
  }

  /**
   * Format date
   * @param {string} dateString - Date string
   * @returns {string} Formatted date
   */
  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  /**
   * Show notification
   * @param {string} message - Notification message
   * @param {string} type - Notification type (success, error, warning, info)
   */
  showNotification(message, type = "info") {
    // Create notification element
    const notification = document.createElement("div");
    notification.className = `alert alert--${type}`;
    notification.innerHTML = `
            <div class="alert__content">
                <i class="fas fa-${this.getNotificationIcon(type)}"></i>
                <span>${message}</span>
            </div>
            <button class="alert__close" aria-label="Close notification">
                <i class="fas fa-times"></i>
            </button>
        `;

    // Add to page
    document.body.appendChild(notification);

    // Add event listener to close button
    const closeBtn = notification.querySelector(".alert__close");
    closeBtn.addEventListener("click", () => {
      notification.remove();
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 5000);
  }

  /**
   * Get notification icon
   * @param {string} type - Notification type
   * @returns {string} Icon class
   */
  getNotificationIcon(type) {
    const icons = {
      success: "check-circle",
      error: "exclamation-circle",
      warning: "exclamation-triangle",
      info: "info-circle",
    };
    return icons[type] || "info-circle";
  }

  /**
   * Show confirmation dialog
   * @param {string} title - Dialog title
   * @param {string} message - Dialog message
   * @param {Function} onConfirm - Confirm callback
   */
  showConfirmDialog(title, message, onConfirm) {
    const modal = document.getElementById("confirm-modal");
    const modalTitle = modal.querySelector(".modal__title");
    const modalMessage = document.getElementById("confirm-message");
    const confirmBtn = document.getElementById("confirm-action-btn");
    const cancelBtn = document.getElementById("cancel-action-btn");

    modalTitle.textContent = title;
    modalMessage.textContent = message;

    // Show modal
    modal.classList.add("active");

    // Add event listeners
    const handleConfirm = () => {
      modal.classList.remove("active");
      onConfirm();
      confirmBtn.removeEventListener("click", handleConfirm);
      cancelBtn.removeEventListener("click", handleCancel);
    };

    const handleCancel = () => {
      modal.classList.remove("active");
      confirmBtn.removeEventListener("click", handleConfirm);
      cancelBtn.removeEventListener("click", handleCancel);
    };

    confirmBtn.addEventListener("click", handleConfirm);
    cancelBtn.addEventListener("click", handleCancel);
  }

  /**
   * Show loading overlay
   */
  showLoading() {
    const loadingOverlay = document.getElementById("loading-overlay");
    loadingOverlay.classList.add("active");
  }

  /**
   * Hide loading overlay
   */
  hideLoading() {
    const loadingOverlay = document.getElementById("loading-overlay");
    loadingOverlay.classList.remove("active");
  }
}

// Export for use in other modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = EmployeeManager;
}
