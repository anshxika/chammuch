document.addEventListener("DOMContentLoaded", () => {
    const stars = document.querySelectorAll(".star");
    let selectedRating = 0;

    stars.forEach((star, index) => {
        // Add hover effects
        star.addEventListener("mouseover", () => highlightStars(index));
        star.addEventListener("mouseout", () => highlightStars(selectedRating - 1));

        // Set permanent rating on click
        star.addEventListener("click", () => {
            selectedRating = index + 1;
            highlightStars(selectedRating - 1);
        });
    });

    // Highlight stars up to the given index
    function highlightStars(index) {
        stars.forEach((star, i) => {
            star.classList.toggle("hovered", i <= index);
        });
    }

    // Show popup notification
    function showPopup() {
        const popup = document.getElementById("success-popup");
        popup.classList.add("active"); // Show the popup by adding 'active' class

        // Hide the popup after 3 seconds
        setTimeout(() => {
            popup.classList.remove("active"); // Hide popup after timeout
        }, 4000);
    }

    // Handle form submission
    const form = document.getElementById("feedback-form");
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent the default form submission

        const experience = document.getElementById("experience").value;
        const suggestions = document.getElementById("suggestions").value;
        const bugs = document.getElementById("bugs").value;

        // Prepare feedback data
        const feedbackData = {
            rating: selectedRating,
            experience,
            suggestions,
            bugs,
        };

        // Send feedback data to the server
        fetch("http://localhost:4000/submit-feedback", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(feedbackData),
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                showPopup(); // Show success popup
                // Reset form fields
                form.reset();
                selectedRating = 0; // Reset rating
                highlightStars(-1); // Reset star highlighting
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});

