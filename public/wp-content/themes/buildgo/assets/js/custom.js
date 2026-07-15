/*=========================================
* Responsive Menu
* Theme Preloader
* Scroll To Top
=========================================*/
(function ($) {
	"use strict"
	///============= * Responsive Menu  =============\\\
	$('.menu-responsive').meanmenu({
		meanMenuContainer: '.responsive-menu',
		meanScreenWidth: '991',
		meanMenuOpen: '<span></span><span></span><span></span>',
		meanMenuClose: '<i class="fal fa-times"></i>'
	});
	
    ///=============  * Theme Preloader  =============\\\
    $(window).on("load", function () {
        $(".theme-loader").fadeOut(0.0009);
    });
	
	///=============  * Custom Cursor  =============\\\
	document.addEventListener("DOMContentLoaded", function () {
		var ball = document.getElementById("cursor-ball");
		var cursorText = document.getElementById("cursor-text");

		if (!ball || !cursorText) return; // 🔒 Safety check

		var hoverAreas = document.querySelectorAll('.data_cursor');
		var lastHoveredElement = null;
		var mouseX = 0, mouseY = 0;
		var ballX = 0, ballY = 0;
		var speed = 0.1;

		function updateCursor() {
			ballX += (mouseX - ballX) * speed;
			ballY += (mouseY - ballY) * speed;

			ball.style.left = ballX + "px";
			ball.style.top = ballY + "px";
			cursorText.style.left = ballX + "px";
			cursorText.style.top = ballY + "px";

			if (lastHoveredElement === null) {
				ball.style.display = 'block';
				ball.style.height = "12px";
				ball.style.width = "12px";
				cursorText.style.opacity = '0';
			}

			requestAnimationFrame(updateCursor);
		}

		function handleMouseMove(e) {
			var scrollX = window.pageXOffset || document.documentElement.scrollLeft;
			var scrollY = window.pageYOffset || document.documentElement.scrollTop;
			mouseX = e.clientX + scrollX;
			mouseY = e.clientY + scrollY;
		}

		function handleHoverEnter(e) {
			cursorText.innerHTML = e.target.getAttribute('data-cursor-text');
			cursorText.style.opacity = '1';
			ball.style.height = "90px";
			ball.style.width = "90px";
			lastHoveredElement = e.target;
		}

		function handleHoverLeave(e) {
			cursorText.style.opacity = '0';
			ball.style.display = 'block';
			lastHoveredElement = null;
		}

		document.addEventListener('mousemove', handleMouseMove);
		hoverAreas.forEach(function (elem) {
			elem.addEventListener('mouseenter', handleHoverEnter);
			elem.addEventListener('mouseleave', handleHoverLeave);
		});

		updateCursor();

		$(document).ready(function () {
			toggleCursor($('#cursor_style button.active').data('cursor'));
			$('#cursor_style button').on('click', function () {
				$('#cursor_style button').removeClass('active');
				$(this).addClass('active');
				toggleCursor($(this).data('cursor'));
			});

			function toggleCursor(value) {
				if (value == 2) {
					$('.hide').fadeOut();
					$('.cursor').removeClass('yes').addClass('no');
				} else {
					$('.hide').fadeIn();
					$('.cursor').removeClass('no').addClass('yes');
				}
			}
		});
	});
	
	
    ///=============  * Scroll To Top  =============\\\
	var scrollPath = document.querySelector(".scroll-up path");
	var pathLength = scrollPath.getTotalLength();
	scrollPath.style.transition = scrollPath.style.WebkitTransition = "none";
	scrollPath.style.strokeDasharray = pathLength + " " + pathLength;
	scrollPath.style.strokeDashoffset = pathLength;
	scrollPath.getBoundingClientRect();
	scrollPath.style.transition = scrollPath.style.WebkitTransition = "stroke-dashoffset 10ms linear";
	var updatescroll = function () {
		var scroll = $(window).scrollTop();
		var height = $(document).height() - $(window).height();
		var scroll = pathLength - (scroll * pathLength) / height;
		scrollPath.style.strokeDashoffset = scroll;
	};
	updatescroll();
	$(window).scroll(updatescroll);
	var offset = 50;
	var duration = 950;
	jQuery(window).on("scroll", function () {
		if (jQuery(this).scrollTop() > offset) {
			jQuery(".scroll-up").addClass("active-scroll");
		}
		else {
			jQuery(".scroll-up").removeClass("active-scroll");
		}
	});	
	jQuery(".scroll-up").on("click", function (event) {
	  	event.preventDefault();
	  	jQuery("html, body").animate(
			{ scrollTop: 0, } , duration
		);
	  	return false;
	});
})(jQuery);