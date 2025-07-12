/**
 * Employee Directory - Data Management
 * This file contains mock employee data and data management functions
 */

// Mock employee data - simulating data passed from Freemarker template
const mockEmployees = [
  {
    id: 1,
    firstName: "Rohith",
    lastName: "Kumar",
    email: "rohith.kumar@ajackus.com",
    department: "IT",
    role: "Senior Developer",
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    firstName: "Sunitha",
    lastName: "Reddy",
    email: "sunitha.reddy@ajackus.com",
    department: "HR",
    role: "HR Manager",
    createdAt: "2024-01-20",
  },
  {
    id: 3,
    firstName: "Ramesh",
    lastName: "Patel",
    email: "ramesh.patel@ajackus.com",
    department: "Marketing",
    role: "Marketing Specialist",
    createdAt: "2024-02-01",
  },
  {
    id: 4,
    firstName: "Priya",
    lastName: "Sharma",
    email: "priya.sharma@ajackus.com",
    department: "Finance",
    role: "Financial Analyst",
    createdAt: "2024-02-10",
  },
  {
    id: 5,
    firstName: "Arjun",
    lastName: "Singh",
    email: "arjun.singh@ajackus.com",
    department: "IT",
    role: "DevOps Engineer",
    createdAt: "2024-02-15",
  },
  {
    id: 6,
    firstName: "Anjali",
    lastName: "Verma",
    email: "anjali.verma@ajackus.com",
    department: "Sales",
    role: "Sales Representative",
    createdAt: "2024-02-20",
  },
  {
    id: 7,
    firstName: "Vikram",
    lastName: "Malhotra",
    email: "vikram.malhotra@ajackus.com",
    department: "Engineering",
    role: "Software Engineer",
    createdAt: "2024-03-01",
  },
  {
    id: 8,
    firstName: "Kavya",
    lastName: "Iyer",
    email: "kavya.iyer@ajackus.com",
    department: "Marketing",
    role: "Content Manager",
    createdAt: "2024-03-05",
  },
  {
    id: 9,
    firstName: "Suresh",
    lastName: "Gupta",
    email: "suresh.gupta@ajackus.com",
    department: "IT",
    role: "System Administrator",
    createdAt: "2024-03-10",
  },
  {
    id: 10,
    firstName: "Meera",
    lastName: "Joshi",
    email: "meera.joshi@ajackus.com",
    department: "HR",
    role: "Recruiter",
    createdAt: "2024-03-15",
  },
  {
    id: 11,
    firstName: "Rajesh",
    lastName: "Khan",
    email: "rajesh.khan@ajackus.com",
    department: "Engineering",
    role: "Frontend Developer",
    createdAt: "2024-03-20",
  },
  {
    id: 12,
    firstName: "Divya",
    lastName: "Chopra",
    email: "divya.chopra@ajackus.com",
    department: "Finance",
    role: "Accountant",
    createdAt: "2024-03-25",
  },
  {
    id: 13,
    firstName: "Amit",
    lastName: "Desai",
    email: "amit.desai@ajackus.com",
    department: "Sales",
    role: "Sales Manager",
    createdAt: "2024-04-01",
  },
  {
    id: 14,
    firstName: "Pooja",
    lastName: "Mehta",
    email: "pooja.mehta@ajackus.com",
    department: "Marketing",
    role: "Digital Marketing Specialist",
    createdAt: "2024-04-05",
  },
  {
    id: 15,
    firstName: "Naveen",
    lastName: "Rao",
    email: "naveen.rao@ajackus.com",
    department: "IT",
    role: "QA Engineer",
    createdAt: "2024-04-10",
  },
  {
    id: 16,
    firstName: "Swati",
    lastName: "Nair",
    email: "swati.nair@ajackus.com",
    department: "Engineering",
    role: "Backend Developer",
    createdAt: "2024-04-15",
  },
  {
    id: 17,
    firstName: "Krishna",
    lastName: "Menon",
    email: "krishna.menon@ajackus.com",
    department: "HR",
    role: "HR Coordinator",
    createdAt: "2024-04-20",
  },
  {
    id: 18,
    firstName: "Rashmi",
    lastName: "Pillai",
    email: "rashmi.pillai@ajackus.com",
    department: "Finance",
    role: "Financial Controller",
    createdAt: "2024-04-25",
  },
  {
    id: 19,
    firstName: "Deepak",
    lastName: "Tiwari",
    email: "deepak.tiwari@ajackus.com",
    department: "Sales",
    role: "Account Executive",
    createdAt: "2024-05-01",
  },
  {
    id: 20,
    firstName: "Shweta",
    lastName: "Bhat",
    email: "shweta.bhat@ajackus.com",
    department: "Marketing",
    role: "Brand Manager",
    createdAt: "2024-05-05",
  },
  {
    id: 21,
    firstName: "Manoj",
    lastName: "Shetty",
    email: "manoj.shetty@ajackus.com",
    department: "IT",
    role: "Network Engineer",
    createdAt: "2024-05-10",
  },
  {
    id: 22,
    firstName: "Lakshmi",
    lastName: "Venkatesh",
    email: "lakshmi.venkatesh@ajackus.com",
    department: "Engineering",
    role: "Full Stack Developer",
    createdAt: "2024-05-15",
  },
  {
    id: 23,
    firstName: "Ravi",
    lastName: "Krishnan",
    email: "ravi.krishnan@ajackus.com",
    department: "HR",
    role: "Benefits Specialist",
    createdAt: "2024-05-20",
  },
  {
    id: 24,
    firstName: "Sneha",
    lastName: "Mukherjee",
    email: "sneha.mukherjee@ajackus.com",
    department: "Finance",
    role: "Budget Analyst",
    createdAt: "2024-05-25",
  },
  {
    id: 25,
    firstName: "Bharat",
    lastName: "Choudhary",
    email: "bharat.choudhary@ajackus.com",
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
