import $ from 'jquery';
import scrollSpy from 'simple-scrollspy';
window.onload = function () {
    scrollSpy('#main-menu', {
        sectionClass: '.section',
        menuActiveTarget: '.nav__link',
        offset: 64
    })
};

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
