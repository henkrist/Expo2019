
//change the current day
function changeCurrentDay(){
    var d = new Date();
    var expo = new Array(7);
    expo[0] = "28";
    expo[1] = "29";
    expo[2] = "30";
    expo[3] = "18";
    expo[4] = "1";
    expo[5] = "4";
    expo[6] = "5";
    expo[7] = "6";

    var dayNumber = d.getDate();
    //var dayNumber = 28;

    var allDates = document.querySelectorAll(".cont_date");

    for(var i=0; i<expo.length; i++){
        if(expo[i] == dayNumber){
            var day = document.getElementById(dayNumber);
            day.classList.add("today");
        }else{
            if(allDates[i].classList.contains(".today")){
                allDates[i].classList.remove(".today");
            }
        }
    }
}

//gå tilbake 
function goBack() {
    window.history.back();
}

// scrolling til event og endre nav

var sections = $('.event_date')
  , nav = $('#vertical-nav')
  , nav_height = nav.outerHeight();

$(window).on('scroll', function () {
  var cur_pos = $(this).scrollTop();
  
  sections.each(function() {
    var top = $(this).offset().top - nav_height,
        bottom = top + $(this).outerHeight();
    
    if (cur_pos >= top && cur_pos <= bottom) {
      nav.find('a').removeClass('current');
      sections.removeClass('current');
      $(this).addClass('current');
      nav.find('a[href="#'+$(this).attr('id')+'"]').addClass('current');
    }
  });
});


nav.find('a').on('click', function () {
  var $el = $(this)
    , id = $el.attr('href');
  
  $('html, body').animate({
    scrollTop: $(id).offset().top - 50
  }, 700);
  
  return false;
});


// andre forsøk

/*

let mainNavLinks = document.querySelectorAll("a");
let mainSections = document.querySelectorAll("event_date");

let lastId;
let cur = [];

window.addEventListener("scroll", event => {
  let fromTop = window.scrollY;

  mainNavLinks.forEach(link => {
    let section = document.querySelector(link.hash);

    if (
      section.offsetTop <= fromTop &&
      section.offsetTop + section.offsetHeight > fromTop
    ) {
      link.classList.add("current");
    } else {
      link.classList.remove("current");
    }
  });
});

*/


// map
function initMap() {
    var ipd = {lat: 63.418143, lng: 10.404537};
    var map = new google.maps.Map(
        document.getElementById('map'), {zoom: 16, center: ipd});
    var marker = new google.maps.Marker({position: ipd, map: map});
}

// nav delay
$(".cd-front").delay(2000).queue(function(next) {
    $(".nav_desktop").css("display", 'inline-block');
    next();
}).toggle("slide", {
    direction: "right"
}, 1000);


// parallax
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  
} else {
  var rect = $('#container')[0].getBoundingClientRect();
  var mouse = {x: 0, y: 0, moved: false};

  $("#container").mousemove(function(e) {

    mouse.moved = true;

    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });
  
  TweenLite.ticker.addEventListener('tick', function(){
    if (mouse.moved){    
      parallaxIt(".slide", -50);
      parallaxIt("img", -15);
    }
    mouse.moved = false;
  });

  function parallaxIt(target, movement) {
    TweenMax.to(target, 0.3, {
      x: (mouse.x - rect.width / 2) / rect.width * movement,
      y: (mouse.y - rect.height / 2) / rect.height * movement
    });
  }

  $(window).on('resize scroll', function(){
    rect = $('#container')[0].getBoundingClientRect();
  })
}

