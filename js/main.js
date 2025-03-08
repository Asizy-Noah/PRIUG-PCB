

(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.nav-bar').addClass('sticky-top');
        } else {
            $('.nav-bar').removeClass('sticky-top');
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // hero carousel
    $(".hero-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        items: 1,
        dots: true,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 24,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            992:{
                items:2
            }
        }
    });

    document.addEventListener('DOMContentLoaded', function () {
        var header = document.querySelector('.header');
        var topSection = document.querySelector('.top-section');
        var headerHeight = header.clientHeight;
        var lastScrollTop = 0;
      
        function handleScroll() {
          var scrollTop = window.scrollY || window.pageYOffset;
      
          if (scrollTop > 100) {
            // Scrolling down by 100px or more
            header.style.display = 'none';
          } else {
            // Scrolling less than 100px down or at the top
            header.style.display = 'block';
          }
      
          if (scrollTop <= lastScrollTop || scrollTop === 0) {
            // Scrolling up or at the top
            header.classList.add('scroll-up'); // Add scroll-up class
            header.style.display = 'block'; // Ensure header is displayed when scrolling up or at the top
          } else {
            // Scrolling down
            header.classList.remove('scroll-up'); // Remove scroll-up class
          }
      
          lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
        }
      
        // Add scroll event listener with throttling
        var isScrolling = false;
        window.addEventListener('scroll', function () {
          if (!isScrolling) {
            window.requestAnimationFrame(function () {
              handleScroll();
              isScrolling = false;
            });
            isScrolling = true;
          }
        });
      });

    /*=============== SHOW MENU ===============*/
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
          nav = document.getElementById(navId)
 
    toggle.addEventListener('click', () =>{
        // Add show-menu class to nav menu
        nav.classList.toggle('show-menu')
 
        // Add show-icon to show and hide the menu icon
        toggle.classList.toggle('show-icon')
    })
 }
 
 showMenu('nav-toggle','nav-menu')
    
})(jQuery);

