
//Henter dagen i dag
var d = new Date();
var dayNumber = d.getDate();
//var dayNumber = 1;

//EXPO-dager
var expo = new Array(7);
expo[0] = "28";
expo[1] = "29";
expo[2] = "30";
expo[2] = "31";
expo[3] = "1";
expo[4] = "4";
expo[5] = "5";
expo[6] = "6";

//change the current day
function changeCurrentDay(){
    var allDates = document.querySelectorAll(".date_link");
    var day = document.querySelector('a[href="#' + dayNumber + '"]');

    for(var i=0; i<expo.length; i++){
        if(expo[i] == dayNumber){
            day.className += " " + "today";

        }else{
            if(allDates[i].classList.contains("today")){
                allDates[i].classList.remove("today");
            }
        }
    }
    //delPrevEvents();
    return dayNumber;
}

//funksjon for å gråe ut tidligere arrangemnter
function delPrevEvents(){

    if(expo.includes(dayNumber)){
        for(var i=0; i<expo.length; i++){
            if(dayNumber == expo[i]){
                break;
            }
            var day = document.querySelector('a[href="#' + expo[i] + '"]');
            day.className += " " + "prevEventDate";
    
            var event = document.getElementById("_" + expo[i]);
            event.classList.add("prevEvent");
        }
    }
}

//gå tilbake 
function goBack() {
    window.history.back();
}

// scrolling til event og endre nav

$(document).ready(function(){
	var contentSection = $('.event_date');
    var navigation = $('#vertical-nav');
    	
	navigation.on('click', 'a', function(event){
		event.preventDefault();
		smoothScroll($(this.hash));
    });

	$(window).on('scroll', function(){
		updateNavigation();
	})
	updateNavigation();
	
	function updateNavigation(){
		contentSection.each(function(){
			var sectionName = $(this).attr('id');
			var navigationMatch = $('a[href="#' + sectionName + '"]');
			if( ($(this).offset().top - $(window).height()/2 < $(window).scrollTop()) &&
				  ($(this).offset().top + $(this).height() - $(window).height()/9 > $(window).scrollTop()))
				{
					navigationMatch.addClass('current');
				}
			else {
				navigationMatch.removeClass('current');
			}
		});
    }
});

//funksjon for smooth scroll
function smoothScroll(target){
    $('body,html').animate({
        scrollTop: target.offset().top - ($(window).height()/9)
    }, 600);
}

//funksjon for å scrolle ned til dagen i dag
$(document).ready(function(){
    var dayNumber = changeCurrentDay();
    $('html, body').animate({
        scrollTop: $('#'+dayNumber).offset().top - ($(window).height()/9)
    }, 1000);
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


// parallax på index
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

