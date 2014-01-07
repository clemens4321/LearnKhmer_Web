
The following is the plugins which are used in the app and 
file structures which you need to concern to make the web app work.

*Notes: To let application cache work, remember to add this line to .htaccess file: 'AddType text/cache-manifest .appcache'

-- Plugins: + Jquery mobile
			+ Flexslider (for image slider)
			+ Buzz (for audio controller)
			+ Weather plugin

-- File structure:

./index.html                            /* Main html file which use with jquery mobile */
./FriendPageDetail*.html                /* Files for displaying friend page detail */

./application.appcache                  /* Manifest file, which use for configuring 
                                            application cache */

css:									/* Style-sheet folder */
	/images/							/* Image folder for jquery mobile */
	/flexslider.css						/* Style file for image slider */
	/jquery.mobile-1.3.0.min.css		/* Style file of jquery mobile
	/style.css							/* Main style-sheet file for the web app */
	
images:									/* Contain image folders for each page
										*	and global image 
										*/

scripts:								/* Java-script folder */
	/buzz.js							/* Plugin for controlling autio */
	/data.js							/* Json data */
	/hideAddressBar.js					/* Hide the address bar in mobile browser */
	/index.js							/* Main script file control the web app */
	/jquery.flexslider-min.js			/* Plugin to control image slider */
	/jquery.mobile-1.3.0.min.js			/* Jquery mobile main controller */
	/jquery-1.9.1.min.js				/* Jquery library */

voice:									/* Contain audio files */

weather_snippet:						/* Weather plugin */
	/includes/
		/config.php						/* Contain url config (change this to make the plugin work) */