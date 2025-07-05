// Run this when the page is fully loaded
window.addEventListener("DOMContentLoaded", () => {

  const allLinks = document.querySelectorAll("a");

  allLinks.forEach(oneLink => {

    if (oneLink.textContent.includes("Logout")) {


      oneLink.addEventListener("click", function(userClick) {
        userClick.preventDefault();

        localStorage.removeItem("user");

        alert("You are now logged out!");

        window.location.href = "LoginSignup.html";
      });
    }
  });
});
