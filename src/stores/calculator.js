import { writable } from "svelte/store";
import isNumber from "../utils/isNumber";

/**
 * InitialValue needs to be a function that returns an object to work in resets.
 *
 * @returns object
 */
const initialValue = () => {
  return {
    theme: "default", //
    display: [],
    controls: [
      { value: 7, class: "" },
      { value: 8, class: "" },
      { value: 9, class: "" },
      { value: "del", class: "secondary" },
      { value: 4, class: "" },
      { value: 5, class: "" },
      { value: 6, class: "" },
      { value: "+", class: "" },
      { value: 1, class: "" },
      { value: 2, class: "" },
      { value: 3, class: "" },
      { value: "-", class: "" },
      { value: ".", class: "" },
      { value: 0, class: "" },
      { value: "/", class: "" },
      { value: "x", class: "" },
      { value: "reset", class: "double secondary" },
      { value: "=", class: "double result" },
    ],
    operator: null,
    firstNumber: null,
    firstNumberFilled: false,
    secondNumber: null,
    lastNumber: null,
    step: 1,
    result: null,
  };
};

/**
 * Define new writable store
 */
export const calculator = writable(initialValue());

/**
 * Reset Function
 *
 * Reset the store to the initial value.
 *
 * Svelte don't treat objects in variables as safe types, so we need to use
 * initial state as an object that is returned from a function.
 *
 * @returns function set with initialValue(function factory);
 */
export const reset = () => calculator.set(initialValue());

/**
 * Update Display Function
 *
 * Updates the display and advance to next calculation step.
 *
 * @param {string} key value of the key pressed
 */
export const updateDisplay = (key) => {
  let currentDisplay = 0;

  // handle operators
  if (key === "+" || key === "-" || key === "/" || key === "x") {
    calculator.update((store) => {
      // get display number
      currentDisplay = Number(store.display.join(""));

      // update store
      store.operator = key;

      // check if firstNumber is assign
      if (!store.firstNumber) {
        store.firstNumber = currentDisplay;
        store.display = [];
      }

      // move to next step
      store.step = 2;

      return store;
    });
  }

  // handle resetters
  if (key === "del" || key === "reset") {
    reset();
  }

  // handle numbers
  if (isNumber(key) || key === "0" || key === ".") {
    calculator.update((store) => {
      // prevent first number to be 0 or dot
      if (
        (key === "0" && store.display.length === 0) ||
        (key === "." && store.display.length === 0)
      ) {
        return store;
      }

      store.display = [...store.display, ...key];

      return store;
    });
  }
};

// export const handleEquation = () => {
//   calculator.update((store) => {
//     let currentDisplay;

//     // return cases
//     // if (!store.firstNumber && !store.operator && !store.display.length) {
//     //   return store;
//     // }

//     if (store.firstNumber && store.operator) {
//       currentDisplay = store.display.join("");

//       store.secondNumber = currentDisplay;

//       if (store.operator === "+") {
//         store.display = [
//           Number(store.firstNumber) + Number(store.secondNumber),
//         ];

//         return store;
//       }

//       if (store.operator === "-") {
//         store.display = [
//           Number(store.firstNumber) - Number(store.secondNumber),
//         ];

//         return store;
//       }

//       if (store.operator === "x") {
//         store.display = [
//           Number(store.firstNumber) * Number(store.secondNumber),
//         ];

//         return store;
//       }

//       if (store.operator === "/") {
//         if (store.step === 3) {
//           const newResult = [store.result / store.lastNumber];
//           store.display = [newResult];

//           store.result = newResult;

//           return store;
//         }

//         store.lastNumber = Number(store.secondNumber);
//         store.result = Number(store.firstNumber) / Number(store.secondNumber);

//         store.display = [store.result];

//         store.step = 3;
//         console.log("fim divid", store);

//         return store;
//       }
//     }

//     return store;
//   });
// };

/**
 * Handle Equation
 *
 * This function is executed when the user press the "=" key
 * on calculator keyboard.
 *
 * 1  - Add the current display number to the secondNumber entry.
 * 2  - Based on wich key is on entry "operator" do the equation.
 *
 * @returns Svelte calculator store;
 */
export const handleEquation = () => {
  calculator.update((store) => {
    if (store.firstNumber && store.operator) {
      store.secondNumber = store.display.join("");
    }

    if (store.step === 3) {
      const newResult = store.result / store.lastNumber;

      store.display = [newResult];

      store.result = newResult;

      return store;
    }

    store.lastNumber = Number(store.secondNumber);

    if (store.operator === "+") {
      store.result = Number(store.firstNumber) + Number(store.secondNumber);
    }

    if (store.operator === "-") {
      store.result = Number(store.firstNumber) - Number(store.secondNumber);
    }

    if (store.operator === "x") {
      store.result = Number(store.firstNumber) * Number(store.secondNumber);
    }

    if (store.operator === "/") {
      store.result = Number(store.firstNumber) / Number(store.secondNumber);
    }

    store.display = [store.result];

    store.step = 3;

    return store;
  });
};
