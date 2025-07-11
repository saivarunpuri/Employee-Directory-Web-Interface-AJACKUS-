<#-- Employee Form Template -->
<#-- This template would be processed by Freemarker on the server side -->
<#-- For this assignment, we're simulating the data injection -->

<#-- Assign mock data (simulating server-side data injection) -->
<#assign departments = DEPARTMENTS>
<#assign roles = ROLES>

<div class="form-container">
    <div class="form-header">
        <h2 class="form-header__title" id="form-title">
            <#if employee??>
                Edit Employee
            <#else>
                Add New Employee
            </#if>
        </h2>
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
                    value="<#if employee??>${employee.firstName}</#if>"
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
                    value="<#if employee??>${employee.lastName}</#if>"
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
                    value="<#if employee??>${employee.email}</#if>"
                >
                <span class="form-group__error" id="email-error"></span>
            </div>
            
            <div class="form-group">
                <label for="department" class="form-group__label">
                    Department <span class="required">*</span>
                </label>
                <select id="department" name="department" class="select" required>
                    <option value="">Select Department</option>
                    <#list departments as dept>
                        <option value="${dept}" <#if employee?? && employee.department == dept>selected</#if>>
                            ${dept}
                        </option>
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
                    <#list roles as role>
                        <option value="${role}" <#if employee?? && employee.role == role>selected</#if>>
                            ${role}
                        </option>
                    </#list>
                </select>
                <span class="form-group__error" id="role-error"></span>
            </div>
        </div>
        
        <div class="form-actions">
            <button type="button" class="btn btn--secondary" id="cancel-btn">Cancel</button>
            <button type="submit" class="btn btn--primary" id="save-btn">
                <#if employee??>
                    Update Employee
                <#else>
                    Save Employee
                </#if>
            </button>
        </div>
    </form>
</div> 