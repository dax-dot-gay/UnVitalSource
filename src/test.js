function rootInFrame() {
  console.log(
    "SCRIPT",
    document.getElementById("vst-html-javascript").innerText,
    window.innerPageData
  );
  console.log("PAGE", document.getElementById("pbk-page").getAttribute("src"));
}

function rootOutFrame() {}

(function () {
  "use strict";
  if (location.hostname === "bookshelf.vitalsource.com") {
    setTimeout(rootOutFrame, 1000);
  } else if (location.hostname === "jigsaw.vitalsource.com") {
    setTimeout(rootInFrame, 1000);
  }
})();
