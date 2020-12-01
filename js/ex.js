(function($) {
	
	
    // WINDOW.LOAD FUNCTION start
    $(window).load(function() {
        "use strict";
		
        // flexSlider
        $(".flexslider-the-sea").flexslider({
            animation: "fade",
            controlNav: false,
            directionNav: false,
            slideshowSpeed: 4800,
            animationSpeed: 1000
        });
		
		// preloader
        $("#preloader").fadeOut(1400);
		$("#preloader-status").delay(300).fadeOut("slow");
		
        // elements.Timeout
        setTimeout(function() {
            $("#intro-wrapper").delay(2800).css({
                display: "none"
            }).fadeIn(2400);
			$(".clouds, .weather, .film-grain, #particles-holder, #snow").delay(3000).css({
                display: "none"
            }).fadeIn(2400);
			$("#customizer, .corner").delay(3200).css({
                display: "none"
            }).fadeIn(1400);
        });
        setTimeout(function() {
            $(".logo, .logo-mobile, #menu").removeClass("top-position");
        }, 2400);
        setTimeout(function() {
            $(".launcher, .launcher-mobile, .social-icons-wrapper, .social-icons-wrapper-mobile").removeClass("bottom-position");
        }, 2400);
        setTimeout(function() {
            $(".line-left").removeClass("left-position");
        }, 2400);
        setTimeout(function() {
            $(".line-right").removeClass("right-position");
        }, 2400);
		setTimeout(function() {
            $(".overlay").removeClass("left-position");
        }, 2200);
		setTimeout(function() {
            $(".border-top").removeClass("top-position");
        }, 2000);
		setTimeout(function() {
            $(".border-left").removeClass("left-position");
        }, 2000);
        setTimeout(function() {
            $(".border-right").removeClass("right-position");
        }, 2000);
		setTimeout(function() {
            $(".border-bottom").removeClass("bottom-position");
        }, 2000);
	
    });
    // WINDOW.LOAD FUNCTION end
	
	
    // DOCUMENT.READY FUNCTION start
    $(document).ready(function() {
        "use strict";
		
		// kenburnsy
        $("#kenburnsy-bg").kenburnsy({
            fullscreen: true
        });
		
		// countdown setup start
        $("#countdown").countdown({
            date: "10 December 2021 12:00:00", // countdown target date settings
            format: "on"
        }, function() {
        });
		
		// countdown mobile setup start
        $("#countdown-mobile").countdown({
            date: "10 December 2021 12:00:00", // countdown mobile target date settings
            format: "on"
        }, function() {
        });
		
		// fire
        // fire home
        $("#fire-home").on("click", function(e) {
            e.preventDefault();
            $(".current").fadeOut(1200, function() {
                $("#home").fadeIn(2200);
                $(".current").removeClass("current");
                $("#home").addClass("current");
            });
        });
        // fire about
        $("#fire-about").on("click", function(e) {
            e.preventDefault();
            $(".current").fadeOut(1200, function() {
                $("#about").fadeIn(2200);
                $(".current").removeClass("current");
                $("#about").addClass("current");
            });
        });
        // fire services
        $("#fire-services").on("click", function(e) {
            e.preventDefault();
            $(".current").fadeOut(1200, function() {
                $("#services").fadeIn(2200);
                $(".current").removeClass("current");
                $("#services").addClass("current");
            });
        });
		// fire photos
        $("#fire-photos").on("click", function(e) {
            e.preventDefault();
            $(".current").fadeOut(1200, function() {
                $("#photos").fadeIn(2200);
                $(".current").removeClass("current");
                $("#photos").addClass("current");
            });
        });
        // fire contact
        $("#fire-contact").on("click", function(e) {
            e.preventDefault();
            $(".current").fadeOut(1200, function() {
                $("#contact").fadeIn(2200);
                $(".current").removeClass("current");
                $("#contact").addClass("current");
            });
        });
		
        // menu active state
        $("a.menu-state").on("click", function() {
            $("a.menu-state").removeClass("active");
            $(this).addClass("active");
        });
		
		// YTPlayer
        $(function() {
            $(".player").mb_YTPlayer();
        });
		
		// magnificPopup
        $(".popup-photo").magnificPopup({
            type: "image",
            gallery: {
                enabled: true,
                tPrev: "",
                tNext: "",
                tCounter: "%curr% / %total%"
            },
            removalDelay: 300,
            mainClass: "mfp-fade"
        });
		
		// owlCarousel
        $(".services-gallery-slider").owlCarousel({
            slideSpeed: 300,
			paginationSpeed: 400,
            singleItem: true,
            autoHeight: false,
            navigation: true,
            navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
        });
		$(".photos-gallery-slider").owlCarousel({
            slideSpeed: 300,
			paginationSpeed: 400,
            singleItem: false,
			items: 2,
			itemsDesktop: [1199,2],
            itemsDesktopSmall: [979,2],
            autoHeight: false,
            navigation: true,
            navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
        });
	    
	    // signup form
        $(".ex-modal-launcher").on("click", function(e) {
            e.preventDefault();
            $(this).toggleClass("open");
            $(".ex-modal").toggleClass("show");
        });
		
		// snow
		$(function() {
            $("#snow").each(function() {
                snowBind();
            });
        });
		
		// styleswitch [for demonstration purposes only]
		$(".corner").on("click", function() {
            $("#customizer").toggleClass("s-open");
		});
		function swapStyleSheet(sheet) {
            document.getElementById("general-css").setAttribute("href", sheet);
		}
	
    });
    // DOCUMENT.READY FUNCTION end
	
	
    // MOBILE DETECT start
    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };
    // MOBILE DETECT end


})(jQuery);


// GOOGLE ANALYTICS start
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-3033286-18']);
_gaq.push(['_trackPageview']);
(function() {
    var ga = document.createElement('script');
    ga.type = 'text/javascript';
    ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ga, s);
})();
// GOOGLE ANALYTICS end