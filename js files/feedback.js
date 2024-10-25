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

    // Highlight stars up to given index
    function highlightStars(index) {
        stars.forEach((star, i) => {
            star.classList.toggle("hovered", i <= index);
        });
    }
});

