function ready(e){(document.attachEvent?"complete"===document.readyState:"loading"!==document.readyState)?e():window.addEventListener("load",e)}function loadPage(){bringElementsIntoView()}function bringElementsIntoView(){checkAllTriggers(),document.addEventListener("scroll",(function(e){checkAllTriggers()})),document.addEventListener("resize",(function(e){checkAllTriggers()}))}function checkAllTriggers(){checkIfTriggerIsInView(document.querySelectorAll(".triggerMe"))}function checkIfTriggerIsInView(e){Array.prototype.forEach.call(e,(function(e,n){hasClass(e,"triggeredCSS3")||isScrolledIntoView(e,0)&&addClass(e,"triggeredCSS3")}))}function isScrolledIntoView(e,n){var t=e.getBoundingClientRect(),s=t.top,i=t.bottom;return s<window.innerHeight+n&&i>=0}function toggleClass(e,n){if(e.classList)e.classList.toggle(n);else{var t=e.className.split(" "),s=t.indexOf(n);s>=0?t.splice(s,1):t.push(n),e.className=t.join(" ")}}function addClass(e,n){-1==e.className.split(" ").indexOf(n)&&(e.className+=" "+n)}function hasClass(e,n){return e.classList?e.classList.contains(n):new RegExp("\\b"+n+"\\b").test(e.className)}function removeClass(e,n){if(e.classList)e.classList.remove(n);else if(hasClass(e,n)){var t=new RegExp("(\\s|^)"+n+"(\\s|$)");e.className=e.className.replace(t," ")}}function loadScript(e,n){var t=document.createElement("script");t.onload=function(){n&&n()},t.src=e,document.getElementsByTagName("head")[0].appendChild(t)}function getFirstChild(e){for(var n=e.firstChild;null!=n&&3==n.nodeType;)n=n.nextSibling;return n}ready(loadPage);