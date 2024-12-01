document.addEventListener("DOMContentLoaded", () => {
    // Check if user is logged in
    const userProfile = JSON.parse(localStorage.getItem("userProfile"));

    const loginSignup = document.getElementById("login-signup");
    const logoutProfile = document.getElementById("logout-profile");

    const signupBannerButton = document.getElementById("signup-banner-button");

    if (userProfile) {
        // User is logged in: Show logout and profile, hide login/signup
        loginSignup.style.display = "none";
        logoutProfile.style.display = "block";
        if (signupBannerButton) {
            signupBannerButton.style.display = "none";
        }
    } else {
        // User is not logged in: Show login/signup, hide logout and profile
        loginSignup.style.display = "block";
        logoutProfile.style.display = "none";
        if (signupBannerButton) {
            signupBannerButton.style.display = "inline-block";
        }
    }

    // Add logout functionality
    document.getElementById("logout").addEventListener("click", () => {
        // Clear localStorage and redirect to homepage
        localStorage.removeItem("userProfile");
        localStorage.removeItem("userOrders");
        alert("You have been logged out.");
        window.location.href = "index.html";
    });
});
