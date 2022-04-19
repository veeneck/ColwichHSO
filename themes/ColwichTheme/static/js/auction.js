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
    let elements = gsap.utils.toArray("section.auctionItem");
    elements.forEach((el, i) => {

        if(i > 0) {

            gsap.from(el, {
                scrollTrigger: {
                    trigger: el,
                    scrub: true,
                },
                scale: 0.8
            });

        }

        let els = gsap.utils.toArray(".price, h7, p", el);
        els.forEach((innerEl, pos) => {

            let distance = 20;
            let scale = 1;
            if(innerEl.tagName == "P") {
                distance = 10;
                scale = 0.9;
            }

            gsap.from(innerEl, {
                scrollTrigger: {
                    trigger: innerEl,
                    scrub: true
                },
                y: distance,
                scale: scale
            })

        });


    });
}