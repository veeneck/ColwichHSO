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
    console.log(window.innerWidth);
    loadTriggersForPage();
}

/* -------- SCROLL TRIGGERS -------- */


function loadTriggersForPage() {
    let elements = gsap.utils.toArray("section.auctionItem");
    elements.forEach((el, i) => {

        let scale = 0.8;
        if(window.innerWidth > 1080) {
            scale = 1;
        }

        if(i > 0) {

            gsap.from(el, {
                scrollTrigger: {
                    trigger: el,
                    scrub: true,
                },
                scale: scale
            });

        }

        let els = gsap.utils.toArray(".price, h7", el);
        els.forEach((innerEl, pos) => {

            let distance = 10;
            if(innerEl.tagName == "P") {
                distance = 30;
            }

            let innerScale = 1;
            if(window.innerWidth > 1080 && innerEl.tagName == "H7") {
                innerScale = 0.8;
            }

            gsap.from(innerEl, {
                scrollTrigger: {
                    trigger: innerEl,
                    scrub: true
                },
                y: distance,
                scale: innerScale
            })

        });


    });
}