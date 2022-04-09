/* -------- DOCUMENT READY -------- */

ready(loadPage);

/// We're using window load instead of DomContentLoaded so that the CSS animations play as expected.
/// If the stylesheet isn't cached, sometimes the JS will trigger before the CSS loads, and some elements are hidden
function ready(fn) {
  if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
    fn();
  } else {
    window.addEventListener('load', fn);
  }
}

function loadPage() {
	bringElementsIntoView();
}

/* -------- FAQ QUESTIONS -------- */
/*
/// Attach events to questions, and perform any code needed on load.
function initFAQListeners() {
	openQuestionIfInUrl();
	var questions = document.querySelectorAll('.question');
	Array.prototype.forEach.call(questions, function(question, i){
		question.addEventListener('click', function(event) {
			event.preventDefault();
			toggleQuestion(this)
			return false;
		});
	});
}

/// If the URL has a hash (#) of the question ID, open that question immediately.
function openQuestionIfInUrl() {
	if(window.location.hash) {
  		var el = document.querySelectorAll(window.location.hash)[0];
  		if(hasClass(el, "question")) {
  			toggleQuestion(el);
  		}
  	}
}

/// Open and close the questions by toggling the class name.
function toggleQuestion(element) {
	toggleClass(element, "arrow-right");
	toggleClass(element, "arrow-down");
	toggleClass(element.parentNode.nextElementSibling, "hide");
}*/

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