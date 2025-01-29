const burger = document.querySelector('.burger');
const header = document.querySelector('.header');
const catalog = document.querySelector('.catalog');
const reviews = document.querySelector('.reviews');



function burgerToggle() {
    if(burger.getAttribute('class').includes('closed')) {
        burger.classList.remove('closed');
        burger.classList.add('open');
        header.classList.add('menu-open');
    } else {
        burger.classList.remove('open');
        burger.classList.add('closed');
        header.classList.remove('menu-open');
    }
}

//Slider=========

function slider(section, apBool) {
    let isDragging = false, isAutoPlay = apBool, startX, startScrollLeft, timeoutId;

    const wrapper = section.querySelector('.slider');
    const carousel = wrapper.querySelector('.carousel');
    const cards = wrapper.querySelectorAll('.card');
    const cardsQuantity = cards.length;
    const firstCardWidth = wrapper.querySelector('.card').offsetWidth;
    const arrowBtns = wrapper.querySelectorAll('.slider-btn');
    const carouselChildrens = [...carousel.children];

// Get the number of cards that can fit in the carousel at once
    let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);
// Insert copies of the last few cards to beginning of carousel for infinite scrolling
    carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
        carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
    });
// Insert copies of the first few cards to end of carousel for infinite scrolling
    carouselChildrens.slice(0, cardPerView).forEach(card => {
        carousel.insertAdjacentHTML("beforeend", card.outerHTML);
    });
// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");
// Add event listeners for the arrow buttons to scroll the carousel left and right
    arrowBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
        });
    });
    const dragStart = (e) => {
        isDragging = true;
        carousel.classList.add("dragging");
        // Records the initial cursor and scroll position of the carousel
        startX = e.pageX;
        startScrollLeft = carousel.scrollLeft;
    }
    const dragging = (e) => {
        if(!isDragging) return; // if isDragging is false return from here
        // Updates the scroll position of the carousel based on the cursor movement
        carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
    }
    const dragStop = () => {
        isDragging = false;
        carousel.classList.remove("dragging");
    }
    const infiniteScroll = () => {
        // If the carousel is at the beginning, scroll to the end
        if(carousel.scrollLeft === 0) {
            carousel.classList.add("no-transition");
            carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
            carousel.classList.remove("no-transition");
        }
        // If the carousel is at the end, scroll to the beginning
        else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
            carousel.classList.add("no-transition");
            carousel.scrollLeft = carousel.offsetWidth;
            carousel.classList.remove("no-transition");
        }
        // Clear existing timeout & start autoplay if mouse is not hovering over carousel
        clearTimeout(timeoutId);
        if(!wrapper.matches(":hover")) autoPlay();
    }
    const autoPlay = () => {
        if(window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
        // Autoplay the carousel after every 6000 ms
        timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 6000);
    }
    autoPlay();
    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);
    carousel.addEventListener("scroll", infiniteScroll);
    wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
    wrapper.addEventListener("mouseleave", autoPlay);
}

burger.addEventListener('click', burgerToggle);

slider(catalog, false);
slider(reviews, true);
