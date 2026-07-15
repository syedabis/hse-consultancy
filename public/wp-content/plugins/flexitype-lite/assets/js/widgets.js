(function ($) {
    "use strict";
 
    var CustomBanner = function () {
        var banner_three_thumb = new Swiper(".slide_thumb", {
            spaceBetween: 0,
            slidesPerView: 3,
            freeMode: true,
            watchSlidesProgress: true,
            autoplay: {
                delay: 4500,
                reverseDirection: false,
                disableOnInteraction: false,
            }
        });
        let sliderActive22 = '.slide_three';
        let sliderInit22 = new Swiper(sliderActive22, {
            slidesPerView: 1,
            loop: true,
            effect: 'fade',
            autoplay: {
                delay: 4500,
                reverseDirection: false,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: '.banner_next',
                prevEl: '.banner_prev',
            },
            thumbs: {
                swiper: banner_three_thumb,
            },
        });
        function animated_swiper(selector, init) {
            let animated = function animated() {
                $(selector + ' [data-animation]').each(function() {
                    let anim = $(this).data('animation');
                    let delay = $(this).data('delay');
                    let duration = $(this).data('duration');
                    $(this).removeClass('anim' + anim).addClass(anim + ' animated').css({
                        webkitAnimationDelay: delay,
                        animationDelay: delay,
                        webkitAnimationDuration: duration,
                        animationDuration: duration
                    }).one('animationend', function() {
                        $(this).removeClass(anim + ' animated');
                    });
                });
            };
            animated();
            init.on('slideChange', function() {
                $(sliderActive22 + ' [data-animation]').removeClass('animated');
            });
            init.on('slideChange', animated);
        }
        animated_swiper(sliderActive22, sliderInit22);    
    }
    var customSearch = function ($scope, $) { 
        $(".flexitype-search-icon.open").on("click", function () {
            $(".flexitype-search-box")
                .fadeIn()
                .addClass("active");
            }
        );
        $(".flexitype-search-box-icon").on("click", function () {
            $(this).fadeIn().removeClass("active");
        });
        $(".flexitype-search-box-icon i").on("click", function () {
            $(".flexitype-search-box")
                .fadeOut()
                .removeClass("active");
            }
        );
	}

    var VideoPopup = function () {
        $('.video-popup').magnificPopup({
            type: 'iframe'
        });
    }
   ///=============  Header Sticky  =============\\\
    $(window).on("scroll", function () {
        var scrollDown = $(window).scrollTop();
        if (scrollDown < 135) {
            $(".header__sticky").removeClass("header__sticky-sticky-menu");
        } else {
            $(".header__sticky").addClass("header__sticky-sticky-menu");
        }
    });

    $(window).on('elementor/frontend/init', function () {
        elementorFrontend.hooks.addAction('frontend/element_ready/flexitype-custom-banner.default', CustomBanner);
        elementorFrontend.hooks.addAction('frontend/element_ready/flexitype-search.default', customSearch);
        elementorFrontend.hooks.addAction('frontend/element_ready/flexitype-video.default', VideoPopup);
    });


})(jQuery);