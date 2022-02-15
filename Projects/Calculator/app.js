const calculator = {
  displayValue: "0",
  firstOp: null,
  waitForSecondOp: false,
  operator: null,
};

function updateDisplay() {
  const display = document.querySelector(".calculator-screen");
  display.value = calculator.displayValue;
}

updateDisplay();
