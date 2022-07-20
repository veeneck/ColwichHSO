/* -------- DOCUMENT READY -------- */

ready(loadPage);

/// We're using window load instead of DomContentLoaded so that the CSS animations play as expected.
/// If the stylesheet isn't cached, sometimes the JS will trigger before the CSS loads, and some elements are hidden
function ready(fn) {
  if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
    fn();
  } else {
    window.addEventListener('load', fn);
  }
}

function loadPage() {
	bringElementsIntoView();
	initMobileListeners();
	loadTriggersForPage();
}

/* -------- MOBILE MENU -------- */

/// Toggle a classname whenever the hamburger menu is clicked to open and close the element.
function initMobileListeners() {
	var $menu = document.getElementById("menu");
    var $menulink = document.querySelectorAll('.menu-link')[0];
    var header = document.getElementsByTagName("header")[0];
  
	$menulink.addEventListener("click", function(event) {
	  event.preventDefault();

	  /// If the submenu is open, close it 
	  if(hasClass(this, "open")) {
		  let elements = gsap.utils.toArray(".topmenu");
	    elements.forEach((el, i) => {
	    		removeClass(el.parentNode, "subopen");
	    });
   }

	  /// Set the hamburger icon to open
	  toggleClass(this, 'open');

	  /// The animations reverse each other. So open and closed are always toggled.
	  toggleClass($menu, 'closed');

	  /// Set the drop down menu to open
	  addClass($menu, "open");

	  /// On load, we don't want animations to play. This class prevents them, and is removed on first click.
	  if(hasClass($menu, "firstView")) {
	  	removeClass($menu, 'firstView');
	  }

	  return false;
	});

	  let elements = gsap.utils.toArray(".topmenu");
    elements.forEach((el, i) => {
    	el.addEventListener("click", function(event) {
    			toggleClass(this.parentNode, "subopen");
    			return false;
    	})
    });

    let backbtns = gsap.utils.toArray(".backBtn");
    backbtns.forEach((el, i) => {
    	el.addEventListener("click", function(event) {
    			toggleClass(this.parentNode.parentNode, "subopen");
    			return false;
    	})
    });

}

/* -------- TEMPORARY PARALLAX ON SCROLL -----------------*/


function updateBackgroundSize() {
	var doc = document.documentElement;

	if(document.body.clientWidth < 500) {
		var left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
		var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
		var size = 800 + (top * 0.3);
		document.body.style.backgroundSize ="auto " + size + "px";
	}
}

/* -------- ELEMENTS SCROLL INTO VIEW -------------*/
 
/// Check once on initial call for elements alreayd in view, and then the scroll / resize event will check the rest.
function bringElementsIntoView() {
	checkAllTriggers();
	document.addEventListener('scroll', function(event) {
		checkAllTriggers();
	});
	document.addEventListener('resize', function(event) {
		checkAllTriggers();
	});
}

/// List of all things that we may want to check for inView animations
function checkAllTriggers() {
	checkIfTriggerIsInView(document.querySelectorAll('.triggerMe'));
	updateBackgroundSize();
}

/// Loop through a node list and see if each element is in view. If so, add triggeredCSS3, which is the class used to animate.
function checkIfTriggerIsInView(nodes) {
	Array.prototype.forEach.call(nodes, function(trigger, i){
		var leading = 0;
		/// For everything else, add a classname if it isn't already present
		if(!hasClass(trigger, "triggeredCSS3")) {
			if(isScrolledIntoView(trigger, leading)) {
				addClass(trigger, "triggeredCSS3");
			}
		}
	});
}

/// Utility function to check if an element is in view.
function isScrolledIntoView(el, leading) {
    var rect = el.getBoundingClientRect();
    var elemTop = rect.top;
    var elemBottom = rect.bottom;

    // Only completely visible elements return true:
    ///var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
    // Partially visible elements return true:
    var isVisible = elemTop < (window.innerHeight + leading) && elemBottom >= 0;
    return isVisible;
}


/* -------- SCROLLTRIGGER-------- */

function loadTriggersForPage() {

    var triggerMap = {
        "hero" : setHeroTriggers,
        "calendar" : setCalendarTriggers,
        "achievements" : setAchievementTriggers,
        "donate" : setDonateTriggers,
        "faq" : setFAQTriggers
    };

    const sections = document.getElementsByTagName('section');

    for (const section of sections) {
    		for (const name of section.classList) {
					 if(name in triggerMap) {
            triggerMap[name](section);
        	}
				}
    }

    setHighlightTriggers();
    setButtonTriggers();
}


function setHeroTriggers(section) {
     
}

function setCalendarTriggers(section) {

    let elements = gsap.utils.toArray(".calendar li");
    elements.forEach((el, i) => {

        let x = 50;
        //if(window.innerWidth > 1080) {
         //   scale = 1;
        //}

        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: "bottom bottom",
                scrub: true,
            },
            x: x
        });  
    });     
}

function setFAQTriggers(section) {

    let elements = gsap.utils.toArray(".faqCardContainer div");
    elements.forEach((el, i) => {

        let scale = 0.8;
        if(window.innerWidth > 1080) {
            scale = 1;
        }

        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                scrub: true,
            },
            scale: scale
        });  
    });     
}

function setAchievementTriggers(section) {
	  let elements = gsap.utils.toArray(".achievements li");
    elements.forEach((el, i) => {

        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                scrub: true,
            },
            scale: 0.8
        });  
    }); 
}

function setDonateTriggers(section) {   

    let links = gsap.utils.toArray(".donate li a span");
    links.forEach((el, i) => {

        let x = 0;

        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                scrub: true,
                end: "bottom bottom",
            },
            x: x
        });  
    }); 
}

function setHighlightTriggers() {

	let elements = gsap.utils.toArray(".highlighter");
  elements.forEach((el, i) => {

  	if(i == 0) {
  		setTimeout(() => {
  			el.classList.add("active");
			}, 500);
  	}
  	else {
	  	ScrollTrigger.create({
		    trigger: el,
		    start: "bottom bottom",
		    onEnter: () => el.classList.add("active")
		  });
		}
  });

}

function setButtonTriggers() {
	let elements = gsap.utils.toArray(".button .icon");
  elements.forEach((el, i) => {

  	if(i > 1) {
   			gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                scrub: true,
                end: "-100px"
            },
            x: "-40px"
        });  
		}
  });
}

/* -------- UTILITY -------- */

function toggleClass(el, className) {
	if (el.classList) {
  		el.classList.toggle(className);
	} else {
	var classes = el.className.split(' ');
	var existingIndex = classes.indexOf(className);

	if (existingIndex >= 0)
	    classes.splice(existingIndex, 1);
	else
	    classes.push(className);
		el.className = classes.join(' ');
	}
}

function addClass(el, className) {
    var arr = el.className.split(" ");
    if (arr.indexOf(className) == -1) {
        el.className += " " + className;
    }
}

function hasClass(el, className) {
    return el.classList ? el.classList.contains(className) : new RegExp('\\b'+ className+'\\b').test(el.className);
}

function removeClass(el, className) {
  if (el.classList)
    el.classList.remove(className)
  else if (hasClass(el, className)) {
    var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
    el.className=el.className.replace(reg, ' ')
  }
}


function loadScript(url,callback){
    var script = document.createElement('script');
 
    script.onload = function(){
        //once the script is loaded, run the callback
        if (callback){callback()};
    };
 
    //create the script and add it to the DOM
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
};

function getFirstChild(el){
  var firstChild = el.firstChild;
  while(firstChild != null && firstChild.nodeType == 3){ // skip TextNodes
    firstChild = firstChild.nextSibling;
  }
  return firstChild;
}