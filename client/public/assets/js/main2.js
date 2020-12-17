$(document).ready(function(){

     // -----------menu animated border-bottom ------------------- 
    // $(".navbar-nav li a").addClass('navbar-border-animation');
    // $(".navbar-nav .nav-item .nav-link").addClass('navbar-border-animation');
      $(".navbar-nav .mynavlink .mynavAnchor").addClass('navbar-border-animation');
    

    // -----------end menu animated border-bottom ------------------- 

  //      $("#myCarouselIndicators").carousel({
		// 	pause: true,
		// 	interval: 100000,
		// });
    // -----------scrol top button -------------------

       $(window).scroll(function () {
        if($(this).scrollTop() < 100 ){
            $("#back-to-top").fadeOut(1000);
            $(".navbar").css({'padding':'0'});
        }else{
            $("#back-to-top").fadeIn(1000);
            $(".navbar").css({'padding':'0.5rem 1rem'});
        }
    });
    $("#back-to-top").click(function() {
        $('html ,body').animate({scrollTop: 0}, 1500);
    });
   // -----------end scrol top button -------------------------------------------------

   // -----------sticky nav -----------------------------------------------------------

//    $(window).scroll(function () {
//     if($(this).scrollTop() > 400 ){
//         //
//         $("#navbar nav").fadeIn(1000).addClass('fixed-top').addClass('sticky');
//         // $("#navbar .navbar .navbar-brand img").addClass('my-logo');
//     }
//     else if($(this).scrollTop() > 250 ){
//         $("#navbar nav").removeClass('fixed-top').removeClass('sticky');
//         // $("#navbar .navbar .navbar-brand img").removeClass('my-logo');
//     }
});
// -----------end sticky nav -----------------------------------------------------------

// -----------gmail kind of input form -----------------------------------------------------------
    $(function () {

        $(".field-wrapper .field-placeholder").on("click", function () {
            $(this).closest(".field-wrapper").find("input").focus();
        });
        $(".field-wrapper input").on("keyup", function () {
            var value = $.trim($(this).val());
            if (value) {
                $(this).closest(".field-wrapper").addClass("hasValue");
            } else {
                $(this).closest(".field-wrapper").removeClass("hasValue");
            }
        });

    });
// -----------end gmail kind of input form -----------------------------------------------------------










    // function initTimer()
    // {
    //     if($('.event_timer').length)
    //     {
    //         // Uncomment line below and replace date
    //         // var target_date = new Date("April 7, 2018").getTime();
    //
    //         // comment lines below
    //         var date = new Date();
    //         date.setDate(date.getDate() + 3);
    //         var target_date = date.getTime();
    //         //----------------------------------------
    //
    //         // variables for time units
    //         var days, hours, minutes, seconds;
    //
    //         var d = $('#day');
    //         var h = $('#hour');
    //         var m = $('#minute');
    //         var s = $('#second');
    //
    //         setInterval(function ()
    //         {
    //             // find the amount of "seconds" between now and target
    //             var current_date = new Date().getTime();
    //             var seconds_left = (target_date - current_date) / 1000;
    //
    //             // do some time calculations
    //             days = parseInt(seconds_left / 86400);
    //             seconds_left = seconds_left % 86400;
    //
    //             hours = parseInt(seconds_left / 3600);
    //             seconds_left = seconds_left % 3600;
    //
    //             minutes = parseInt(seconds_left / 60);
    //             seconds = parseInt(seconds_left % 60);
    //
    //             // display result
    //             d.text(days);
    //             h.text(hours);
    //             m.text(minutes);
    //             s.text(seconds);
    //
    //         }, 1000);
    //     }
    // }
    //
    // initTimer();
   // -----------welcome card btn -------------------

//    $(".welcome-card-btn-1").hover(
//         function(){
//             $('.fa-1').css({"transform":"rotate(180deg)","margin-left":"5px"});
//         },
//         function(){
//             $('.fa-1').css({"transform":"rotate(0deg)","margin-left":"0px"});
//         }
//    );
//    $(".welcome-card-btn-2").hover(
//         function(){
//             $('.fa-2').css({"transform":"rotate(180deg)","margin-left":"5px"});
//         },
//         function(){
//             $('.fa-2').css({"transform":"rotate(0deg)","margin-left":"0px"});
//         }

//     );
//     $(".welcome-card-btn-3").hover(
//         function(){
//             $('.fa-3').css({"transform":"rotate(180deg)","margin-left":"5px"});
//         },
//         function(){
//             $('.fa-3').css({"transform":"rotate(0deg)","margin-left":"0px"});
//         }

//     );
 // -----------welcome card btn -------------------
});//end document.ready

// =============================================================

