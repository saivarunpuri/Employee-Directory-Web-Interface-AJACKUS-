/**
 * Employee Directory Application
 * Main application file that initializes and coordinates all modules
 */

// Import classes (these will be available globally since they're loaded as scripts)
// DataManager, EmployeeManager, and UIController are loaded from their respective files

/**
 * Main Application Class
 * Coordinates all application modules and handles initialization
 */
class EmployeeDirectoryApp {
  constructor() {
    this.dataManager = null;
    this.employeeManager = null;
    this.uiController = null;
    this.isInitialized = false;
  }

  /**
   * Initialize the application
   */
  init() {
    try {
      console.log("🚀 Initializing Employee Directory Application...");

      // Initialize data manager
      this.initializeDataManager();

      // Initialize employee manager
      this.initializeEmployeeManager();

      // Initialize UI controller
      this.initializeUIController();

      // Setup global error handling
      this.setupErrorHandling();

      // Mark as initialized
      this.isInitialized = true;

      console.log(
        "✅ Employee Directory Application initialized successfully!"
      );

      // Show welcome message
      this.showWelcomeMessage();
    } catch (error) {
      console.error("❌ Error initializing application:", error);
      this.showErrorMessage(
        "Failed to initialize the application. Please refresh the page."
      );
    }
  }

  /**
   * Initialize data manager
   */
  initializeDataManager() {
    if (typeof dataManager !== "undefined") {
      this.dataManager = dataManager;
      console.log("📊 Data Manager initialized");
    } else {
      throw new Error("Data Manager not found");
    }
  }

  /**
   * Initialize employee manager
   */
  initializeEmployeeManager() {
    if (typeof EmployeeManager !== "undefined") {
      this.employeeManager = new EmployeeManager(this.dataManager);
      this.employeeManager.init();
      console.log("👥 Employee Manager initialized");
    } else {
      throw new Error("Employee Manager not found");
    }
  }

  /**
   * Initialize UI controller
   */
  initializeUIController() {
    if (typeof UIController !== "undefined") {
      this.uiController = new UIController(
        this.dataManager,
        this.employeeManager
      );
      this.uiController.initialize();
      console.log("🎨 UI Controller initialized");
    } else {
      throw new Error("UI Controller not found");
    }
  }

  /**
   * Setup global error handling
   */
  setupErrorHandling() {
    // Handle unhandled promise rejections
    window.addEventListener("unhandledrejection", (event) => {
      console.error("Unhandled promise rejection:", event.reason);
      this.showErrorMessage("An unexpected error occurred. Please try again.");
    });

    // Handle global errors
    window.addEventListener("error", (event) => {
      console.error("Global error:", event.error);
      this.showErrorMessage("An error occurred. Please refresh the page.");
    });

    // Handle console errors
    const originalConsoleError = console.error;
    console.error = (...args) => {
      originalConsoleError.apply(console, args);
      // Don't show user notification for console errors to avoid spam
    };
  }

  /**
   * Show welcome message
   */
  showWelcomeMessage() {
    // Check if this is the first visit
    const hasVisited = localStorage.getItem("employeeDirectoryVisited");

    if (!hasVisited) {
      // Show welcome message for first-time visitors
      setTimeout(() => {
        this.showNotification(
          "Welcome to the Employee Directory! 🎉\n\n" +
            "Quick tips:\n" +
            "• Use Ctrl+F to search\n" +
            "• Use Ctrl+N to add a new employee\n" +
            "• Use Ctrl+K to toggle filters",
          "info"
        );

        // Mark as visited
        localStorage.setItem("employeeDirectoryVisited", "true");
      }, 1000);
    }
  }

  /**
   * Show error message
   * @param {string} message - Error message
   */
  showErrorMessage(message) {
    if (this.employeeManager) {
      this.employeeManager.showNotification(message, "error");
    } else {
      // Fallback if employee manager is not available
      alert(message);
    }
  }

  /**
   * Show notification
   * @param {string} message - Notification message
   * @param {string} type - Notification type
   */
  showNotification(message, type = "info") {
    if (this.employeeManager) {
      this.employeeManager.showNotification(message, type);
    }
  }

  /**
   * Get application status
   * @returns {Object} Application status
   */
  getStatus() {
    return {
      isInitialized: this.isInitialized,
      dataManager: !!this.dataManager,
      employeeManager: !!this.employeeManager,
      uiController: !!this.uiController,
      totalEmployees: this.dataManager
        ? this.dataManager.getAllEmployees().length
        : 0,
      filteredEmployees: this.dataManager
        ? this.dataManager.getFilteredEmployees().length
        : 0,
    };
  }

  /**
   * Refresh the application
   */
  refresh() {
    console.log("🔄 Refreshing application...");

    if (this.employeeManager) {
      this.employeeManager.renderEmployees();
      this.employeeManager.updatePagination();
    }

    if (this.uiController) {
      this.uiController.updateEmployeeList();
    }
  }

  /**
   * Export data (for debugging/development)
   */
  exportData() {
    if (!this.dataManager) return null;

    return {
      employees: this.dataManager.getAllEmployees(),
      filteredEmployees: this.dataManager.getFilteredEmployees(),
      filterState: this.dataManager.getFilterState(),
      status: this.getStatus(),
    };
  }

  /**
   * Import data (for debugging/development)
   * @param {Array} employees - Employee data to import
   */
  importData(employees) {
    if (!this.dataManager || !Array.isArray(employees)) return false;

    try {
      // Clear existing data
      this.dataManager.employees = [];
      this.dataManager.filteredEmployees = [];

      // Import new data
      employees.forEach((employee) => {
        this.dataManager.addEmployee(employee);
      });

      // Refresh UI
      this.refresh();

      this.showNotification(
        `Imported ${employees.length} employees successfully.`,
        "success"
      );
      return true;
    } catch (error) {
      console.error("Error importing data:", error);
      this.showErrorMessage("Failed to import data.");
      return false;
    }
  }

  /**
   * Reset application to initial state
   */
  reset() {
    if (!this.dataManager) return;

    try {
      // Reset data manager
      this.dataManager.employees = [...mockEmployees];
      this.dataManager.filteredEmployees = [...mockEmployees];
      this.dataManager.currentFilters = {};
      this.dataManager.currentSort = { field: null, direction: "asc" };
      this.dataManager.currentSearch = "";
      this.dataManager.applyFiltersAndSearch();

      // Reset employee manager
      this.employeeManager.currentPage = 1;
      this.employeeManager.itemsPerPage = 10;
      this.employeeManager.editingEmployeeId = null;

      // Clear form if visible
      this.employeeManager.hideForm();

      // Refresh UI
      this.refresh();

      // Clear filters
      if (this.uiController) {
        this.uiController.clearFilters();
      }

      this.showNotification("Application reset to initial state.", "success");
    } catch (error) {
      console.error("Error resetting application:", error);
      this.showErrorMessage("Failed to reset application.");
    }
  }

  /**
   * Get application statistics
   * @returns {Object} Application statistics
   */
  getStatistics() {
    if (!this.dataManager) return null;

    const employees = this.dataManager.getAllEmployees();

    const stats = {
      totalEmployees: employees.length,
      departments: {},
      roles: {},
      averageNameLength: 0,
      emailDomains: {},
    };

    let totalNameLength = 0;

    employees.forEach((employee) => {
      // Department stats
      stats.departments[employee.department] =
        (stats.departments[employee.department] || 0) + 1;

      // Role stats
      stats.roles[employee.role] = (stats.roles[employee.role] || 0) + 1;

      // Name length
      totalNameLength += (employee.firstName + employee.lastName).length;

      // Email domain stats
      const domain = employee.email.split("@")[1];
      stats.emailDomains[domain] = (stats.emailDomains[domain] || 0) + 1;
    });

    stats.averageNameLength = Math.round(totalNameLength / employees.length);

    return stats;
  }
}

// Global application instance
let app = null;

/**
 * Initialize application when DOM is ready
 */
function initializeApp() {
  // Check if DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      app = new EmployeeDirectoryApp();
      app.init();
    });
  } else {
    // DOM is already ready
    app = new EmployeeDirectoryApp();
    app.init();
  }
}

/**
 * Development utilities (only available in development)
 */
if (typeof window !== "undefined") {
  // Make app globally available for debugging
  window.EmployeeDirectoryApp = EmployeeDirectoryApp;

  // Development helpers
  window.devUtils = {
    getApp: () => app,
    getStatus: () => (app ? app.getStatus() : null),
    getStats: () => (app ? app.getStatistics() : null),
    exportData: () => (app ? app.exportData() : null),
    importData: (data) => (app ? app.importData(data) : null),
    reset: () => (app ? app.reset() : null),
    refresh: () => (app ? app.refresh() : null),
  };
}

// Initialize the application
initializeApp();

// Export for use in other modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = EmployeeDirectoryApp;
}
