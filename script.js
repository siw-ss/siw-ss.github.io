// Menu show Y hidden
const navMenu = document.getElementById('nav-menu'),
    toggleMenu = document.getElementById('nav-toggle'),
    closeMenu = document.getElementById('nav-close'),
    trigger = document.querySelector(".trigger"),
    allTriggers = document.querySelectorAll(".trigger"),
    allCloseButtons =  document.querySelector(".close-button"),
    modal = document.querySelector(".works__modal");
    allModals = document.querySelectorAll(".works__modal");

    console.log(trigger);
    console.log(allTriggers);
    console.log(allModals);
// Show
toggleMenu.addEventListener('click', ()=>{
    navMenu.classList.toggle('show');
});

// Hidden
closeMenu.addEventListener('click', ()=>{
    navMenu.classList.remove('show');
});

// Remove menu
const navLink = document.querySelectorAll('.nav__link');

function linkAction()
{
    navMenu.classList.remove('show');
};

navLink.forEach(n => n.addEventListener('click', linkAction));

// Scroll ections active link
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', scrollActive);
const scrollY = window.pageYOffset

function scrollActive(){

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop +sectionHeight)
        {
            document.querySelector('.nav__menu a[href*=' + sectionId +']').classList.add('active')
        }
        else
        {
            document.querySelector('.nav__menu a[href*=' + sectionId +']').classList.remove('active')
        }
    })
}

/* //modal
function toggleModal() {
    modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

for (let i = 0; i < allTriggers.length; i++) {
    allTriggers[i].addEventListener('click', toggleModal);
}
allCloseButtons.addEventListener("click", toggleModal);

window.addEventListener("click", windowOnClick);
 */