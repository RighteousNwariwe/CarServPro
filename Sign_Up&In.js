// Common validation function for email and password
function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function validatePassword(password) {
    // Check for minimum length and character types
    return password.length >= 14 && /[A-Z]/.test(password) && /[a-z]/.test(password);
}

// Handle sign-up form submission
function handleSignUp(event) {
    event.preventDefault(); // Prevent default form submission

    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;
    const fullName = document.querySelector('input[name="fullname"]').value;

    if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    if (!fullName) {
        alert("Please enter your full name.");
        return;
    }

    if (!validatePassword(password)) {
        alert("Password must be at least 14 characters long and contain at least 1 uppercase and 1 lowercase letter.");
        return;
    }

    // Submit the form (you can replace this with actual AJAX call if needed)
    document.getElementById("form-signup").submit();
}

// Handle sign-in form submission
function handleSignIn(event) {
    event.preventDefault(); // Prevent default form submission

    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;

    if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    if (!password) {
        alert("Please enter your password.");
        return;
    }

    // Submit the form (you can replace this with actual AJAX call if needed)
    document.getElementById("form-signin").submit();
}

// Event listeners for the forms
document.addEventListener("DOMContentLoaded", () => {
    const signUpForm = document.getElementById("form-signup");
    const signInForm = document.getElementById("form-signin");

    if (signUpForm) {
        signUpForm.addEventListener("submit", handleSignUp);
    }

    if (signInForm) {
        signInForm.addEventListener("submit", handleSignIn);
    }
});
