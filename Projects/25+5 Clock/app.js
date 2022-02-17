// set initial count
let count = 0;

// select value and buttons
const value = document.querySelector("#value");
const btns = document.querySelectorAll(".btn");

// what to do for each button clicked
btns.forEach(function (btn) {
  btn.addEventListener("click", function (e) {
    // determine class list for the current event (click) that happens
    // use 'e' to search for the Event defined by addEventListener
    const styles = e.currentTarget.classList;
    if (styles.contains("decrease")) {
      count--;
    } else if (styles.contains("increase")) {
      count++;
    } else {
      count = 0;
    }

    // Change font color for <span> with ID 'value'
    if (count > 0) {
      value.style.color = "green";
    }
    if (count < 0) {
      value.style.color = "red";
    }
    if (count === 0) {
      value.style.color = "#ddd";
    }

    value.textContent = count;
  });
});
