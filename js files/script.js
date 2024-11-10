const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');
const cardsWrapper = document.querySelector('.cards-wrapper');

leftArrow.addEventListener('click', () => {
    cardsWrapper.scrollBy({
        top: 0,
        left: -200,
        behavior: 'smooth'
    });
});

rightArrow.addEventListener('click', () => {
    cardsWrapper.scrollBy({
        top: 0,
        left: 200,
        behavior: 'smooth'
    });
});
