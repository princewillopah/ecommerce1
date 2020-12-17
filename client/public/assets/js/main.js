// ==============================================================
//             owl carousel code
// ==============================================================
// $(document).ready(function(){
//
//     var welcomeSlide = $('.single-slider');
//     welcomeSlide.owlCarousel({
//         items: 1,
//         margin: 0,
//         loop: true,
//         nav: false,
//         dots: false,
//         autoplay: true,
//         center: true,
//         autoplayTimeout: 7000,
//         smartSpeed: 1000,
//         onInitialized: startProgressBar,//calling progressbar
//         onTranslate: resetProgressBar,//calling progressbar
//         onTranslated:  startProgressBar,//calling progressbar
//     });
//
//     welcomeSlide.on('translate.owl.carousel', function () {
//         var slideLayer = $("[data-animation]");
//         slideLayer.each(function () {
//             var anim_name = $(this).data('animation');
//             $(this).removeClass('animated ' + anim_name).css('opacity', '0');
//         });
//     });
//
//     welcomeSlide.on('translated.owl.carousel', function () {
//         var slideLayer = welcomeSlide.find('.owl-item.active').find("[data-animation]");
//         slideLayer.each(function () {
//             var anim_name = $(this).data('animation');
//             $(this).addClass('animated ' + anim_name).css('opacity', '1');
//         });
//     });
//
//     $("[data-delay]").each(function () {
//         var anim_del = $(this).data('delay');
//         $(this).css('animation-delay', anim_del);
//     });
//
//     $("[data-duration]").each(function () {
//         var anim_dur = $(this).data('duration');
//         $(this).css('animation-duration', anim_dur);
//     });
//
//     // ------------custom nav-----------------------------------
//     // for custom next prev
//     let owl = $('.myOwlCarouselNav');
//     owl.owlCarousel();
//     // Go to the next item
//     $('.customNextBtn').click(function() {
//         owl.trigger('next.owl.carousel');
//     });
//     // Go to the previous item
//     $('.customPrevBtn').click(function() {
//         owl.trigger('prev.owl.carousel', [300]);
//     });
//
//     // ----------------slide progress bar-------------------
//
//     // for ProgressBar
//     function startProgressBar() {
//         $(".slide-progress").css({width:'100%',transition:'width 5000ms'});
//     }
//
//     function resetProgressBar() {
//         $(".slide-progress").css({width:0,transition:'width 0s'});
//     }
//     // ====================================================================
//                 // second owl carousel
//     // ====================================================================
//     // var welcomeSlide = $('.upcomingslider');
//     // upcomingSlides.owlCarousel({
//     //     items: 1,
//     //     margin: 0,
//     //     loop: true,
//     //     nav: true,
//     //     navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
//     //     dots: false,
//     //     autoplay: true,
//     //     autoplayTimeout: 7000,
//     //     smartSpeed: 1500
//     // });
//
// });


// =========================================================================
// bootstrap progress bar
// ==========================================================================

// $(document).ready(function(){
//     var percent = 0;
//     bar = $('.transition-timer-carousel-progress-bar');
//     crsl = $('#myCarouselIndicators');
//     function progressBarCarousel(){
//         bar.css({width:percent+'%'});
//         percent = percent + 0.5;
//         if( percent>100){
//             percent = 0;
//             crsl.carousel('next');

//         }
//     }
//     crsl.carousel({interval:false, pause:true}).on('slid.bs.carousel',function () {});
//     var barInterval = setInterval(progressBarCarousel,30);
//     crsl.hover(
//         function(){
//             clearInterval(barInterval);
//         },
//         function(){
//             barInterval = setInterval(progressBarCarousel,30);
//         }
//     );
// });


// =========================================================================
// multiple
// ==========================================================================
// $('.multiple-slider').owlCarousel({
//     loop:true,
//     margin:0,
//     nav:false,
//     dots:false,
//     autoplay:true,
//     responsive:{
//         0:{
//         items:1
//         },
//         600:{
//         items:2
//         },
//         1000:{
//         items:4
//         }
//     }
// });
//
// // for custom next prev
// let owls = $('.myMultipleSliderNav');
// owls.owlCarousel();
// // Go to the next item
// $('.myMultipleSliderNavcustomNextBtn').click(function() {
//     owls.trigger('next.owl.carousel');
// });
// // Go to the previous item
// $('.myMultipleSliderNavcustomPrevBtn').click(function() {
//     owls.trigger('prev.owl.carousel', [300]);
// });

// ========================================================================================
//     ----------------------- NEW ---------------------------------------------------
// ========================================================================================
// security-owl-carousel
// ----------------------- testimonials ----------------------------------------
$('.testimonial-owl-carousel').owlCarousel({
    // loop:false,
    loop: true,
    margin: 0,
    nav: true,
    dots: true,
    autoplay: true,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 2
        },
        1000: {
            items: 3
        }
    }
});
// ----------------------- security ----------------------------------------
// $(document).ready(function() {
$('.cert-owl-carousel').owlCarousel({
    // loop:false,
    // items: 1,
    loop: true,
    margin: 0,
    nav: false,
    dots: false,
    autoplay: true,
    center:true,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 3
        },
        1000: {
            items: 5
        }
    }
 });
// }); 

// ----------------------- signup ----------------------------------------
$(document).ready(function() {

  var sync1 = $("#sync1");
  var sync2 = $("#sync2");
  var slidesPerPage = 4; //globaly define number of elements per page
  var syncedSecondary = true;

  sync1.owlCarousel({
    items : 1,
    slideSpeed : 2000,
    nav: false, // true
    autoplay: true,
    dots: false,// true
    loop: true,
    // animateOut: 'slideOutUp',
    // animateIn: 'slideInUp',
    responsiveRefreshRate : 200,
    // navText: ['<svg width="100%" height="100%" viewBox="0 0 11 20"><path style="fill:none;stroke-width: 1px;stroke: #000;" d="M9.554,1.001l-8.607,8.607l8.607,8.606"/></svg>','<svg width="100%" height="100%" viewBox="0 0 11 20" version="1.1"><path style="fill:none;stroke-width: 1px;stroke: #000;" d="M1.054,18.214l8.606,-8.606l-8.606,-8.607"/></svg>'],
  }).on('changed.owl.carousel', syncPosition);

  sync2
    .on('initialized.owl.carousel', function () {
      sync2.find(".owl-item").eq(0).addClass("current");
    })
    .owlCarousel({
    items : slidesPerPage,
    dots: true,
    nav: true,
    smartSpeed: 200,
    slideSpeed : 500,
    slideBy: slidesPerPage, //alternatively you can slide by 1, this way the active slide will stick to the first item in the second carousel
    responsiveRefreshRate : 100
  }).on('changed.owl.carousel', syncPosition2);

  function syncPosition(el) {
    //if you set loop to false, you have to restore this next line
    //var current = el.item.index;
    
    //if you disable loop you have to comment this block
    var count = el.item.count-1;
    var current = Math.round(el.item.index - (el.item.count/2) - .5);
    
    if(current < 0) {
      current = count;
    }
    if(current > count) {
      current = 0;
    }
    
    //end block

    sync2
      .find(".owl-item")
      .removeClass("current")
      .eq(current)
      .addClass("current");
    var onscreen = sync2.find('.owl-item.active').length - 1;
    var start = sync2.find('.owl-item.active').first().index();
    var end = sync2.find('.owl-item.active').last().index();
    
    if (current > end) {
      sync2.data('owl.carousel').to(current, 100, true);
    }
    if (current < start) {
      sync2.data('owl.carousel').to(current - onscreen, 100, true);
    }
  }
  
  function syncPosition2(el) {
    if(syncedSecondary) {
      var number = el.item.index;
      sync1.data('owl.carousel').to(number, 100, true);
    }
  }
  
  sync2.on("click", ".owl-item", function(e){
    e.preventDefault();
    var number = $(this).index();
    sync1.data('owl.carousel').to(number, 300, true);
  });
});





