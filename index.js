const burgerMenu = document.querySelector('.burger-menu')
const close = document.querySelector('.close');
const menu = document.querySelector('.mobile-menu');

burgerMenu.addEventListener('click', () => {
    menu.style.display = 'block'
})

close.addEventListener('click', () => {
    menu.style.display = 'none'
})