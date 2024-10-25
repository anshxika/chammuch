document.addEventListener("DOMContentLoaded", () => {
    const stars = document.querySelectorAll(".star");
    const feedbackForm = document.getElementById("feedback-form");
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

    // Highlight stars up to given index
    function highlightStars(index) {
        stars.forEach((star, i) => {
            star.classList.toggle("hovered", i <= index);
        });
    }

    // Handle form submission
    feedbackForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent default form submission

        // Collect feedback data
        const experience = document.getElementById("experience").value;
        const suggestions = document.getElementById("suggestions").value;
        const bugs = document.getElementById("bugs").value;

        // Send feedback data to backend
        fetch("http://localhost:3000/submit-feedback", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                rating: selectedRating,
                experience,
                suggestions,
                bugs,
            }),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            alert(data.message); // Display success message
            feedbackForm.reset(); // Reset the form
            selectedRating = 0; // Reset the selected rating
            highlightStars(-1); // Reset star highlights
        })
        .catch((error) => {
            console.error('There was a problem with the fetch operation:', error);
            alert("Error submitting feedback. Please try again."); // Display error message
        });
    });
});


