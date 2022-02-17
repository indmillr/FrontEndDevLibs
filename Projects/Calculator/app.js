// ========== HOLDER OBJECT ========== //

const jscalc = {
  disVal: "0",
  num1: null,
  waiting: false,
  operator: null,
  isNeg: false,
};

// ========== FUNCTIONS ========== //

function inputDig(dig) {
  const { disVal, waiting } = jscalc;

  if (waiting === true) {
    // overwrite 'disVal' with 'num2'
    jscalc.disVal = dig;
    // reset 'waiting' to false
    jscalc.waiting = false;
  } else {
    // overwrite 'disVal' if current value is '0', otherwise append
    jscalc.disVal = disVal === "0" ? dig : disVal + dig;
  }
}

function inputDot(dot) {
  if (jscalc.waiting === true) {
    jscalc.disVal = "0.";
    jscalc.waiting = false;
    return;
  }
  // if 'disVal' prop does NOT contain a decimal, append decimal
  if (!jscalc.disVal.includes(dot)) {
    jscalc.disVal += dot;
    return;
  }
}

function handleOp(nextOp) {
  // 'jscalc' props destructure
  const { num1, disVal, operator } = jscalc;
  // convert 'disVal' to a floating-point number
  const inputVal = parseFloat(disVal);

  // overwrite consecutive operator clicks
  /* if most recent operator click is '-' keep the current operator and instead
  use the '-' operator entry as indicator to convert 'num2' to a negative number
  by setting 'isNeg' to true */
  if (operator && jscalc.waiting) {
    if (operator && nextOp === "-") {
      jscalc.isNeg = true;
    } else {
      jscalc.isNeg = false;
      jscalc.operator = nextOp;
    }
    return;
  }

  // is num1 null?
  // is inputVal !NaN?
  if (num1 === null && !isNaN(inputVal)) {
    // update num1
    jscalc.num1 = inputVal;
  } else if (operator) {
    const result = jscalculate(num1, inputVal, operator);

    jscalc.disVal = `${parseFloat(result.toFixed(5))}`;
    jscalc.num1 = result;
  }

  jscalc.waiting = true;
  jscalc.operator = nextOp;
}

function jscalculate(num1, num2, operator) {
  if (jscalc.isNeg === true) {
    num2 = 0 - num2;
  }
  if (operator === "+") {
    return num1 + num2;
  } else if (operator === "-") {
    return num1 - num2;
  } else if (operator === "*") {
    return num1 * num2;
  } else if (operator === "/") {
    return num1 / num2;
  }
  // if num2 is '=' just keep it
  return num2;
}

function resetCalc() {
  jscalc.disVal = "0";
  jscalc.num1 = null;
  jscalc.waiting = false;
  jscalc.operator = null;
  jscalc.isNeg = false;
}

function updateDis() {
  // find 'jscalc' screen element
  const display = document.querySelector(".calcscreen");
  // update 'jscalc' screen with 'disVal'
  display.value = jscalc.disVal;
}

updateDis();

// ========== LOGIC ========== //

const keys = document.querySelector(".calckeys");
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
      inputDot(value);
      break;
    case "reset":
      resetCalc();
      break;
    default:
      if (Number.isInteger(parseFloat(value))) {
        inputDig(value);
      }
  }
  updateDis();
});
