var showMenu = function showMenu(toggleId, navId) {
    var toggle = document.querySelector(".nav__toggle"),
        nav = document.getElementById(navId);

    if (toggle && nav) {
        toggle.addEventListener('click', function () {
            
            nav.classList.toggle('show-menu');
        });
    }
};
setTimeout( showMenu('nav-toggle', 'nav-menu'),5000
)


var navLink = document.querySelectorAll('.nav__link');

function linkAction() {
    var navMenu = document.getElementById('nav-menu');

    navMenu.classList.remove('show-menu');
}
navLink.forEach(function (n) {
    return n.addEventListener('click', linkAction);
});

