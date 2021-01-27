/**
 * @file tests/_tests.options.ts
 * @author Cadence Holmes
 * @copyright Cadence Holmes 2020
 * @license MIT
 * @fileoverview
 * Mocha options.
 */

/** Target mocha version. */
const mochaVersion: string = '^7.0.0';

/**
 * If `false`, Mocha reports to console.
 * If `true`, appropriate HTML and CSS will be added to the document
 * and test reports will appear in the browser window.
 */
const mochaHTML: boolean = false;

/**
 * The Mocha `"bdd"` interface exposes:
 * ```
 * describe()
 * context()
 * it()
 * specify()
 * before()
 * after()
 * beforeEach()
 * afterEach()
 * ```
 * See: `https://mochajs.org/#interfaces` for other options.
 */
const mochaInterface: string = 'bdd';

/**
 * Mocha parameters. Add optional parameters to `const mochaParams`
 * as necessary. See: `https://mochajs.org/api/mocha`.
 */
type MochaParams = {
  /* Parameters required here. */
  ui: string; // Interface name.
  reporter: string; // Reporter name or constructor.

  /* Optional parameters. */
  allowUncaught?: boolean; // Propagate uncaught errors?
  asyncOnly?: boolean; // Force done callback or promise?
  bail?: boolean; // Bail after first test failure?
  checkLeaks?: boolean; // Check for global variable leaks?
  color?: boolean; // Color TTY output from reporter?
  delay?: boolean; // Delay root suite execution?
  diff?: boolean; // Show diff on failure?
  fgrep?: string; // Test filter given string.
  forbidOnly?: boolean; // Tests marked only fail the suite?
  forbidPending?: boolean; // Pending tests fail the suite?
  fullTrace?: boolean; // Full stacktrace upon failure?
  global?: string[]; // Variables expected in global scope.
  grep?: RegExp | string; // Test filter given regular expression.
  growl?: boolean; // Enable desktop notifications?
  inlineDiffs?: boolean; // Display inline diffs?
  invert?: boolean; // Invert test filter matches?
  noHighlighting?: boolean; // Disable syntax highlighting?
  reporterOption?: Object; // Reporter settings object.
  retries?: number; // Number of times to retry failed tests.
  slow?: number; // Slow threshold value.
  timeout?: number | string; // Timeout threshold value.
};

/** Mocha parameters. See: `https://mochajs.org/api/mocha`. */
const mochaParams: MochaParams = {
  ui: mochaInterface,
  reporter: mochaHTML ? 'html' : 'spec',
  checkLeaks: true,
};

/** Export Mocha version and setup parameters. */
export const options: {
  version: string;
  params: MochaParams;
} = {
  version: mochaVersion,
  params: mochaParams,
};
