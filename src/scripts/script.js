const burger = document.querySelector('.burger');
const header = document.querySelector('.header');

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

burger.addEventListener('click', burgerToggle);