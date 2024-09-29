// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBC3peygTmzI-YeZXY_E6OlUsGK-BG2vHw",
  authDomain: "carserv-pro.firebaseapp.com",
  projectId: "carserv-pro",
  storageBucket: "carserv-pro.appspot.com",
  messagingSenderId: "889182625583",
  appId: "1:889182625583:web:072d1c9b45d69252104bda",
  measurementId: "G-X8ZC2G1L48"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(); // Initialize Firebase Authentication

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

    // Firebase sign-up logic
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Successfully signed up
            const user = userCredential.user;
            alert(Account created successfully for ${fullName}.);
            
            // You can store additional user info in Firestore if needed
            const db = getFirestore(app);
            return setDoc(doc(db, "users", user.uid), {
                fullName: fullName,
                email: email,
            });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
        });
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

    // Firebase sign-in logic
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Successfully signed in
            const user = userCredential.user;
            alert(Welcome back, ${user.email}!);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
        });
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