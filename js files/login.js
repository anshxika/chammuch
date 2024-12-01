const togglePassword = document.querySelector('#togglePassword');
const password = document.querySelector('#password');

togglePassword.addEventListener('click', function () {
    // Toggle the password visibility
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    
    // Toggle the icon class
    this.classList.toggle('fa-eye-slash');
});

document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            const data = await response.json();
            alert("Login successful!");

            // Save user data in localStorage
            localStorage.setItem("userProfile", JSON.stringify(data.profile));
            localStorage.setItem("userOrders", JSON.stringify(data.orders));

            // Redirect to homepage
            window.location.href = "index.html";
        } else {
            const errorData = await response.json();
            alert(errorData.message || "Login failed. Please try again.");
        }
    } catch (error) {
        console.error("Error during login:", error);
        alert("An error occurred. Please try again.");
    }
});


