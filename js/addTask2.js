
/**
 * Clears all input values, selections, and resets the form on the "Add Task" page.
 * @returns {void}
 */
function clearInputsAndSelections() {
    // Clear all input values
    fields.forEach(id => {
        const element = document.getElementById(id);
        if (element) element.value = ""; 
    });
    // Clear all selected contacts and uncheck them
    selectedContacts = [];
    let dropdownContent = document.getElementById('contactsDropdown');
    let checkboxes = dropdownContent.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
    updateSelectedBadges();
    // Clear subtasks and remove all of them
    createdSubTasks = [];
    let subTasks = document.querySelectorAll(".subtask-list");
    subTasks.forEach(function(subTask) {
        subTask.remove();
    });
}

/**
 * Resets all priority buttons to their default state and ensures the "medium" priority is active.
 * Also resets the edit task popup if applicable.
 * @returns {void}
 */
function resetPriorityButtonsAndEditTask() { 
    const urgentBtn = document.getElementById('urgent');
    const mediumBtn = document.getElementById('medium');
    const lowBtn = document.getElementById('low');
    urgentBtn.className = 'priority-btn';
    mediumBtn.className = 'priority-btn';
    lowBtn.className = 'priority-btn';
    mediumBtn.classList.add('medium-prio-active');

    // Reset the edit task popup
    if (typeof resetPopupEditTask === 'function') {
        resetPopupEditTask();
    }
}

/**
 * Clears the task input form by resetting all inputs and selections, 
 * as well as resetting priority buttons and the task editor.
 * @returns {void}
 */
function clearAddTaskForm() {
    clearInputsAndSelections();
    resetPriorityButtonsAndEditTask();
}

/**
 * Saves the value of a new subtask into an array.
 * @returns {void}
 */
function saveAddTaskArray(){
    let subTaskValue = document.getElementById("sub-task-input").value
    createdSubTasks.push(subTaskValue);
}

/**
 * Validates the title input field, displaying an error message if the field is empty.
 * @returns {boolean} - Returns true if the title is valid, false otherwise.
 */
function validateTitle() {
    let titleInput = document.getElementById("title");
    let errorDivTitle = document.querySelector(".error-validation-title");

    if (titleInput.value.trim() === "") {
        titleInput.classList.add('invalid');
        errorDivTitle.classList.remove('toggle-display');
        return false;
    } else {
        titleInput.classList.remove('invalid');
        errorDivTitle.classList.add('toggle-display');
        return true;
    }
}

/**
 * Validates the date input field, displaying an error message if the field is empty.
 * @returns {boolean} - Returns true if the date is valid, false otherwise.
 */
function validateDate() {
    let dateInput = document.getElementById("date");
    let errorDivDate = document.querySelector(".error-validation-date");

    if (dateInput.value.trim() === "") {
        errorDivDate.classList.remove('toggle-display');
        dateInput.classList.add('invalid');
        return false;
    } else {
        dateInput.classList.remove('invalid');
        errorDivDate.classList.add('toggle-display');
        return true;
    }
}

/**
 * Validates the category input field, displaying an error message if no category is selected.
 * @returns {boolean} - Returns true if the category is valid, false otherwise.
 */
function validateCategory() {
    let categorySelect = document.getElementById("category");
    let errorDivCategory = document.querySelector(".error-validation-category");

    if (categorySelect.value === "") {
        errorDivCategory.classList.remove('toggle-display');
        categorySelect.classList.add('invalid');
        return false;
    } else {
        categorySelect.classList.remove('invalid');
        errorDivCategory.classList.add('toggle-display');
        return true;
    }
}

/**
 * Combines the validation functions for title, date, and category inputs to determine 
 * if the form is valid for submission.
 * @returns {boolean} - Returns true if all fields are valid, false otherwise.
 */
function formvalidation() {
    let isTitleValid = validateTitle();
    let isDateValid = validateDate();
    let isCategoryValid = validateCategory();

    return isTitleValid && isDateValid && isCategoryValid;
}




