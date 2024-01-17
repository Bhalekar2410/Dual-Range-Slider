/**
 * Updates the "from" slider based on the input values and ensures synchronization.
 * @param {HTMLInputElement} fromSlider - The "from" range slider input element.
 * @param {HTMLInputElement} fromInput - The input field associated with "from" slider.
 * @param {HTMLInputElement} toInput - The input field associated with "to" slider.
 * @param {HTMLInputElement} controlSlider - The slider to control (e.g., "to" slider).
 */
function controlFromInput(fromSlider, fromInput, toInput, controlSlider) {
  // Parse input values
  const [from, to] = getParsed(fromInput, toInput);

  // Update the range slider visually
  fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', controlSlider);

  // Check validity and update "from" slider value
  if (!isNaN(from) && !isNaN(to) && from > to) {
    fromSlider.value = to;
  } else {
    fromSlider.value = from;
  }

  // Update associated input field with the formatted value
  fromInput.value = fromSlider.value.toFixed(2);
}

/**
 * Updates the "to" slider based on the input values and ensures synchronization.
 * @param {HTMLInputElement} toSlider - The "to" range slider input element.
 * @param {HTMLInputElement} fromInput - The input field associated with "from" slider.
 * @param {HTMLInputElement} toInput - The input field associated with "to" slider.
 * @param {HTMLInputElement} controlSlider - The slider to control (e.g., "to" slider).
 */
function controlToInput(toSlider, fromInput, toInput, controlSlider) {
  // Parse input values
  const [from, to] = getParsed(fromInput, toInput);

  // Update the range slider visually
  fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', controlSlider);

  // Set accessibility for the "to" input field
  setToggleAccessible(toInput);

  // Check validity and update "to" slider value
  if (!isNaN(from) && !isNaN(to) && from <= to) {
    toSlider.value = to;
  } else {
    toSlider.value = from;
  }

  // Update associated input field with the formatted value
  toInput.value = toSlider.value.toFixed(2);
}

/**
 * Updates the "from" input field based on the slider values and ensures synchronization.
 * @param {HTMLInputElement} fromSlider - The "from" range slider input element.
 * @param {HTMLInputElement} toSlider - The "to" range slider input element.
 * @param {HTMLInputElement} fromInput - The input field associated with "from" slider.
 */
function controlFromSlider(fromSlider, toSlider, fromInput) {
  // Parse slider values
  const [from, to] = getParsed(fromSlider, toSlider);

  // Update the range slider visually
  fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);

  // Check validity and update "from" slider value
  if (!isNaN(from) && !isNaN(to) && from > to) {
    fromSlider.value = to;
  } else {
    fromInput.value = from.toFixed(2);
  }

  // Update associated input field with the formatted value
  fromInput.value = fromSlider.value.toFixed(2);
}

/**
 * Updates the "to" slider based on the slider values and ensures synchronization.
 * @param {HTMLInputElement} fromSlider - The "from" range slider input element.
 * @param {HTMLInputElement} toSlider - The "to" range slider input element.
 * @param {HTMLInputElement} toInput - The input field associated with "to" slider.
 */
function controlToSlider(fromSlider, toSlider, toInput) {
  // Parse slider values
  const [from, to] = getParsed(fromSlider, toSlider);

  // Update the range slider visually
  fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);

  // Set accessibility for the "to" slider
  setToggleAccessible(toSlider);

  // Check validity and update "to" slider value
  if (!isNaN(from) && !isNaN(to) && from <= to) {
    toSlider.value = to;
    toInput.value = to.toFixed(2);
  } else {
    toInput.value = from.toFixed(2);
    toSlider.value = from;
  }

  // Update associated input field with the formatted value
  toInput.value = toSlider.value.toFixed(2);
}

/**
 * Parses the values of two input elements and returns an array of parsed values.
 * @param {HTMLInputElement} currentFrom - The "from" input element.
 * @param {HTMLInputElement} currentTo - The "to" input element.
 * @returns {Array} - An array containing two parsed values.
 */
function getParsed(currentFrom, currentTo) {
  const from = parseFloat(currentFrom.value);
  const to = parseFloat(currentTo.value);
  return [from, to];
}

/**
 * Fills the background of a slider to represent a range.
 * @param {HTMLInputElement} from - The "from" range slider input element.
 * @param {HTMLInputElement} to - The "to" range slider input element.
 * @param {string} sliderColor - The color of the slider.
 * @param {string} rangeColor - The color of the range between sliders.
 * @param {HTMLInputElement} controlSlider - The slider to control (e.g., "to" slider).
 */
function fillSlider(from, to, sliderColor, rangeColor, controlSlider) {
  const rangeDistance = to.max - to.min;
  const fromPosition = from.value - to.min;
  const toPosition = to.value - to.min;
  controlSlider.style.background = `linear-gradient(
    to right,
    ${sliderColor} 0%,
    ${sliderColor} ${(fromPosition) / rangeDistance * 100}%,
    ${rangeColor} ${((fromPosition) / rangeDistance) * 100}%,
    ${rangeColor} ${(toPosition) / rangeDistance * 100}%,
    ${sliderColor} ${(toPosition) / rangeDistance * 100}%,
    ${sliderColor} 100%)`;
}

/**
 * Sets the accessibility for a target element based on the value of an input field.
 * @param {HTMLInputElement} currentTarget - The target input element.
 */
function setToggleAccessible(currentTarget) {
  const toSlider = document.querySelector('#toSlider');
  if (Number(currentTarget.value) <= 0) {
    toSlider.style.zIndex = 2;
  } else {
    toSlider.style.zIndex = 0;
  }
}

// Querying DOM elements
const fromSlider = document.querySelector('#fromSlider');
const toSlider = document.querySelector('#toSlider');
const fromInput = document.querySelector('#fromInput');
const toInput = document.querySelector('#toInput');

// Initial setup
fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
setToggleAccessible(toInput);

// Event listeners for user interactions
fromSlider.oninput = () => controlFromSlider(fromSlider, toSlider, fromInput);
toSlider.oninput = () => controlToSlider(fromSlider, toSlider, toInput);
fromInput.oninput = () => controlFromInput(fromSlider, fromInput, toInput, toSlider);
toInput.oninput = () => controlToInput(toSlider, fromInput, toInput, toSlider);
