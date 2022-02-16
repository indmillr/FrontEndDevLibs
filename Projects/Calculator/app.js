// ========== HOLDER OBJECT ========== //

const calculator = {
  displayValue: "0",
  firstOp: null,
  waitForSecondOp: false,
  operator: null,
};

// ========== FUNCTIONS ========== //

function inputDigit(digit) {
  const { displayValue, waitForSecondOp } = calculator;

  if (waitForSecondOp === true) {
    // overwrite displayValue with secondOp
    calculator.displayValue = digit;
    // reset waitForSecondOp to false
    calculator.waitForSecondOp = false;
  } else {
    // overwrite displayValue if current value is '0'
    // otherwise append to it
    calculator.displayValue =
      displayValue === "0" ? digit : displayValue + digit;
  }
}

function inputDecimal(dot) {
  if (calculator.waitForSecondOp === true) {
    calculator.displayValue = "0.";
    calculator.waitForSecondOp = false;
    return;
  }
  // if displayValue prop does NOT contain a decimal
  if (!calculator.displayValue.includes(dot)) {
    // append the decimal
    calculator.displayValue += dot;
    return;
  }
}

function handleOp(nextOp) {
  // destructure calculator object props
  const { firstOp, displayValue, operator } = calculator;
  // convert displayValue to a floating-point number
  const inputValue = parseFloat(displayValue);

  // overwrite consecutive operator clicks
  if (operator && calculator.waitForSecondOp) {
    calculator.operator = nextOp;
    return;
  }

  // is firstOp null? is inputValue !NaN?
  if (firstOp === null && !isNaN(inputValue)) {
    // update firstOp
    calculator.firstOp = inputValue;
  } else if (operator) {
    const result = calculate(firstOp, inputValue, operator);

    calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
    calculator.firstOp = result;
  }

  calculator.waitForSecondOp = true;
  calculator.operator = nextOp;
}

function calculate(firstOp, secondOp, operator) {
  if (operator === "+") {
    return firstOp + secondOp;
  } else if (operator === "-") {
    return firstOp - secondOp;
  } else if (operator === "*") {
    return firstOp * secondOp;
  } else if (operator === "/") {
    return firstOp / secondOp;
  }
  // if secondOp is '=' it will be returned as is
  return secondOp;
}

function resetCalculator() {
  calculator.displayValue = "0";
  calculator.firstOp = null;
  calculator.waitForSecondOp = false;
  calculator.operator = null;
}

function updateDisplay() {
  // find calculator screen element
  const display = document.querySelector(".calculator-screen");
  // update calculator screen with displayValue
  display.value = calculator.displayValue;
}

updateDisplay();

// ========== LOGIC ========== //

const keys = document.querySelector(".calculator-keys");
keys.addEventListener("click", (e) => {
  const { target } = e;
  const { value } = target;
  if (!target.matches("button")) {
    return;
  }

  switch (value) {
    case "+":
    case "-":
    case "*":
    case "/":
    case "=":
      handleOp(value);
      break;
    case ".":
      inputDecimal(value);
      break;
    case "all-clear":
      resetCalculator();
      break;
    default:
      if (Number.isInteger(parseFloat(value))) {
        inputDigit(value);
      }
  }
  updateDisplay();
});
