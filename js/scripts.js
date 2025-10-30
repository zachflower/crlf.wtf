/**
 * Type text in an element with a typewriter effect
 *
 * @param {*} element
 * @param {*} text
 * @param {*} delay
 */
function typeText(element, text, delay = 100) {
  let i = 0;

  function type() {
    if (i < text.length) {
      // check for special characters
      if (text.charAt(i) !== "\\") {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, delay);
        return;
      }

      // skip the backslash
      i++;

      if (text.charAt(i) === "n") {
        // convert newline character to HTML line break
        element.innerHTML += "<br>";
        i++;
        setTimeout(type, delay * 10);
        return;
      } else if (text.charAt(i) === "t") {
        // convert tab character to HTML tab
        element.innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;";
      } else {
        // not a special character, back up and print it
        i--;
        element.innerHTML += text.charAt(i);
      }

      i++;
      setTimeout(type, delay);
      return;
    }
  }

  type();
}

/**
 * Initialize element effects
 */
document.addEventListener("DOMContentLoaded", () => {
  const tw = document.querySelectorAll("[data-typewriter-text]");
  tw.forEach(el => {
    const text = el.getAttribute("data-typewriter-text");
    el.innerHTML = ""; // Clear the element's content
    typeText(el, text);
  });

  const us = document.querySelectorAll(".ufw");
  us.forEach((el) => {
    el.innerHTML = el.textContent.replace(/\b(\w)/g, "<span>$1</span>");
  });
});
