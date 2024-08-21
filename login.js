function openSignUpPage() {
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('signupSection').style.display = 'flex';
    document.getElementById('header-login-content').style.display = 'none';
}
function backToLoginPage(){
    document.getElementById('header-login-content').style.display = 'flex';
    document.getElementById('signupSection').style.display = 'none';
    document.getElementById('loginSection').style.display = 'flex';
}
async function SignUp() {
     // If validation fails, the task will not be added
     if (!formvalidationSignUp()) {       
        return;
    }
    let username = document.getElementById("username-signup").value.trim();
    let email = document.getElementById("email-signup").value.trim();
    let password = document.getElementById("password-signup").value.trim();
    let confirmPassword = document.getElementById("confirm-password-signup").value.trim();
    let policyCheckbox = document.getElementById("policy-checkbox");
    let policyError = document.getElementById("policy-error");


     // Clear any previous error message
     policyError.style.display = "none";

    // Basic validation
    if (username === "" || email === "" || password === "" || confirmPassword === "") {
        alert("Please enter a username, email, and password.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }
    if (!policyCheckbox.checked) {
        policyError.textContent = "You must accept the Privacy policy to sign up.";
        policyError.style.display = "inline";
        return;
    }

    let newUser = {
        username: username,
        email: email,
        password: password
    };


    // save to fire abse
    await postContact("/users", newUser);
    alert("Sign-up data saved successfully!");
        
    // Save to local storage
    // localStorage.setItem("user", JSON.stringify(newUser));
    // alert("Sign up successful!");

    
    document.getElementById("username-signup").value = "";
    document.getElementById("email-signup").value = "";
    document.getElementById("password-signup").value = "";
    document.getElementById("confirm-password-signup").value = "";

    
    policyCheckbox.checked = false;
    policyError.style.display = "none";
    
    backToLoginPage();
}
async function loginUser() {
     // If validation fails, the task will not be added
     if (!formvalidationLogIn()) {       
        return;
    }
    let email = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();

    // let savedUser = JSON.parse(localStorage.getItem("user"));

    // if (savedUser && savedUser.email === email && savedUser.password === password) {
    //     alert("Login successful!");
        
    // } else {
    //     alert("Invalid email or password.");
    // }

    if (email === "" || password === "") {
        alert("Please enter both email and password.");
        return;
    }

   
        // Fetch all users from Firebase
        let userResponse = await fetch(BASE_URL + "/users.json");
        let users = await userResponse.json();

        
        let userFound = false;
        
        if (users) {
            for (let key in users) {
                if (users[key].email === email && users[key].password === password) {
                    userFound = true;
                    break;
                }
            }
        }

        if (userFound) {
            alert("Login successful!");
            window.location.replace("summary.html");
        } else {
            alert("Invalid email or password.");
        }

       
}
    
/////////////////////////////////////////////////////form validation login
function formvalidationLogIn() {
    let emailInput = document.getElementById("username");
    let passwordInput = document.getElementById("password");
    let errorDivEmail = document.querySelector(".error-validation-email");
    let errorDivPassword = document.querySelector(".error-validation-password");

    let isValid = true;

     // Checking the Email field
     if (emailInput.value.trim() === "") {
        emailInput.classList.add('invalid');
        errorDivEmail.classList.remove('toggle-display');
        
        isValid = false;
    } else {
        emailInput.classList.remove('invalid');
        errorDivEmail.classList.add('toggle-display');
    }
    // Checking the Passsword field
    if (passwordInput.value.trim() === "") {
        passwordInput.classList.add('invalid');
        errorDivPassword.classList.remove('toggle-display');
        
        isValid = false;
    } else {
        passwordInput.classList.remove('invalid');
        errorDivPassword.classList.add('toggle-display');
    }
    return isValid;
}
/////////////////////////////////////////////////////form validation sign up
function formvalidationSignUp() {
    let usernameSignup = document.getElementById("username-signup");
    let emailSignup = document.getElementById("email-signup");
    let passwordSignup = document.getElementById("password-signup");
    let confirmPasswordSignup = document.getElementById("confirm-password-signup");
    let errorDivUsername = document.querySelector(".error-username");
    let errorDivEmail = document.querySelector(".error-email");
    let errorDivPassword = document.querySelector(".error-Password");
    let errorDivConfirmPassword = document.querySelector(".error-confirm-password");

    let isValid = true;

    // Checking the username field
    if (usernameSignup.value.trim() === "") {
        usernameSignup.classList.add('invalid');
        errorDivUsername.classList.remove('toggle-display');
       
       isValid = false;
    } else {
        usernameSignup.classList.remove('invalid');
        errorDivUsername.classList.add('toggle-display');
    }

    // Checking the email field
    // Regular expression for email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailSignup.value.trim() === "") {
        emailSignup.classList.add('invalid');
        errorDivEmail.classList.remove('toggle-display');
        errorDivEmail.textContent = "This field is required";
        isValid = false;
    } else if (!emailPattern.test(emailSignup.value.trim())) {
        emailSignup.classList.add('invalid');
        errorDivEmail.classList.remove('toggle-display');
        errorDivEmail.textContent = "Please enter a valid email address.";
        isValid = false;
    } else {
        emailSignup.classList.remove('invalid');
        errorDivEmail.classList.add('toggle-display');
    }
    // Checking the Password field
    if (passwordSignup.value.trim() === "") {
        passwordSignup.classList.add('invalid');
        errorDivPassword.classList.remove('toggle-display');

        isValid = false;
    } else {
        passwordSignup.classList.remove('invalid');
        errorDivPassword.classList.add('toggle-display');
    }
     // Checking the Confirm Password field
     if (confirmPasswordSignup.value.trim() === "") {
        confirmPasswordSignup.classList.add('invalid');
        errorDivConfirmPassword.classList.remove('toggle-display');
        errorDivConfirmPassword.textContent = "This field is required";
        isValid = false;
    } else if (confirmPasswordSignup.value.trim() !== passwordSignup.value.trim()) {
        confirmPasswordSignup.classList.add('invalid');
        errorDivConfirmPassword.classList.remove('toggle-display');
        errorDivConfirmPassword.textContent = "Passwords do not match";
        isValid = false;
    } else {
        confirmPasswordSignup.classList.remove('invalid');
        errorDivConfirmPassword.classList.add('toggle-display');
    }
    return isValid;
}
