// Login.js
import objValidation from './Validation.js';
import { getUser } from './LocalStorage.js';

// Get the login form
const form = document.getElementById("loginForm");

// Get the input fields
const email = form.querySelectorAll("input[placeholder='Email']")[0];
const password = form.querySelectorAll("input[placeholder='Password']")[0];

// Create error messages below inputs
const emailErr = document.createElement("p");
const passwordErr = document.createElement("p");

email.parentNode.appendChild(emailErr);
password.parentNode.appendChild(passwordErr);

// Style error messages
[emailErr, passwordErr].forEach(error => {
  error.style.color = "red";
  error.style.fontSize = "12px";
});

// Real-time validation
email.addEventListener("input", () => {
  emailErr.textContent = objValidation.emailValidation(email.value)
    ? ""
    : "Invalid email";
});

password.addEventListener("input", () => {
  passwordErr.textContent = objValidation.passwordValidation(password.value)
    ? ""
    : "Invalid password";
});

// Handle form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const savedUser = getUser(); // Load user from localStorage

  if (!savedUser) {
    alert("No user found. Please signup first.");
    return;
  }

  const enteredEmail = email.value.trim();
  const enteredPassword = password.value.trim();

  if (enteredEmail === savedUser.email && enteredPassword === savedUser.password) {
    form.reset();

    // ✅ Create success message
    const msgBox = document.createElement("div");
    msgBox.textContent = "✅ Login successful! Redirecting...";
    msgBox.classList.add("login-success-msg"); // Style in CSS
    form.parentNode.appendChild(msgBox);

    // ✅ Redirect parentNode.appendChild 1 second
    setTimeout(() => {
      window.location.href = "home.html";
    },0);
  } else {
    alert("Wrong email or password.");
  }
});
