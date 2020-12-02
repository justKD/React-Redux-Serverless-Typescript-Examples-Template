/**
 * @file /src/util/index.ts
 * @author Cadence Holmes
 * @copyright Cadence Holmes 2020
 */

/**
 * Return a random number using `window.crypto.getRandomValues()`.
 * @param {number} [scale] - Scale the random value by this value before returning. Returns `0-1` if this param is empty.
 * @param {number} [places] - Set the number of decimal places to use. `0` returns a whole number.
 * @example
 *  const num = rand(); // random number 0-1
 *  const num2 = rand(1, 2); // random number 0-1 with 2 decimal places
 *  const wholeNum = rand(100, 0); // random whole number 0-100
 */
export const rand = (scale?: number, places?: number) => {
  const MAX_UINT32 = 4294967295;
  const arr = window.crypto.getRandomValues(new Uint32Array(1));
  const num = arr[0] / MAX_UINT32;
  const result = scale ? scale * num : num;
  return Number.isSafeInteger(places)
    ? parseFloat(result.toFixed(places))
    : result;
};

/**
 * Automatically add and remove CSS keyframe animations.
 * @param {any} element - The DOM node to target.
 * @param {string} animation - The name of the animation class.
 * @param {() => void} [callback] - Optional callback function to be called when the animation is completed.
 * @example
 *  import 'jello.css';
 *  const button = document.getElementById("myButton");
 *  button.onclick = () => animate(button, "jello");
 */
export const animate = (
  element: any,
  animation: string,
  callback?: () => void
) => {
  if (!element?.classList) return;

  const handleAnimationEnd = () => {
    element.classList.remove(animation);
    element.removeEventListener('animationend', handleAnimationEnd);
    if (callback) callback();
  };

  const stopAnimation = () => {
    if (element.classList.contains(animation)) {
      element.classList.remove(animation);
    }

    if (element['animating']) {
      element.removeEventListener('animationend', handleAnimationEnd);
      element['animating'] = false;
    }
  };

  const startAnimation = () => {
    element['animating'] = true;
    element.classList.add(animation);
    element.addEventListener('animationend', handleAnimationEnd);
  };

  stopAnimation();
  startAnimation();
};
