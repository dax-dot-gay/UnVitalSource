function rootInFrame() {
  fetch("http://localhost:8111/state")
    .then(async (resp) => {
      if (resp.ok) {
        const data = await resp.json();
        if (data.type === "waiting_page") {
          if (
            (window.innerPageData.index ?? -1) - 1 == data.page &&
            window.innerPageData &&
            document.getElementById("pbk-page").getAttribute("src")
          ) {
            fetch(`http://localhost:8111/page/${data.page.toString()}`, {
              method: "POST",
              body: JSON.stringify({
                script: window.innerPageData,
                image:
                  "https://jigsaw.vitalsource.com" +
                  document.getElementById("pbk-page").getAttribute("src"),
              }),
            }).catch(() => {});
          }
        }
      }
    })
    .catch(() => {});
}

function rootOutFrame() {
  fetch("http://localhost:8111/state")
    .then(async (resp) => {
      if (resp.ok) {
        const data = await resp.json();
        if (data.type === "not_started") {
          console.log("Setting up new connection...");
          fetch(
            `http://localhost:8111/setup/${location.pathname.split("/")[3]}`,
            { method: "POST" }
          ).catch(() => {});
          return;
        }
        if (data.type === "waiting_page") {
          if (location.pathname.split("/")[5] === (data.page - 1).toString()) {
            if (
              document
                .querySelector("footer")
                .querySelectorAll("button")
                .item(2)
            ) {
              document
                .querySelector("footer")
                .querySelectorAll("button")
                .item(2)
                .click();
              return;
            }
          }
          if (location.pathname.split("/")[5] !== data.page.toString()) {
            location.pathname =
              location.pathname.split("/").slice(0, 5).join("/") +
              "/" +
              data.page.toString();
          }
        }
      }
    })
    .catch(() => {});
}

(function () {
  "use strict";
  if (location.pathname.includes("mosaic/wrapper.html")) {
    return;
  }
  let interval;
  if (location.hostname === "bookshelf.vitalsource.com") {
    console.log(
      "NOTICE: Starting UnVitalSource watcher in the background. Attempting to connect to localhost:8111"
    );
    setInterval(rootOutFrame, 2000);
  } else if (location.hostname === "jigsaw.vitalsource.com") {
    setInterval(rootInFrame, 2000);
  }
})();
