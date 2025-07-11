<#-- Employee Directory Dashboard Template -->
<#-- This template would be processed by Freemarker on the server side -->
<#-- For this assignment, we're simulating the data injection -->

<#-- Assign mock data (simulating server-side data injection) -->
<#assign employees = mockEmployees>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Employee Directory - AJACKUS</title>
    <meta name="description" content="A comprehensive employee directory web interface with advanced filtering and search capabilities">
    
    <!-- CSS Files -->
    <link rel="stylesheet" href="/static/css/style.css">
    <link rel="stylesheet" href="/static/css/components.css">
    <link rel="stylesheet" href="/static/css/responsive.css">
    
    <!-- Font Awesome for Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <!-- Header -->
    <header class="header">
        <div class="container">
            <div class="header__content">
                <h1 class="header__title">
                    <i class="fas fa-users"></i>
                    Employee Directory
                </h1>
                <button class="btn btn--primary" id="add-employee-btn">
                    <i class="fas fa-plus"></i>
                    Add Employee
                </button>
            </div>
        </div>
    </header>

    <!-- Main Content -->
    <main class="main">
        <div class="container">
            <!-- Dashboard Section -->
            <section class="dashboard" id="dashboard-section">
                <!-- Search and Filter Controls -->
                <div class="controls">
                    <div class="controls__search">
                        <div class="search-box">
                            <i class="fas fa-search search-box__icon"></i>
                            <input 
                                type="text" 
                                id="search-input" 
                                class="search-box__input" 
                                placeholder="Search employees..."
                                aria-label="Search employees"
                            >
                        </div>
                    </div>
                    
                    <div class="controls__filters">
                        <button class="btn btn--secondary" id="filter-toggle-btn">
                            <i class="fas fa-filter"></i>
                            Filters
                        </button>
                        
                        <div class="sort-controls">
                            <select id="sort-select" class="select" aria-label="Sort by">
                                <option value="">Sort by...</option>
                                <option value="firstName">First Name</option>
                                <option value="lastName">Last Name</option>
                                <option value="department">Department</option>
                                <option value="role">Role</option>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- Filter Panel -->
                <div class="filter-panel" id="filter-panel">
                    <div class="filter-panel__content">
                        <h3 class="filter-panel__title">Filter Employees</h3>
                        
                        <div class="filter-grid">
                            <div class="filter-group">
                                <label for="filter-firstName" class="filter-group__label">First Name</label>
                                <input type="text" id="filter-firstName" class="input" placeholder="Enter first name">
                            </div>
                            
                            <div class="filter-group">
                                <label for="filter-department" class="filter-group__label">Department</label>
                                <select id="filter-department" class="select">
                                    <option value="">All Departments</option>
                                    <#list DEPARTMENTS as dept>
                                        <option value="${dept}">${dept}</option>
                                    </#list>
                                </select>
                            </div>
                            
                            <div class="filter-group">
                                <label for="filter-role" class="filter-group__label">Role</label>
                                <select id="filter-role" class="select">
                                    <option value="">All Roles</option>
                                    <#list ROLES as role>
                                        <option value="${role}">${role}</option>
                                    </#list>
                                </select>
                            </div>
                        </div>
                        
                        <div class="filter-panel__actions">
                            <button class="btn btn--primary" id="apply-filters-btn">Apply Filters</button>
                            <button class="btn btn--secondary" id="clear-filters-btn">Clear All</button>
                        </div>
                    </div>
                </div>

                <!-- Employee List -->
                <div class="employee-list" id="employee-list">
                    <div class="employee-grid">
                        <#-- Freemarker loop to render initial employee list -->
                        <#list employees as employee>
                            <div class="employee-card" data-employee-id="${employee.id}">
                                <div class="employee-card__header">
                                    <div>
                                        <h3 class="employee-card__name">${employee.firstName} ${employee.lastName}</h3>
                                        <p class="employee-card__id">ID: ${employee.id}</p>
                                    </div>
                                    <div class="employee-card__actions">
                                        <button class="btn btn--secondary btn--sm edit-btn" data-id="${employee.id}" aria-label="Edit ${employee.firstName} ${employee.lastName}">
                                            <i class="fas fa-edit"></i>
                                            Edit
                                        </button>
                                        <button class="btn btn--danger btn--sm delete-btn" data-id="${employee.id}" aria-label="Delete ${employee.firstName} ${employee.lastName}">
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
                                        <span>Joined: ${employee.createdAt?date}</span>
                                    </div>
                                </div>
                            </div>
                        </#list>
                    </div>
                </div>

                <!-- Pagination -->
                <div class="pagination" id="pagination">
                    <div class="pagination__info">
                        <span id="pagination-info">Showing 1-${employees?size} of ${employees?size} employees</span>
                    </div>
                    
                    <div class="pagination__controls">
                        <button class="btn btn--secondary" id="prev-page-btn" disabled>
                            <i class="fas fa-chevron-left"></i>
                            Previous
                        </button>
                        
                        <div class="pagination__pages" id="page-numbers">
                            <!-- Page numbers will be generated by JavaScript -->
                        </div>
                        
                        <button class="btn btn--secondary" id="next-page-btn" disabled>
                            Next
                            <i class="fas fa-chevron-right"></i>
                        </button>
                    </div>
                    
                    <div class="pagination__per-page">
                        <label for="per-page-select">Show:</label>
                        <select id="per-page-select" class="select">
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                    </div>
                </div>
            </section>

            <!-- Add/Edit Form Section -->
            <section class="form-section" id="form-section" style="display: none;">
                <div class="form-container">
                    <div class="form-header">
                        <h2 class="form-header__title" id="form-title">Add New Employee</h2>
                        <button class="btn btn--icon" id="close-form-btn" aria-label="Close form">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    
                    <form id="employee-form" class="employee-form">
                        <div class="form-grid">
                            <div class="form-group">
                                <label for="firstName" class="form-group__label">
                                    First Name <span class="required">*</span>
                                </label>
                                <input 
                                    type="text" 
                                    id="firstName" 
                                    name="firstName" 
                                    class="input" 
                                    required
                                    placeholder="Enter first name"
                                >
                                <span class="form-group__error" id="firstName-error"></span>
                            </div>
                            
                            <div class="form-group">
                                <label for="lastName" class="form-group__label">
                                    Last Name <span class="required">*</span>
                                </label>
                                <input 
                                    type="text" 
                                    id="lastName" 
                                    name="lastName" 
                                    class="input" 
                                    required
                                    placeholder="Enter last name"
                                >
                                <span class="form-group__error" id="lastName-error"></span>
                            </div>
                            
                            <div class="form-group">
                                <label for="email" class="form-group__label">
                                    Email <span class="required">*</span>
                                </label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    name="email" 
                                    class="input" 
                                    required
                                    placeholder="Enter email address"
                                >
                                <span class="form-group__error" id="email-error"></span>
                            </div>
                            
                            <div class="form-group">
                                <label for="department" class="form-group__label">
                                    Department <span class="required">*</span>
                                </label>
                                <select id="department" name="department" class="select" required>
                                    <option value="">Select Department</option>
                                    <#list DEPARTMENTS as dept>
                                        <option value="${dept}">${dept}</option>
                                    </#list>
                                </select>
                                <span class="form-group__error" id="department-error"></span>
                            </div>
                            
                            <div class="form-group">
                                <label for="role" class="form-group__label">
                                    Role <span class="required">*</span>
                                </label>
                                <select id="role" name="role" class="select" required>
                                    <option value="">Select Role</option>
                                    <#list ROLES as role>
                                        <option value="${role}">${role}</option>
                                    </#list>
                                </select>
                                <span class="form-group__error" id="role-error"></span>
                            </div>
                        </div>
                        
                        <div class="form-actions">
                            <button type="button" class="btn btn--secondary" id="cancel-btn">Cancel</button>
                            <button type="submit" class="btn btn--primary" id="save-btn">Save Employee</button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    </main>

    <!-- Confirmation Modal -->
    <div class="modal" id="confirm-modal">
        <div class="modal__content">
            <div class="modal__header">
                <h3 class="modal__title">Confirm Action</h3>
            </div>
            <div class="modal__body">
                <p id="confirm-message">Are you sure you want to perform this action?</p>
            </div>
            <div class="modal__actions">
                <button class="btn btn--secondary" id="cancel-action-btn">Cancel</button>
                <button class="btn btn--danger" id="confirm-action-btn">Confirm</button>
            </div>
        </div>
    </div>

    <!-- Loading Overlay -->
    <div class="loading-overlay" id="loading-overlay">
        <div class="loading-spinner">
            <i class="fas fa-spinner fa-spin"></i>
            <span>Loading...</span>
        </div>
    </div>

    <!-- JavaScript Files -->
    <script src="/static/js/data.js"></script>
    <script src="/static/js/employeeManager.js"></script>
    <script src="/static/js/uiController.js"></script>
    <script src="/static/js/app.js"></script>
</body>
</html> 