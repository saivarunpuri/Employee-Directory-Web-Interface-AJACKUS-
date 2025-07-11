/**
 * Employee Directory - Data Management
 * This file contains mock employee data and data management functions
 */

// Mock employee data - simulating data passed from Freemarker template
const mockEmployees = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@ajackus.com",
    department: "IT",
    role: "Senior Developer",
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@ajackus.com",
    department: "HR",
    role: "HR Manager",
    createdAt: "2024-01-20",
  },
  {
    id: 3,
    firstName: "Michael",
    lastName: "Johnson",
    email: "michael.johnson@ajackus.com",
    department: "Marketing",
    role: "Marketing Specialist",
    createdAt: "2024-02-01",
  },
  {
    id: 4,
    firstName: "Sarah",
    lastName: "Williams",
    email: "sarah.williams@ajackus.com",
    department: "Finance",
    role: "Financial Analyst",
    createdAt: "2024-02-10",
  },
  {
    id: 5,
    firstName: "David",
    lastName: "Brown",
    email: "david.brown@ajackus.com",
    department: "IT",
    role: "DevOps Engineer",
    createdAt: "2024-02-15",
  },
  {
    id: 6,
    firstName: "Emily",
    lastName: "Davis",
    email: "emily.davis@ajackus.com",
    department: "Sales",
    role: "Sales Representative",
    createdAt: "2024-02-20",
  },
  {
    id: 7,
    firstName: "Robert",
    lastName: "Wilson",
    email: "robert.wilson@ajackus.com",
    department: "Engineering",
    role: "Software Engineer",
    createdAt: "2024-03-01",
  },
  {
    id: 8,
    firstName: "Lisa",
    lastName: "Anderson",
    email: "lisa.anderson@ajackus.com",
    department: "Marketing",
    role: "Content Manager",
    createdAt: "2024-03-05",
  },
  {
    id: 9,
    firstName: "James",
    lastName: "Taylor",
    email: "james.taylor@ajackus.com",
    department: "IT",
    role: "System Administrator",
    createdAt: "2024-03-10",
  },
  {
    id: 10,
    firstName: "Amanda",
    lastName: "Martinez",
    email: "amanda.martinez@ajackus.com",
    department: "HR",
    role: "Recruiter",
    createdAt: "2024-03-15",
  },
  {
    id: 11,
    firstName: "Christopher",
    lastName: "Garcia",
    email: "christopher.garcia@ajackus.com",
    department: "Engineering",
    role: "Frontend Developer",
    createdAt: "2024-03-20",
  },
  {
    id: 12,
    firstName: "Jessica",
    lastName: "Rodriguez",
    email: "jessica.rodriguez@ajackus.com",
    department: "Finance",
    role: "Accountant",
    createdAt: "2024-03-25",
  },
  {
    id: 13,
    firstName: "Daniel",
    lastName: "Lee",
    email: "daniel.lee@ajackus.com",
    department: "Sales",
    role: "Sales Manager",
    createdAt: "2024-04-01",
  },
  {
    id: 14,
    firstName: "Ashley",
    lastName: "White",
    email: "ashley.white@ajackus.com",
    department: "Marketing",
    role: "Digital Marketing Specialist",
    createdAt: "2024-04-05",
  },
  {
    id: 15,
    firstName: "Matthew",
    lastName: "Harris",
    email: "matthew.harris@ajackus.com",
    department: "IT",
    role: "QA Engineer",
    createdAt: "2024-04-10",
  },
  {
    id: 16,
    firstName: "Nicole",
    lastName: "Clark",
    email: "nicole.clark@ajackus.com",
    department: "Engineering",
    role: "Backend Developer",
    createdAt: "2024-04-15",
  },
  {
    id: 17,
    firstName: "Andrew",
    lastName: "Lewis",
    email: "andrew.lewis@ajackus.com",
    department: "HR",
    role: "HR Coordinator",
    createdAt: "2024-04-20",
  },
  {
    id: 18,
    firstName: "Samantha",
    lastName: "Robinson",
    email: "samantha.robinson@ajackus.com",
    department: "Finance",
    role: "Financial Controller",
    createdAt: "2024-04-25",
  },
  {
    id: 19,
    firstName: "Kevin",
    lastName: "Walker",
    email: "kevin.walker@ajackus.com",
    department: "Sales",
    role: "Account Executive",
    createdAt: "2024-05-01",
  },
  {
    id: 20,
    firstName: "Rachel",
    lastName: "Perez",
    email: "rachel.perez@ajackus.com",
    department: "Marketing",
    role: "Brand Manager",
    createdAt: "2024-05-05",
  },
  {
    id: 21,
    firstName: "Thomas",
    lastName: "Hall",
    email: "thomas.hall@ajackus.com",
    department: "IT",
    role: "Network Engineer",
    createdAt: "2024-05-10",
  },
  {
    id: 22,
    firstName: "Lauren",
    lastName: "Young",
    email: "lauren.young@ajackus.com",
    department: "Engineering",
    role: "Full Stack Developer",
    createdAt: "2024-05-15",
  },
  {
    id: 23,
    firstName: "Ryan",
    lastName: "Allen",
    email: "ryan.allen@ajackus.com",
    department: "HR",
    role: "Benefits Specialist",
    createdAt: "2024-05-20",
  },
  {
    id: 24,
    firstName: "Stephanie",
    lastName: "King",
    email: "stephanie.king@ajackus.com",
    department: "Finance",
    role: "Budget Analyst",
    createdAt: "2024-05-25",
  },
  {
    id: 25,
    firstName: "Brandon",
    lastName: "Wright",
    email: "brandon.wright@ajackus.com",
    department: "Sales",
    role: "Sales Director",
    createdAt: "2024-06-01",
  },
];

// Available departments and roles for form validation
const DEPARTMENTS = [
  "IT",
  "HR",
  "Marketing",
  "Sales",
  "Finance",
  "Engineering",
];

const ROLES = [
  "Manager",
  "Developer",
  "Designer",
  "Analyst",
  "Coordinator",
  "Specialist",
  "Engineer",
  "Representative",
  "Director",
  "Controller",
  "Recruiter",
  "Accountant",
  "Administrator",
  "Content Manager",
  "Digital Marketing Specialist",
  "QA Engineer",
  "Backend Developer",
  "HR Coordinator",
  "Financial Controller",
  "Account Executive",
  "Brand Manager",
  "Network Engineer",
  "Full Stack Developer",
  "Benefits Specialist",
  "Budget Analyst",
  "Sales Director",
  "Senior Developer",
  "HR Manager",
  "Marketing Specialist",
  "Financial Analyst",
  "DevOps Engineer",
  "Sales Representative",
  "Software Engineer",
  "System Administrator",
  "Frontend Developer",
];

/**
 * Data Management Class
 * Handles all data operations including CRUD operations, filtering, and sorting
 */
class DataManager {
  constructor() {
    this.employees = [...mockEmployees];
    this.filteredEmployees = [...mockEmployees];
    this.currentFilters = {};
    this.currentSort = { field: null, direction: "asc" };
    this.currentSearch = "";
  }

  /**
   * Get all employees
   * @returns {Array} Array of all employees
   */
  getAllEmployees() {
    return this.employees;
  }

  /**
   * Get filtered employees
   * @returns {Array} Array of filtered employees
   */
  getFilteredEmployees() {
    return this.filteredEmployees;
  }

  /**
   * Add a new employee
   * @param {Object} employee - Employee object to add
   * @returns {Object} The added employee with generated ID
   */
  addEmployee(employee) {
    const newEmployee = {
      ...employee,
      id: this.generateId(),
      createdAt: new Date().toISOString().split("T")[0],
    };

    this.employees.push(newEmployee);
    this.applyFiltersAndSearch();
    return newEmployee;
  }

  /**
   * Update an existing employee
   * @param {number} id - Employee ID
   * @param {Object} updates - Employee data to update
   * @returns {Object|null} Updated employee or null if not found
   */
  updateEmployee(id, updates) {
    const index = this.employees.findIndex((emp) => emp.id === id);
    if (index === -1) return null;

    this.employees[index] = { ...this.employees[index], ...updates };
    this.applyFiltersAndSearch();
    return this.employees[index];
  }

  /**
   * Delete an employee
   * @param {number} id - Employee ID to delete
   * @returns {boolean} True if deleted, false if not found
   */
  deleteEmployee(id) {
    const index = this.employees.findIndex((emp) => emp.id === id);
    if (index === -1) return false;

    this.employees.splice(index, 1);
    this.applyFiltersAndSearch();
    return true;
  }

  /**
   * Get employee by ID
   * @param {number} id - Employee ID
   * @returns {Object|null} Employee object or null if not found
   */
  getEmployeeById(id) {
    return this.employees.find((emp) => emp.id === id) || null;
  }

  /**
   * Search employees
   * @param {string} query - Search query
   */
  searchEmployees(query) {
    this.currentSearch = query.toLowerCase().trim();
    this.applyFiltersAndSearch();
  }

  /**
   * Filter employees
   * @param {Object} filters - Filter criteria
   */
  filterEmployees(filters) {
    this.currentFilters = { ...filters };
    this.applyFiltersAndSearch();
  }

  /**
   * Sort employees
   * @param {string} field - Field to sort by
   * @param {string} direction - Sort direction ('asc' or 'desc')
   */
  sortEmployees(field, direction = "asc") {
    this.currentSort = { field, direction };
    this.applyFiltersAndSearch();
  }

  /**
   * Apply all filters and search to employees
   */
  applyFiltersAndSearch() {
    let filtered = [...this.employees];

    // Apply search
    if (this.currentSearch) {
      filtered = filtered.filter(
        (emp) =>
          emp.firstName.toLowerCase().includes(this.currentSearch) ||
          emp.lastName.toLowerCase().includes(this.currentSearch) ||
          emp.email.toLowerCase().includes(this.currentSearch) ||
          emp.department.toLowerCase().includes(this.currentSearch) ||
          emp.role.toLowerCase().includes(this.currentSearch)
      );
    }

    // Apply filters
    Object.keys(this.currentFilters).forEach((key) => {
      const value = this.currentFilters[key];
      if (value && value.trim() !== "") {
        filtered = filtered.filter((emp) => {
          const empValue = emp[key];
          if (key === "firstName") {
            return empValue.toLowerCase().includes(value.toLowerCase());
          }
          return empValue === value;
        });
      }
    });

    // Apply sorting
    if (this.currentSort.field) {
      filtered.sort((a, b) => {
        const aValue = a[this.currentSort.field];
        const bValue = b[this.currentSort.field];

        if (this.currentSort.direction === "asc") {
          return aValue.localeCompare(bValue);
        } else {
          return bValue.localeCompare(aValue);
        }
      });
    }

    this.filteredEmployees = filtered;
  }

  /**
   * Get paginated employees
   * @param {number} page - Current page (1-based)
   * @param {number} itemsPerPage - Items per page
   * @returns {Object} Object with employees and pagination info
   */
  getPaginatedEmployees(page = 1, itemsPerPage = 10) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedEmployees = this.filteredEmployees.slice(
      startIndex,
      endIndex
    );

    return {
      employees: paginatedEmployees,
      totalItems: this.filteredEmployees.length,
      totalPages: Math.ceil(this.filteredEmployees.length / itemsPerPage),
      currentPage: page,
      itemsPerPage: itemsPerPage,
      startIndex: startIndex + 1,
      endIndex: Math.min(endIndex, this.filteredEmployees.length),
    };
  }

  /**
   * Get unique departments
   * @returns {Array} Array of unique departments
   */
  getDepartments() {
    return [...new Set(this.employees.map((emp) => emp.department))].sort();
  }

  /**
   * Get unique roles
   * @returns {Array} Array of unique roles
   */
  getRoles() {
    return [...new Set(this.employees.map((emp) => emp.role))].sort();
  }

  /**
   * Generate unique ID for new employees
   * @returns {number} Unique ID
   */
  generateId() {
    const maxId = Math.max(...this.employees.map((emp) => emp.id), 0);
    return maxId + 1;
  }

  /**
   * Validate employee data
   * @param {Object} employee - Employee data to validate
   * @returns {Object} Validation result with errors
   */
  validateEmployee(employee) {
    const errors = {};

    // Required fields
    if (!employee.firstName || employee.firstName.trim() === "") {
      errors.firstName = "First name is required";
    }

    if (!employee.lastName || employee.lastName.trim() === "") {
      errors.lastName = "Last name is required";
    }

    if (!employee.email || employee.email.trim() === "") {
      errors.email = "Email is required";
    } else if (!this.isValidEmail(employee.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!employee.department || employee.department.trim() === "") {
      errors.department = "Department is required";
    }

    if (!employee.role || employee.role.trim() === "") {
      errors.role = "Role is required";
    }

    // Check for duplicate email
    const existingEmployee = this.employees.find(
      (emp) =>
        emp.email.toLowerCase() === employee.email.toLowerCase() &&
        emp.id !== employee.id
    );

    if (existingEmployee) {
      errors.email = "Email address already exists";
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }

  /**
   * Validate email format
   * @param {string} email - Email to validate
   * @returns {boolean} True if valid email
   */
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Clear all filters and search
   */
  clearFilters() {
    this.currentFilters = {};
    this.currentSearch = "";
    this.currentSort = { field: null, direction: "asc" };
    this.applyFiltersAndSearch();
  }

  /**
   * Get current filter state
   * @returns {Object} Current filters, search, and sort state
   */
  getFilterState() {
    return {
      filters: { ...this.currentFilters },
      search: this.currentSearch,
      sort: { ...this.currentSort },
    };
  }
}

// Create global data manager instance
const dataManager = new DataManager();

// Export for use in other modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = { dataManager, DEPARTMENTS, ROLES };
}
