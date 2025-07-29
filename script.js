document.addEventListener('DOMContentLoaded', () => {
    // Image Slider functionality
    const sliderImages = document.querySelectorAll('.slider-image');
    const rightArrow = document.querySelector('.right-arrow');
    const leftArrow = document.querySelector('.left-arrow');
    const sliderContainer = document.querySelector('.slider-container'); // For swipe events
    let currentIndex = 0;
    let slideInterval;

    // --- Core slider logic ---
    function showImage(index) {
        // Remove 'active' class from all images
        sliderImages.forEach(img => {
            img.classList.remove('active');
        });

        // Handle wrapping around for infinite loop effect
        if (index >= sliderImages.length) {
            currentIndex = 0;
        } else if (index < 0) {
            currentIndex = sliderImages.length - 1;
        } else {
            currentIndex = index;
        }

        // Add 'active' class to the current image
        sliderImages[currentIndex].classList.add('active');
    }

    function nextImage() {
        showImage(currentIndex + 1);
    }

    function prevImage() {
        showImage(currentIndex - 1);
    }

    function startSlider() {
        clearInterval(slideInterval); // Clear any existing interval to prevent multiple intervals
        slideInterval = setInterval(nextImage, 5000); // Set new interval for automatic slide
    }

    // --- Initialization ---
    if (sliderImages.length > 0) {
        // Ujistěte se, že první obrázek je aktivní hned na začátku
        // (je to již v HTML, ale pro jistotu to zkontrolujeme/nastavíme)
        if (!sliderImages[0].classList.contains('active')) {
            sliderImages[0].classList.add('active');
        }
        showImage(0); // Zobrazit první obrázek při načtení
        startSlider(); // Spustit automatické posouvání
    }

    // --- Event Listeners ---
    if (rightArrow) {
        rightArrow.addEventListener('click', () => {
            nextImage();
            startSlider(); // Reset interval after manual interaction
        });
    }

    if (leftArrow) {
        leftArrow.addEventListener('click', () => {
            prevImage();
            startSlider(); // Reset interval after manual interaction
        });
    }

    // --- Swipe Functionality ---
    let touchStartX = 0;
    let touchEndX = 0;

    if (sliderContainer) {
        sliderContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            clearInterval(slideInterval); // Pause auto-slide during touch
        });

        sliderContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].clientX;
            handleSwipe();
            startSlider(); // Resume auto-slide after touch
        });

        // Optional: Add touchmove to prevent default scrolling on vertical swipe
        // Pouze pokud slider zabírá velkou část obrazovky a chcete zamezit posouvání
        // stránky při horizontálním swipu. Může ovlivnit celkové chování stránky.
        /*
        sliderContainer.addEventListener('touchmove', (e) => {
            e.preventDefault();
        }, { passive: false });
        */
    }

    function handleSwipe() {
        const swipeThreshold = 50; // Minimum distance for a swipe to be recognized
        if (touchEndX < touchStartX - swipeThreshold) { // Swiped left
            nextImage();
        } else if (touchEndX > touchStartX + swipeThreshold) { // Swiped right
            prevImage();
        }
    }
});