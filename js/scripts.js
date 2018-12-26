
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

function goBack() {
    window.history.back();
}

// scrolling til event og endre nav
/*
jQuery(document).ready(function($){
	var contentSections = $('.event_date'),
		navigationItems = $('#vertical-nav a');

	updateNavigation();
	$(window).on('scroll', function(){
		updateNavigation();
	});

	navigationItems.on('click', function(event){
        event.preventDefault();
        smoothScroll($(this.hash));
    });

	function updateNavigation() {
		contentSections.each(function(){
			$this = $(this);
			var activeSection = $('#vertical-nav a[href="#'+$this.attr('id')+'"]').data('number') - 1;
			if ( ( $this.offset().top - $(window).height()/2 < $(window).scrollTop() ) && ( $this.offset().top + $this.height() - $(window).height()/2 > $(window).scrollTop() ) ) {
				navigationItems.eq(activeSection).addClass("selected");
			}else {
				navigationItems.eq(activeSection).removeClass("selected");
			}
		});
	}

	function smoothScroll(target) {
        $('body,html').animate(
        	{'scrollTop':target.offset().top - 50},
        	600
        );
	}
});

*/

var sections = $('.events')
  , nav = $('#vertical-nav')
  , nav_height = nav.outerHeight();

$(window).on('scroll', function () {
  var cur_pos = $(this).scrollTop();
  
  sections.each(function() {
    var top = $(this).offset().top - nav_height,
        bottom = top + $(this).outerHeight();
    
    if (cur_pos >= top && cur_pos <= bottom) {
      nav.find('a').removeClass('active');
      sections.removeClass('active');
      
      $(this).addClass('active');
      nav.find('a[href="#'+$(this).attr('id')+'"]').addClass('active');
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
// Retrieve container position relative to viewport
var rect = $('#container')[0].getBoundingClientRect();
// Create mouse object to keep track of mouse coordinates
var mouse = {x: 0, y: 0, moved: false};

$("#container").mousemove(function(e) {
  // set moved property to true
  mouse.moved = true;
  // calculate mouse coordinates
  mouse.x = e.clientX - rect.left;
  mouse.y = e.clientY - rect.top;
});
 
// Ticker event will be called on every frame
TweenLite.ticker.addEventListener('tick', function(){
  // if mouse is moved call parallax function
  if (mouse.moved){    
    // parallaxIt takes two parameters
    // first is the target element
    // Second is how much the element should move
    // Movement is relative to height and width of parent, in this case the container
    // insert all your parallax calls here
    // you can insert more parameters to change duration etc for each element
    parallaxIt(".slide", -100);
    parallaxIt("img", -30);
  }
  // set moved property to false on each frame so parallax function won't be called more than once
  mouse.moved = false;
});

// Simplest part, take mouse coordinates and container dimensions and animate elements
function parallaxIt(target, movement) {
  TweenMax.to(target, 0.3, {
    x: (mouse.x - rect.width / 2) / rect.width * movement,
    y: (mouse.y - rect.height / 2) / rect.height * movement
  });
}

// Recaclulate container dimensions on resize and scroll
$(window).on('resize scroll', function(){
  rect = $('#container')[0].getBoundingClientRect();
})