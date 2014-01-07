/*
var RocknCoder = RocknCoder || {};

RocknCoder.HideAddressBar = function () {
	var hideUrlBar = function () {
		if (!pageYOffset) {
			window.scrollTo(0, 1);
		}
	};

	if (navigator.userAgent.match(/Android/i)) {
		window.scrollTo(0, 0); // reset in case prev not scrolled
		var docHeight = $(document).height();
		var winHeight = window.outerHeight;

		if (winHeight > docHeight) {
			winHeight = winHeight / window.devicePixelRatio;
			$('BODY').css('height', winHeight + 'px');
		}
		window.scrollTo(0, 1);
	} else {
		addEventListener("load orientationchange", function () {
			setTimeout(hideUrlBar, 0);
			setTimeout(hideUrlBar, 500);
		}, false);
	}
};
*/


function hideAddressBar()
{
  if(!window.location.hash)
  {
      if(document.height < window.outerHeight)
      {
          document.body.style.height = (window.outerHeight + 50) + 'px';
      }

      setTimeout( function(){ 
					window.scrollTo(0, 1); 
					$('#SplashScreenPage').css('height','100%');
				}, 50 );
  }
}

window.addEventListener("load", function(){ if(!window.pageYOffset){ hideAddressBar(); } } );
window.addEventListener("orientationchange", hideAddressBar );

