// ==UserScript==
// @name         Swagbucks Automate Survey
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  autofills survey
// @author       Ziloka
// @match        *://www.swagbucks.com/*
// @match        *://www.peanutlabs.com/userGreeting.php*
// @icon         https://static.prdg.io/dist-non-modules/swagbucks-logo.9a2be82dae037e9f8c26.svg
// ==/UserScript==

'use strict';
(async () => {
  // https://stackoverflow.com/questions/37616818/apply-a-greasemonkey-tampermonkey-userscript-to-an-iframe
  if (window.top === window.self) {
    console.log("loaded main page");
    // main page, theres not much on this page
  } else {
    console.log("loaded iframe?");
    // wait for element to load
    await waitForElm(".offer-item-top");

    // this only works when you press the keys before you click on anything on the site
    // window.addEventListener("keydown", handleKeyStrokes);

    // function handleKeyStrokes(keyboardEvent) {
    //   console.log(`user pressed: ${keyboardEvent.key}, altkey: ${keyboardEvent.altKey}`);
    //   // https://keycode.info/
    //   if (keyboardEvent.key == "s") clickOnSurvey();
    // }

    finishSurvey();

    /**
    * Clicks on the first survey that is seen
    * precondition: N/A
    * postcondition: clicks on survey that has not been clicked on before, not any purchase, or app installs
    */
    function finishSurvey() {
      let survey = getSurvey();
      survey.querySelector("div").click();
      console.log(`clicked on survey: ${survey.innerText}`);
      console.log(survey);
    }

    /**
    * Get survey
    * precondition: N/A
    * postcondition: clicks on survey that has not been clicked on before, not any purchase, or app installs
    * https://www.peanutlabs.com/pl/js/iFrameV4/PDFs/OffersFAQ.pdf
    */
    function getSurvey() {
      return Array.prototype.slice.call(document.querySelectorAll(".offer-item-top")).find((survey) => {
        let offerTags = Array.prototype.slice.call(survey.querySelectorAll(".offer-tags > ul > li")).map((e) => e.innerText);
        return !survey.querySelector("div > div > span").classList.contains("already_opened") && !offerTags.includes("Purchase") && !offerTags.includes("App Install");
      });
    }

    function fillOutSurvey() {
      // https://fakerjs.dev/guide/usage.html#browser

    }

    function rateLimit() {

    }
  }

})();

// Utilities
// https://stackoverflow.com/questions/5525071/how-to-wait-until-an-element-exists
// https://stackoverflow.com/a/61511955
function waitForElm(selector) {
  return new Promise(resolve => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver(mutations => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector));
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  });
}

// https://stackoverflow.com/questions/12018759/how-to-check-the-class-of-an-instance-in-javascript
// https://stackoverflow.com/a/12018890
const getClassOf = Function.prototype.call.bind(Object.prototype.toString);
