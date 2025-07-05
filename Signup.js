// Signup.js
import objValidation from './Validation.js';
import { saveUser } from './signupStorage.js';

const form = document.getElementById("signupForm");

const name = form.querySelector("input[placeholder='Name']");
const mobile = form.querySelector("input[placeholder='Mobile']");
const email = form.querySelectorAll("input[placeholder='Email']")[0];
const password = form.querySelectorAll("input[placeholder='Password']")[0];
const confirmPassword = form.querySelector("input[placeholder='Confirm Password']");

// Error messages
const nameErr = document.createElement("p");
const mobileErr = document.createElement("p");
const emailErr = document.createElement("p");
const passwordErr = document.createElement("p");

[name, mobile, email, password].forEach((input, i) =>
  input.parentNode.appendChild([nameErr, mobileErr, emailErr, passwordErr][i])
);

[nameErr, mobileErr, emailErr, passwordErr].forEach(e => {
  e.style.color = "red";
  e.style.fontSize = "12px";
});

// Real-time check
name.addEventListener("input", () => {
  nameErr.textContent = objValidation.nameValidation(name.value) ? "" : "Enter full name";
});
mobile.addEventListener("input", () => {
  mobileErr.textContent = objValidation.mobileValidation(mobile.value) ? "" : "Mobile must be 10 digits";
});
email.addEventListener("input", () => {
  emailErr.textContent = objValidation.emailValidation(email.value) ? "" : "Invalid email";
});
password.addEventListener("input", () => {
  passwordErr.textContent = objValidation.passwordValidation(password.value) ? "" : "Weak password";
});

// Submit action
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const isValid =
    objValidation.nameValidation(name.value) &&
    objValidation.mobileValidation(mobile.value) &&
    objValidation.emailValidation(email.value) &&
    objValidation.passwordValidation(password.value);

  if (!isValid) return alert("Fix errors before submitting.");
  if (password.value !== confirmPassword.value) return alert("Passwords do not match.");

  const user = {
    name: name.value,
    mobile: mobile.value,
    email: email.value,
    password: password.value
  };

  saveUser(user); //Use our separate storage file
  alert("Signup successful!");
  form.reset();
});
