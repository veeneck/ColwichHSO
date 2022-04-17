gsap.registerPlugin(ScrollTrigger);

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
    loadTriggersForPage();
}

/* -------- SCROLL TRIGGERS -------- */


function loadTriggersForPage() {
    let elements = gsap.utils.toArray("section");
    elements.forEach((el, i) => {

        if(i > 1) {

            gsap.from(el, {
                scrollTrigger: {
                    trigger: el,
                    start: "-=200%",
                    scrub: true,
                },
                scale: 0.8
            });

        }

        let els = gsap.utils.toArray(".amount", el);
        els.forEach((innerEl, pos) => {

            gsap.from(innerEl, {
                scrollTrigger: {
                    trigger: innerEl,
                    scrub: true
                },
                y: 20
            })

        });


    });
}