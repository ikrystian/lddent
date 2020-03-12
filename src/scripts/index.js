import $ from 'jquery';
import scrollSpy from 'simple-scrollspy';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';


window.onload = function () {
    scrollSpy('#main-menu', {
        sectionClass: '.section',
        menuActiveTarget: '.nav__link',
        offset: 64
    })
};
$('.close-modal').on('click', () =>  $('.modal__wrapper').fadeOut());

const person = $('.person');
person.on('click', function () {
    let id = $(this).attr('data-person');
    let description = $('.person-description');
    let descriptionContainer = `#${id}-person-details`;

    person.removeClass('person--active');
    $(this).addClass('person--active');
    description.hide();
    $(descriptionContainer).slideDown();
});
let recentScroll = false;

$(window).scroll(function() {
    let header = $('.header');
    let scroll = header.offset().top;

    if (scroll >= 500) {
        header.addClass('header--no-margin');
    } else {
        header.removeClass('header--no-margin');
    }
    recentScroll = true;
    window.setTimeout(function() { recentScroll = false; }, 2000)
});

$('.offer-puzzles__button').on('click', function() {
    $('.offer-puzzles__button').removeClass('offer-puzzles__button--active');
    $(this).addClass('offer-puzzles__button--active');

    let id = $(this).attr('data-offer');
    $('.offer__description').hide();
    let concatId = `#${id}`;
    $(concatId).show();
});
$('#show-modal, .home button').on('click', () => {
    $('.modal__wrapper').css('display', 'flex');
});
tippy('[data-tippy-content]');


const arrOpts = [{}];

const items = document.querySelectorAll('.modal__footer');
items.forEach((el, pos) => {
    const bttn = el.querySelector('button.particles-button');

    let particlesOpts = arrOpts[pos];
    particlesOpts.complete = () => {
       $('.modal__footer').text('Wiadomość została wysłana ❤')
    };
    const particles = new Particles(bttn, particlesOpts);

    let buttonVisible = true;
    bttn.addEventListener('click', () => {
        if ( !particles.isAnimating() && buttonVisible ) {
            particles.disintegrate();
            buttonVisible = !buttonVisible;
        }
    });

});
