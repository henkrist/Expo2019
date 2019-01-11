
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
    //var dayNumber = 1;

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
    return dayNumber;
}

//funksjon for å gråe ut tidligere arrangemnter
/*
function delPrevEvents(){

    var dayNumber = changeCurrentDay();

    var allDates = document.querySelectorAll(".date_link");
    var day = document.querySelector('a[href="#' + dayNumber + '"]');

}
*/

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
    

    //scrolle til dag
    /*
    var dayNumber = changeCurrentDay();
    $('html, body').animate({
        scrollTop: $('#'+dayNumber).offset().top - ($(window).height()/9)
    }, 1000);*/
	
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

    function smoothScroll(target){
        $('body,html').animate({
            scrollTop: target.offset().top - ($(window).height()/9)
        }, 600);
    }

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

