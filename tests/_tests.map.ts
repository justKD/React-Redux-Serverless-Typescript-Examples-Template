/**
 * @file tests/_tests.map.ts
 * @author Cadence Holmes
 * @copyright Cadence Holmes 2020
 * @license MIT
 * @fileoverview
 * Asynchronously import tests. List all test files here.
 * Each file should be included using:
 * ```
 * await require("./path/to/file")
 * ```
 */

export const map: () => void = async () => {
  await require('./spec/kd.spec');
};
