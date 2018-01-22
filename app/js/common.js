$(document).ready(function () {

    // lazyload
    $('img, .ubg').unveil({
        offset: 200,
        throttle: 200
    });

    // accordion
    $('.title').on('click', function () {
        $('.icon-arrows2').removeClass('transform');
        $('.content').slideUp();
        if ($(this).next().is(':hidden') == true) {
            $(this).next().slideDown();
            $(this).prev('.icon-arrows2').addClass('transform');
        }
    });
    $('.content').hide();

    //tabs
    $('.types__toggle').hide();
    $('.types__toggle:first').show();
    $('.types__buttons li:first').addClass('active');

    $('.types__buttons li').click(function (e) {
        e.preventDefault();
        $('.types__buttons li').removeClass('active');
        $(this).addClass('active');
        $('.types__toggle').hide();
        var selectTab = $(this).find('a').attr('href');
        $(selectTab).fadeIn();
    });

    //click event to scroll to top
    $('#scrollToTop').click(function () {
        $('html, body').animate({
            scrollTop: 0
        }, 1800);
        return false;
    });

    // hamburger button
    $(".b-hamburger").click(function (event) {
        event.preventDefault();
        $("span").toggleClass("active");
        $(".mobile-menu").toggleClass("toggle-menu");
    });

    // mobile-menu
    $('.mobile-menu').on('click', 'a', function () {
        $(".mobile-menu").removeClass("toggle-menu");
        $("span").removeClass("active");
    });

    // fancybox
    $("[data-fancybox]").fancybox({});

    // objectFitImages
    $(function () {
        objectFitImages()
    });

    // font observer
    var normalRoboto = new FontFaceObserver('Roboto', {
        weight: 400,
    });

    var normalMedium = new FontFaceObserver('Roboto', {
        weight: 500,
    });

    var boldlRoboto = new FontFaceObserver('Roboto', {
        weight: 700,
    });
    var thinlRoboto = new FontFaceObserver('Roboto', {
        weight: 100,
    });
    var lightUbuntu = new FontFaceObserver('Ubuntu', {
        weight: 300,
    });
    var boldUbuntu = new FontFaceObserver('Ubuntu', {
        weight: 700,
    });
    var mediumUbuntu = new FontFaceObserver('Ubuntu', {
        weight: 500,
    });

    var html = document.documentElement;
    html.classList.add('fonts-loading');

    Promise.all([
        normalRoboto.load(),
        normalMedium.load(),
        boldlRoboto.load(),
        thinlRoboto.load(),
        lightUbuntu.load(),
        boldUbuntu.load(),
        mediumUbuntu.load(),
    ]).then(function () {
        console.log('Roboto fonts downloaded');
        html.classList.remove('fonts-loading');
        html.classList.add('fonts-loaded');
    }).catch(function () {
        html.classList.remove('fonts-loading');
        html.classList.add('fonts-failed');
    });
});

// sticky on scroll
$(window).scroll(function () {
    if ($(this).scrollTop() > 0) {
        $('.header__header-mobile').addClass("sticky");
    } else {
        $('.header__header-mobile').removeClass("sticky");
    }
});

// up button
$(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
        $('#scrollToTop').fadeIn();
    } else {
        $('#scrollToTop').fadeOut();
    }
});

// preloader
$(window).on('load', function () {
    //    $("#preloader").delay(500).fadeOut("slow");
});