/*
*   Main script use for controlling jquery mobile   
*
*/

/* Init global variable */
var is3DSupport = true; // Check if 3D is supported
var iOS = false;    // Check if device is iOS

/* Variable for buzz plugin to controll audio */
var mySounds = new Array(); // Array contains audio file
var myAudioGroup = null;    // Group of sound
var myAudio = null;         // Current playing audio
var infoAudio = null;       // Audio for playing national anthem

// Set some global information ie: default page transition
$(document).on("mobileinit", function(){
	$.mobile.defaultPageTransition = "slide";
	$.mobile.transitionFallbacks.slideout = "none";
	$.mobile.zoom.enable(false);
		
	if(!$.support.cssTransform3d)
	{
		is3DSupport = false;
	}
	iOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );
    
});

// Fixed footer if browser doesn't support for css 3d transform
$( document ).on( 'pagebeforecreate', function(event){
	if (!is3DSupport)
	{
		$('footer').attr('data-position', 'fixed');
		$('a').attr('data-transition', 'none');
	}
});

// Each time SplashScreenPage is shown, change to HomePage after 4000 milliseconds
var ChangeToHomePageTimer;
$( document ).on( 'pageshow', '#SplashScreenPage', function(event){
	if (is3DSupport)
		ChangeToHomePageTimer = setTimeout("$.mobile.changePage('#HomePage', {transition:'slide'})",4000);
	else
		ChangeToHomePageTimer = setTimeout("$.mobile.changePage('#HomePage', {transition:'none'})",4000);
});

// Set height of home page to put navigation bar to bottom outside of page, that make it transition from bottom into page and fix at bottom
$( document ).on( 'pageinit', '#HomePage', function(event){
	if (is3DSupport) // only do if it supports css 3D
	{
		$('#HomePage > .ui-content').css('height',$(window).height());
	}
    
});

// In case of user click link to change to Homepage, clear timeout to prevent timer occur and fix footer navigation
$( document ).on( 'pageshow', '#HomePage', function(event){
	clearTimeout(ChangeToHomePageTimer);
	
	if (is3DSupport) // only do if it supports css 3D
	{
		$('#HomePage > .ui-footer').addClass('ui-footer-fixed');
		$('#HomePage').css('padding-bottom',$('#HomePage > .ui-footer').height());
	}
});

// Remove footer position fixed to prevent blink on transition
$( document ).on( 'pagehide', '#HomePage', function(event){	
	if (is3DSupport) // only do if it supports css 3D
	{
		$('#HomePage > .ui-footer').removeClass('ui-footer-fixed');
	}
});

// In case of user click link to change to Homepage, clear timeout to prevent timer occur
$(document).on('pageinit', '#ListAppPage', function (event) {
    $('#MainListView').html('');

    for (var i = 0; i < data.length; i++) {
        mySounds[i] = new buzz.sound(data[i].audio);
        $('#MainListView').append('<li><h1 class="liHeader">' + data[i].title + '</h1><img src="' + data[i].img + '" alt="img" /><h1 class="liParagraph">' + data[i].description + '</h1><p class="liComment">' + data[i].info + '</p><span class="icon-play" onclick="ToggleSound(this)" data-index="' + i + '" data-src="' + data[i].audio + '"></span></li>');
    }

    $('#MainListView').listview('refresh');

    /* Audio Handle */
    myAudioGroup = new buzz.group(mySounds); // Create sound group
    myAudioGroup.load(); //Load all audio

    for (var i = 0; i < data.length; i++) {
        while (myAudioGroup.getSounds()[i].sound.HAVE_ENOUGH_DATA != 4);
    }

    // Bind ended event to change icon due to play state
    myAudioGroup.bind('ended', function (event) {
        $('.icon-stop').addClass('icon-play');
        $('.icon-stop').removeClass('icon-stop');
    });

    infoAudio = new buzz.sound("./CambodiaAnthem.mp3");
    infoAudio.load();
});

// Fix position of footer list app page
$( document ).on( 'pageshow', '#ListAppPage', function(event){
	if (is3DSupport) // only do if it supports css 3D
	{
		$('#ListAppPage > .ui-footer').addClass('ui-footer-fixed');
		$('#MainListView').css('padding-bottom',$('#ListAppPage > .ui-footer').height());
	}
});

// Remove footer position fixed to prevent blink on transition
$( document ).on( 'pagehide', '#ListAppPage', function(event){
	if (is3DSupport)
	{
		$('#ListAppPage > .ui-footer').removeClass('ui-footer-fixed');
	}
});


// Play or pause sound
function ToggleSound(obj){
	// Stop all sounds if exists
    myAudioGroup.pause();
    
    var src = $(obj).attr('data-src');
	var index = parseInt($(obj).attr('data-index'));
    myAudio = myAudioGroup.getSounds()[index];

    
	if($(obj).hasClass('icon-play'))
	{
		// Change other audio object icon-stop to play
		$('.icon-stop').addClass('icon-play');
		$('.icon-stop').removeClass('icon-stop');
		
		// Run audio
//		$(obj).children('audio').trigger('play');
            myAudio.play();
		// Change icon to stop
		$(obj).addClass('icon-stop');
		$(obj).removeClass('icon-play');
	}
	else
	{
		// Change icon to play
		$(obj).addClass('icon-play');
		$(obj).removeClass('icon-stop');
	}
}

// Stop sound if change page
$( document ).on( 'pagechange', function(event){
	$('.icon-stop').addClass('icon-play');
	$('.icon-stop').removeClass('icon-stop');
	
	if(myAudioGroup != null)
		myAudioGroup.pause();
});

// Set height of infor page to put navigation bar to bottom outside of page, that make it transition from bottom to fix at bottom

$(document).on('pageshow', '#InfoPage', function (event) {
    if (is3DSupport) {
        //$('#InfoPage > .ui-footer').addClass('ui-footer-fixed');
        //$('#InfoPage > .ui-content').css('height', $("#InfoPage > .ui-content").height() + 60);
    }
});

// Remove footer position fixed to prevent blink on transition
$(document).on('pagehide', '#InfoPage', function (event) {
    if (is3DSupport) {
        //$('#InfoPage > .ui-content').css('height', $("#InfoPage > .ui-content").height() - 60);
        //$('#InfoPage > .ui-footer').removeClass('ui-footer-fixed');
    }

    if (infoAudio != null)
        infoAudio.stop();

    $("#InfoPage img[data-play]").attr({
        'src':'./images/play_btn.png',
        'data-play': 'false'
        });
});


// Set height of photo page to put navigation bar to bottom outside of page, that make it transition from bottom to fix at bottom
$(document).on('pageshow', '#PhotoPage', function (event) {
    iOS = (navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false);

    var width = (iOS == true) ? screen.width : ($(window).width());
    var height = (iOS == true) ? $(window).height() - 165 : $(window).height() - 80;
    
    var width_px = width + 'px';
    var height_px = height + 'px';

    $('#PhotoPage .ui-content').css('height', height_px);
    $('#PhotoPage .flexslider').css('width', width);
    $('#PhotoPage .flex-viewport').css('height', height_px);
    $('#PhotoPage .flexslider .slides > li').css('height', height_px);

    if (iOS == true) {
        $('#flex-content').css('position', 'fixed');
        $('#PhotoPage .flexslider').flexslider({
            animation: "slide",
            slideshow: true,
            directionNav: true,
            controlNav: false,
            touchSwipe: true
        });
    }
    else {
        $('#PhotoPage .flexslider').flexslider({
            animation: "slide",
            slideshow: false,
            directionNav: true,
            controlNav: false,
            touchSwipe: true
        });
    }
});

$( document ).on( 'pageshow', '#PhotoPage', function(event){
	if (is3DSupport)
	{
		$('#PhotoPage > .ui-footer').addClass('ui-footer-fixed');
	}
});

// Remove footer position fixed to prevent blink on transition
$( document ).on( 'pagehide', '#PhotoPage', function(event){
	if (is3DSupport)
	{
		$('#PhotoPage > .ui-footer').removeClass('ui-footer-fixed');
	}
	document.body.style.overflow = 'auto';
});

// Configure About Us Page
// Set height of infor page to put navigation bar to bottom outside of page, that make it transition from bottom to fix at bottom
$( document ).on( 'pageinit', '#AboutUsPage', function(event){
	if (is3DSupport) // do only if it supports css 3d
	{
		//$('#AboutUsPage > .ui-content').css('height',$(window).height());
	}
});

$( document ).on( 'pageshow', '#AboutUsPage', function(event){
	if (is3DSupport)
	{
		//$('#AboutUsPage > .ui-footer').addClass('ui-footer-fixed');
	}
});
//End About Us Page

// Remove footer position fixed to prevent blink on transition
$( document ).on( 'pagehide', '#AboutUsPage', function(event){	
	if (is3DSupport)
	{
		//$('#AboutUsPage > .ui-footer').removeClass('ui-footer-fixed');
	}
});
// End About Us Page

// Configure Friends Page
// Set height of infor page to put navigation bar to bottom outside of page, that make it transition from bottom to fix at bottom
$( document ).on( 'pageinit', '#FriendsPage', function(event){
	//$('#FriendsPage > .ui-content').css('height',$(window).height());
	$('#FriendsPage .content-image').css('width', $(window).width());
});

$( document ).on( 'pageshow', '#FriendsPage', function(event){
	if (is3DSupport)
	{
		//$('#FriendsPage > .ui-footer').addClass('ui-footer-fixed');
	}
});

// Remove footer position fixed to prevent blink on transition
$( document ).on( 'pagehide', '#FriendsPage', function(event){
	if (is3DSupport)
	{
		//$('#FriendsPage > .ui-footer').removeClass('ui-footer-fixed');
	}
});

// End Friends Page
function InfoSound(obj)
{
    var isPlay = $(obj).attr('data-play');

    if(!infoAudio)
        infoAudio = new buzz.sound("./voice/CambodiaAnthem.mp3");
    
    infoAudio.togglePlay();

    if(isPlay == 'false') //Not playing 
    {
        //Change to play
        $(obj).attr('src', './images/stop_btn.png');    //Change icon to stop
        $(obj).attr('data-play', true);
    } 
    else    //Playing
    {
        //Change to stop
        $(obj).attr('src', './images/play_btn.png');    //Change icon to play
        $(obj).attr('data-play', false);
    }

}