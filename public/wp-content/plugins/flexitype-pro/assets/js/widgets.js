(function ($) {
    "use strict";
    var onePageMenu = function () {
        $(document).ready(function () {
            $('.onepage_menu-navigation a[href*=#]').bind('click', function(e) {
                e.preventDefault(); 
                var target = $(this).attr("href"); 
                $('html, body').stop().animate({
                    scrollTop: $(target).offset().top 
                }, 900, function() {
                    location.hash = target; 
                });
                return false;
            });
            $(window).scroll(function() {
                var scrollDistance = $(window).scrollTop(); 
                $('.onepage_nav').each(function() {
                    var sectionTop = $(this).offset().top - 200; 
                    var sectionBottom = sectionTop + $(this).outerHeight();
    
                    if (scrollDistance >= sectionTop && scrollDistance < sectionBottom) {
                        var sectionId = $(this).attr('id'); 
                        $('.onepage_menu-navigation a.active').removeClass('active'); 
                        $('.onepage_menu-navigation a[href="#' + sectionId + '"]').addClass('active'); 
                    }
                });
            }).scroll();
            $(window).on('load', function() {
                $(window).scroll();
            });
        });
    }
	///============= * Wrapper Link  =============\\\
    $('body').on('click.onWrapperLink', '[data-flexitype-wrapper-link]', function () {
        var $wrapper = $(this),
        data = $wrapper.data('flexitype-wrapper-link'),
        id = $wrapper.data('id'),
        anchor = document.createElement('a'),
        anchorReal,
        timeout;
        anchor.id = 'flexitype' + id;
        anchor.href = data.url;
        anchor.target = data.is_external ? '_blank' : '_self';
        anchor.rel = data.nofollow ? 'nofollow noreferer' : '';
        anchor.style.display = 'none';
        document.body.appendChild(anchor);
        anchorReal = document.getElementById(anchor.id);
        anchorReal.click();
        timeout = setTimeout(function () {
            document.body.removeChild(anchorReal);
            clearTimeout(timeout);
        });
    });
    var progressBar = function () {
        if($('.skill__area-item-bar').length) {
            $('.skill__area-item-bar').appear(function() {
                var el = $(this);
                var percent = el.data('width');
                $(el).css('width', percent + '%');
            }, {
                accY: 0
            });
        };
        // count
        function animateCounter(element, duration) {
            const endValue = parseInt(element.getAttribute('data-value'));
            let count = 0;
            const frames = duration / Math.abs(endValue);
            const increment = endValue > 0 ? 1 : -1;
            function updateCounter() {
                if (count <= endValue) {
                    element.textContent = `${count}%`;
                    count += increment;
                    setTimeout(updateCounter, frames);
                }
            }
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        observer.disconnect();
                        updateCounter();
                    }
                });
            });
            observer.observe(element);
        }
        document.querySelectorAll('.ft_counter').forEach(element => animateCounter(element, 2200));        
    }

    var imageScrolling = function () {
        $(document).ready(function($) {
            $(".image-scroll[data-trigger-type='hover']").each(function(i, imageScroll) {
                var $imageScroll = $(imageScroll);
                var scrollType = $imageScroll.data("scroll-type");
                var scrollDirection = $imageScroll.data("scroll-direction");

                $imageScroll.on('mouseover', function() {
                    var $image = $imageScroll.find('img');
                    if (scrollType === "vertical") {
                        var height = $image.height() - $imageScroll.height();
                        if (scrollDirection === "top") {
                            $image.css({
                                '-webkit-transform': 'translateY(-' + height + 'px)',
                                'transform': 'translateY(-' + height + 'px)'
                            });
                        } else {
                            $image.css({
                                '-webkit-transform': 'translateY(' + height + 'px)',
                                'transform': 'translateY(' + height + 'px)'
                            });
                        }
                    } else if (scrollType === "horizontal") {
                        var width = $image.width() - $imageScroll.width();
                        if (scrollDirection === "left") {
                            $image.css({
                                '-webkit-transform': 'translateX(-' + width + 'px)',
                                'transform': 'translateX(-' + width + 'px)'
                            });
                        } else {
                            $image.css({
                                '-webkit-transform': 'translateX(' + width + 'px)',
                                'transform': 'translateX(' + width + 'px)'
                            });
                        }
                    }
                }).on('mouseout', function() {
                    var $image = $imageScroll.find('img');
                    if (scrollType === "vertical") {
                        $image.css({
                            '-webkit-transform': 'translateY(0px)',
                            'transform': 'translateY(0px)'
                        });
                    } else if (scrollType === "horizontal") {
                        $image.css({
                            '-webkit-transform': 'translateX(0px)',
                            'transform': 'translateX(0px)'
                        });
                    }
                });
            });
        });
    }

    var verticalHeader = function () {
        $(document).ready(function () {
            $(".flexitype-vertical-header-popup-icon i").on("click", function () {
                $(".flexitype-vertical-header-popup").addClass("active");
            });
            $(".flexitype-vertical-header .sidebar-close-btn").on("click",function () {
                $(".flexitype-vertical-header-popup").removeClass("active");
            });
        });
    }
    var OffCanvas = function () {
        $(document).ready(function () {
            $(".flexitype-offcanvas-popup-icon i, .flexitype-offcanvas-popup-icon svg").on("click", function () {
                $(".flexitype-offcanvas-popup").addClass("active");
            });
            $(".flexitype-offcanvas-popup .sidebar-close-btn").on("click",function () {
                $(".flexitype-offcanvas-popup").removeClass("active");
            });
            $(".flexitype-offcanvas-popup-icon i, .flexitype-offcanvas-popup-icon svg").on("click", function () {
                $(".offcanvas-overlay").addClass("show");
            });
            $(".flexitype-offcanvas-popup .sidebar-close-btn").on("click",function () {
                $(".offcanvas-overlay").removeClass("show");
            });
        });
	}

    $(window).on('elementor/frontend/init', function () {
        elementorFrontend.hooks.addAction('frontend/element_ready/flexitype-skill-bar.default', progressBar);
        elementorFrontend.hooks.addAction('frontend/element_ready/flexitype-image-scroll.default', imageScrolling);
        elementorFrontend.hooks.addAction('frontend/element_ready/flexitype-offcanvas.default', OffCanvas);
        elementorFrontend.hooks.addAction('frontend/element_ready/flexitype-vertical-header.default', verticalHeader);
        elementorFrontend.hooks.addAction('frontend/element_ready/flexitype-onepage-menu.default', onePageMenu);
    });

})(jQuery);