document.addEventListener("DOMContentLoaded", () => {
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const signupForm = document.getElementById("signupForm");

    const togglePassword = document.getElementById("togglePassword");
    const toggleConfirmPassword = document.getElementById("toggleConfirmPassword");

    togglePassword.addEventListener("click", () => {
        const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
        passwordInput.setAttribute("type", type);
        togglePassword.classList.toggle("fa-eye-slash");
    });

    toggleConfirmPassword.addEventListener("click", () => {
        const type = confirmPasswordInput.getAttribute("type") === "password" ? "text" : "password";
        confirmPasswordInput.setAttribute("type", type);
        toggleConfirmPassword.classList.toggle("fa-eye-slash");
    });

    const tooltip = document.createElement("div");
    tooltip.classList.add("tooltip");
    tooltip.innerText = "Passwords don't match";
    confirmPasswordInput.parentElement.appendChild(tooltip);

    function checkPasswordMatch(event) {
        if (passwordInput.value !== confirmPasswordInput.value) {
            event.preventDefault();
            confirmPasswordInput.classList.add("shake");
            tooltip.classList.add("show");

            // Hide tooltip after 2 seconds
            setTimeout(() => {
                tooltip.classList.remove("show");
            }, 3000);

            setTimeout(() => {
                confirmPasswordInput.classList.remove("shake");
            }, 300);
        } else {
            tooltip.classList.remove("show");
        }
    }

    signupForm.addEventListener("submit", checkPasswordMatch);
});
