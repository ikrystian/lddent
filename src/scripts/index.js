import $ from 'jquery';
import scrollSpy from 'simple-scrollspy';
import tippy, {followCursor} from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import Cookies from 'js-cookie'
import 'slick-carousel';
import 'lazysizes';

window.onload = function () {
    scrollSpy('#main-menu', {
        sectionClass: '.section',
        menuActiveTarget: '.nav__link',
        offset: 64
    });
    $('.slick').slick({
        arrows: false,
        autoplay: true,
        fade: true,
        speed: 1000
    });
    $('#loader').remove();


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
    tippy('[data-tippy-content]:not(.cookie-info)');


    const anim = function () {
        let particlesOpts = {};
        particlesOpts.complete = () => {
            $('.modal__footer').text('Wiadomość została wysłana ❤');
            setTimeout(function () {
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
            $('.modal__error').text('Popraw wymagane pola');
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
                phone: $('#visit-phone').val()
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


    particlesJS("particles-js", {
        "particles": {
            "number": {"value": 160, "density": {"enable": true, "value_area": 800}},
            "color": {"value": "#ffffff"},
            "shape": {
                "type": "circle",
                "stroke": {"width": 0, "color": "#000000"},
                "polygon": {"nb_sides": 5},
            },
            "opacity": {
                "value": 1,
                "random": true,
                "anim": {"enable": true, "speed": 1, "opacity_min": 0, "sync": false}
            },
            "size": {"value": 8, "random": true, "anim": {"enable": false, "speed": 4, "size_min": 0.3, "sync": false}},
            "line_linked": {"enable": false, "distance": 150, "color": "#ffffff", "opacity": 0.4, "width": 1},
            "move": {
                "enable": true,
                "speed": 1,
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {"enable": false, "rotateX": 600, "rotateY": 600}
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {"enable": true, "mode": "bubble"},
                "onclick": {"enable": true, "mode": "repulse"},
                "resize": true
            },
            "modes": {
                "grab": {"distance": 400, "line_linked": {"opacity": 1}},
                "bubble": {"distance": 250, "size": 0, "duration": 2, "opacity": 0, "speed": 3},
                "repulse": {"distance": 400, "duration": 0.4},
                "push": {"particles_nb": 4},
                "remove": {"particles_nb": 2}
            }
        },
        "retina_detect": true
    });

    let cookieInfoBar = $('.cookie-info');
    cookieInfoBar.on('click', function () {
        Cookies.set('cookies', 'accept', {expires: 365});
        $(this).remove();
    });

    tippy('.cookie-info', {
        placement: 'top',
        followCursor: 'horizontal',
        plugins: [followCursor]
    });


    if (Cookies.get('cookies') === 'accept') {
        cookieInfoBar.remove();
    }

    $('#privacy-button, .privacy__button').on('click', () => {
        $('.privacy').toggleClass('privacy--opened');

    });

    $('dt').on('click', function() {
        $('.faq__item').removeClass('faq__item--current');
        $(this).parent().addClass('faq__item--current');
        $('dd').slideUp();
        $(this).next().slideDown();
    })

};
