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
$('.close-modal').on('click', () => $('.modal__wrapper').fadeOut());

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

$(window).scroll(function () {
    let header = $('.header');
    let scroll = header.offset().top;

    if (scroll >= 500) {
        header.addClass('header--no-margin');
    } else {
        header.removeClass('header--no-margin');
    }
    recentScroll = true;
    window.setTimeout(function () {
        recentScroll = false;
    }, 2000)
});

$('.offer-puzzles__button').on('click', function () {
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

const anim = function () {
    let particlesOpts = {};
    particlesOpts.complete = () => {
        $('.modal__footer').text('Wiadomość została wysłana ❤');
        setTimeout(function(){
            $('.modal__wrapper').fadeOut();
        }, 5000);

    };
    const particles = new Particles(document.getElementById('as'), particlesOpts);
    if (!particles.isAnimating()) {
        particles.disintegrate();
    }
};

const formValidation = () => {
    $('.modal').addClass('modal--checked');
    if (
        $('#visit-name').val() === '' || $('#visit-date').val() === ''
    ) {
        $('.modal__error').text('Popraw formularz fredzie');
        return false
    } else {
        $('.modal__error').text('');
        return true;
    }
};

$('#as').on('click', function (e) {
    e.preventDefault();
    if (formValidation()) {
        let data = {
            name: $('#visit-name').val(),
            date: $('#visit-date').val(),
            person: $('#visit-person').val(),
            description: $('#visit-description').val()
        };
        fetch('http://lddent.bpc-dev.pl/mail.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                (data === 200) ? anim() : $('.modal__error').text('Coś poszło nie tak')
            })
            .catch((error) => {
                $('.modal__error').text(error)
            });
    }
});


