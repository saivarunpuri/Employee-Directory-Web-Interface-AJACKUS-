/**
 * UI Controller
 * Handles UI interactions, event listeners, and user interface management
 */

class UIController {
  constructor(dataManager, employeeManager) {
    this.dataManager = dataManager;
    this.employeeManager = employeeManager;
    this.searchTimeout = null;
    this.filterPanelVisible = false;
  }

  /**
   * Initialize the UI controller
   */
  init() {
    this.setupEventListeners();
    this.initializeFilters();
  }

  /**
   * Setup all event listeners
   */
  setupEventListeners() {
    // Header buttons
    this.setupHeaderListeners();

    // Search functionality
    this.setupSearchListeners();

    // Filter functionality
    this.setupFilterListeners();

    // Sort functionality
    this.setupSortListeners();

    // Pagination
    this.setupPaginationListeners();

    // Form functionality
    this.setupFormListeners();

    // Modal functionality
    this.setupModalListeners();

    // Keyboard shortcuts
    this.setupKeyboardShortcuts();
  }

  /**
   * Setup header event listeners
   */
  setupHeaderListeners() {
    const addEmployeeBtn = document.getElementById("add-employee-btn");
    if (addEmployeeBtn) {
      addEmployeeBtn.addEventListener("click", () => {
        this.employeeManager.clearForm();
        this.employeeManager.showForm("Add New Employee");
      });
    }
  }

  /**
   * Setup search event listeners
   */
  setupSearchListeners() {
    const searchInput = document.getElementById("search-input");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        const query = e.target.value;

        // Clear previous timeout
        if (this.searchTimeout) {
          clearTimeout(this.searchTimeout);
        }

        // Debounce search
        this.searchTimeout = setTimeout(() => {
          this.dataManager.searchEmployees(query);
          this.employeeManager.currentPage = 1; // Reset to first page
          this.employeeManager.renderEmployees();
          this.employeeManager.updatePagination();
        }, 300);
      });
    }
  }

  /**
   * Setup filter event listeners
   */
  setupFilterListeners() {
    // Filter toggle button
    const filterToggleBtn = document.getElementById("filter-toggle-btn");
    if (filterToggleBtn) {
      filterToggleBtn.addEventListener("click", () => {
        this.toggleFilterPanel();
      });
    }

    // Apply filters button
    const applyFiltersBtn = document.getElementById("apply-filters-btn");
    if (applyFiltersBtn) {
      applyFiltersBtn.addEventListener("click", () => {
        this.applyFilters();
      });
    }

    // Clear filters button
    const clearFiltersBtn = document.getElementById("clear-filters-btn");
    if (clearFiltersBtn) {
      clearFiltersBtn.addEventListener("click", () => {
        this.clearFilters();
      });
    }

    // Filter input fields
    const filterInputs = document.querySelectorAll(
      "#filter-panel input, #filter-panel select"
    );
    filterInputs.forEach((input) => {
      input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          this.applyFilters();
        }
      });
    });
  }

  /**
   * Setup sort event listeners
   */
  setupSortListeners() {
    const sortSelect = document.getElementById("sort-select");
    if (sortSelect) {
      sortSelect.addEventListener("change", (e) => {
        const value = e.target.value;
        if (value) {
          this.dataManager.sortEmployees(value, "asc");
        } else {
          this.dataManager.sortEmployees(null, "asc");
        }
        this.employeeManager.currentPage = 1; // Reset to first page
        this.employeeManager.renderEmployees();
        this.employeeManager.updatePagination();
      });
    }
  }

  /**
   * Setup pagination event listeners
   */
  setupPaginationListeners() {
    // Previous page button
    const prevPageBtn = document.getElementById("prev-page-btn");
    if (prevPageBtn) {
      prevPageBtn.addEventListener("click", () => {
        if (this.employeeManager.currentPage > 1) {
          this.employeeManager.goToPage(this.employeeManager.currentPage - 1);
        }
      });
    }

    // Next page button
    const nextPageBtn = document.getElementById("next-page-btn");
    if (nextPageBtn) {
      nextPageBtn.addEventListener("click", () => {
        const paginationData = this.dataManager.getPaginatedEmployees(
          this.employeeManager.currentPage,
          this.employeeManager.itemsPerPage
        );
        if (this.employeeManager.currentPage < paginationData.totalPages) {
          this.employeeManager.goToPage(this.employeeManager.currentPage + 1);
        }
      });
    }

    // Items per page select
    const perPageSelect = document.getElementById("per-page-select");
    if (perPageSelect) {
      perPageSelect.addEventListener("change", (e) => {
        const itemsPerPage = parseInt(e.target.value);
        this.employeeManager.changeItemsPerPage(itemsPerPage);
      });
    }

    // Page numbers (delegated event)
    const paginationContainer = document.getElementById("page-numbers");
    if (paginationContainer) {
      paginationContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("page-number")) {
          const page = parseInt(e.target.dataset.page);
          this.employeeManager.goToPage(page);
        }
      });
    }
  }

  /**
   * Setup form event listeners
   */
  setupFormListeners() {
    // Form submission
    const employeeForm = document.getElementById("employee-form");
    if (employeeForm) {
      employeeForm.addEventListener("submit", (e) => {
        this.employeeManager.handleFormSubmit(e);
      });
    }

    // Close form button
    const closeFormBtn = document.getElementById("close-form-btn");
    if (closeFormBtn) {
      closeFormBtn.addEventListener("click", () => {
        this.employeeManager.hideForm();
      });
    }

    // Cancel button
    const cancelBtn = document.getElementById("cancel-btn");
    if (cancelBtn) {
      cancelBtn.addEventListener("click", () => {
        this.employeeManager.hideForm();
      });
    }

    // Form field validation
    this.setupFormValidation();
  }

  /**
   * Setup form validation
   */
  setupFormValidation() {
    const form = document.getElementById("employee-form");
    if (!form) return;

    const fields = ["firstName", "lastName", "email", "department", "role"];

    fields.forEach((field) => {
      const input = form.querySelector(`[name="${field}"]`);
      if (input) {
        // Real-time validation
        input.addEventListener("blur", () => {
          this.validateField(field, input.value);
        });

        // Clear error on input
        input.addEventListener("input", () => {
          this.clearFieldError(field);
        });
      }
    });
  }

  /**
   * Setup modal event listeners
   */
  setupModalListeners() {
    const modal = document.getElementById("confirm-modal");
    if (modal) {
      // Close modal on backdrop click
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          modal.classList.remove("active");
        }
      });

      // Close modal on escape key
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("active")) {
          modal.classList.remove("active");
        }
      });
    }
  }

  /**
   * Setup keyboard shortcuts
   */
  setupKeyboardShortcuts() {
    document.addEventListener("keydown", (e) => {
      // Ctrl/Cmd + N to add new employee
      if ((e.ctrlKey || e.metaKey) && e.key === "n") {
        e.preventDefault();
        this.employeeManager.clearForm();
        this.employeeManager.showForm("Add New Employee");
      }

      // Ctrl/Cmd + F to focus search
      if ((e.ctrlKey || e.metaKey) && e.key === "f") {
        e.preventDefault();
        const searchInput = document.getElementById("search-input");
        if (searchInput) {
          searchInput.focus();
        }
      }

      // Ctrl/Cmd + K to toggle filters
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        this.toggleFilterPanel();
      }
    });
  }

  /**
   * Toggle filter panel visibility
   */
  toggleFilterPanel() {
    const filterPanel = document.getElementById("filter-panel");
    const filterToggleBtn = document.getElementById("filter-toggle-btn");

    if (filterPanel) {
      this.filterPanelVisible = !this.filterPanelVisible;
      filterPanel.classList.toggle("active", this.filterPanelVisible);

      if (filterToggleBtn) {
        const icon = filterToggleBtn.querySelector("i");
        if (icon) {
          icon.className = this.filterPanelVisible
            ? "fas fa-times"
            : "fas fa-filter";
        }
      }
    }
  }

  /**
   * Apply filters
   */
  applyFilters() {
    const filters = {};

    // Get filter values
    const firstNameFilter = document.getElementById("filter-firstName");
    const departmentFilter = document.getElementById("filter-department");
    const roleFilter = document.getElementById("filter-role");

    if (firstNameFilter && firstNameFilter.value.trim()) {
      filters.firstName = firstNameFilter.value.trim();
    }

    if (departmentFilter && departmentFilter.value) {
      filters.department = departmentFilter.value;
    }

    if (roleFilter && roleFilter.value) {
      filters.role = roleFilter.value;
    }

    // Apply filters
    this.dataManager.filterEmployees(filters);
    this.employeeManager.currentPage = 1; // Reset to first page
    this.employeeManager.renderEmployees();
    this.employeeManager.updatePagination();

    // Hide filter panel on mobile
    if (window.innerWidth <= 768) {
      this.toggleFilterPanel();
    }
  }

  /**
   * Clear all filters
   */
  clearFilters() {
    // Clear filter inputs
    const filterInputs = document.querySelectorAll(
      "#filter-panel input, #filter-panel select"
    );
    filterInputs.forEach((input) => {
      input.value = "";
    });

    // Clear search
    const searchInput = document.getElementById("search-input");
    if (searchInput) {
      searchInput.value = "";
    }

    // Clear sort
    const sortSelect = document.getElementById("sort-select");
    if (sortSelect) {
      sortSelect.value = "";
    }

    // Clear data manager filters
    this.dataManager.clearFilters();

    // Reset to first page and re-render
    this.employeeManager.currentPage = 1;
    this.employeeManager.renderEmployees();
    this.employeeManager.updatePagination();

    // Hide filter panel
    this.toggleFilterPanel();
  }

  /**
   * Initialize filters with available options
   */
  initializeFilters() {
    // Populate department filter
    const departmentFilter = document.getElementById("filter-department");
    if (departmentFilter) {
      const departments = this.dataManager.getDepartments();
      const currentValue = departmentFilter.value;

      // Clear existing options except the first one
      departmentFilter.innerHTML = '<option value="">All Departments</option>';

      departments.forEach((dept) => {
        const option = document.createElement("option");
        option.value = dept;
        option.textContent = dept;
        departmentFilter.appendChild(option);
      });

      // Restore selected value if it exists
      if (currentValue) {
        departmentFilter.value = currentValue;
      }
    }

    // Populate role filter
    const roleFilter = document.getElementById("filter-role");
    if (roleFilter) {
      const roles = this.dataManager.getRoles();
      const currentValue = roleFilter.value;

      // Clear existing options except the first one
      roleFilter.innerHTML = '<option value="">All Roles</option>';

      roles.forEach((role) => {
        const option = document.createElement("option");
        option.value = role;
        option.textContent = role;
        roleFilter.appendChild(option);
      });

      // Restore selected value if it exists
      if (currentValue) {
        roleFilter.value = currentValue;
      }
    }
  }

  /**
   * Validate form field
   * @param {string} field - Field name
   * @param {string} value - Field value
   * @returns {boolean} True if valid
   */
  validateField(field, value) {
    const employeeData = {};
    employeeData[field] = value;

    // Add ID if editing
    if (this.employeeManager.editingEmployeeId) {
      employeeData.id = this.employeeManager.editingEmployeeId;
    }

    const validation = this.dataManager.validateEmployee(employeeData);

    if (validation.errors[field]) {
      this.showFieldError(field, validation.errors[field]);
      return false;
    } else {
      this.clearFieldError(field);
      return true;
    }
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
   * Show notification
   * @param {string} message - Notification message
   * @param {string} type - Notification type
   */
  showNotification(message, type = "info") {
    this.employeeManager.showNotification(message, type);
  }

  /**
   * Update employee list (called when data changes)
   */
  updateEmployeeList() {
    this.employeeManager.renderEmployees();
    this.employeeManager.updatePagination();
  }

  /**
   * Handle empty state actions
   */
  handleEmptyStateActions() {
    // Handle "Add First Employee" button
    document.addEventListener("click", (e) => {
      if (e.target.id === "add-first-employee-btn") {
        this.employeeManager.clearForm();
        this.employeeManager.showForm("Add New Employee");
      }
    });

    // Handle "Clear Filters" button in empty state
    document.addEventListener("click", (e) => {
      if (
        e.target.id === "clear-filters-btn" &&
        e.target.closest(".empty-state")
      ) {
        this.clearFilters();
      }
    });
  }

  /**
   * Setup responsive behavior
   */
  setupResponsiveBehavior() {
    // Handle window resize
    let resizeTimeout;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        this.handleResize();
      }, 250);
    });
  }

  /**
   * Handle window resize
   */
  handleResize() {
    // Hide filter panel on mobile when screen gets smaller
    if (window.innerWidth <= 768 && this.filterPanelVisible) {
      this.toggleFilterPanel();
    }
  }

  /**
   * Setup accessibility features
   */
  setupAccessibility() {
    // Add ARIA labels and roles
    const searchInput = document.getElementById("search-input");
    if (searchInput) {
      searchInput.setAttribute(
        "aria-label",
        "Search employees by name, email, department, or role"
      );
    }

    // Add keyboard navigation for employee cards
    document.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        const target = e.target;
        if (target.classList.contains("employee-card")) {
          e.preventDefault();
          // Focus the edit button
          const editBtn = target.querySelector(".edit-btn");
          if (editBtn) {
            editBtn.focus();
          }
        }
      }
    });

    // Add focus management for modals
    const modal = document.getElementById("confirm-modal");
    if (modal) {
      modal.addEventListener("keydown", (e) => {
        if (e.key === "Tab") {
          const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];

          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              e.preventDefault();
              lastElement.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              e.preventDefault();
              firstElement.focus();
            }
          }
        }
      });
    }
  }

  /**
   * Initialize all UI features
   */
  initialize() {
    this.setupEventListeners();
    this.initializeFilters();
    this.setupResponsiveBehavior();
    this.setupAccessibility();
    this.handleEmptyStateActions();
  }
}

// Export for use in other modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = UIController;
}
