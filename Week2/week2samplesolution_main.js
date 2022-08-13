/**
 * Surname     | Firstname | Contribution % | Any issues?
 * =====================================================
 * Person 1... |           | 25%            |
 * Person 2... |           | 25%            |
 * Person 3... |           | 25%            |
 * Person 4... |           | 25%            |
 *
 * Please do not hesitate to contact your tutors if there are
 * issues that you cannot resolve within the group.
 *
 * Complete Worksheet 2 by entering code in the places marked below...
 *
 * For full instructions and tests open the file worksheetChecklist.html
 * in Chrome browser.  Keep it open side-by-side with your editor window.
 * You will edit this file (main.js), save it, and reload the
 * browser window to run the test.
 */

/**
 * Exercise 1
 */

const myObj = { aProperty: "blah", anotherProperty: 123 };

/**
 * Exercise 2
 */

// Assigning functions to variable names, two possible syntaxes:
//     const operationOnTwoNumbers = function (someFunction) { ... };
//     const operationOnTwoNumbers = someFunction => ...
const operationOnTwoNumbers = (op) => (x) => (y) => op(x, y);

/**
 * Exercise 3
 */

const callEach = (l) => l.forEach((element) => element());

/**
 * Exercise 4
 */

const add = operationOnTwoNumbers((x, y) => x + y);
const addN = (n, l) => l.map(add(n));

const getEvens = (l) => l.filter((x) => x % 2 === 0);
const multiplyArray = (l) => l.filter((x) => x !== 0).reduce((x, y) => x * y);

/**
 * Exercise 5
 */

const range = (n) => (n > 0 ? range(n - 1).concat([n - 1]) : []);

/**
 * Exercise 6
 */

const Euler1 = () =>
  range(1000)
    .filter((x) => x % 3 == 0 || x % 5 == 0)
    .reduce((x, y) => x + y);

/**
 * Exercise 7 - Infinite Series Calculator
 */

const infinite_series_calculator = (a) => (p) => (t) => (n) =>
  range(n).filter(p).map(t).reduce(a);

/**
 * Exercise 8 - Calculate Pi
 */
const closeToTarget =
  (f, target, accuracy = 0.01) =>
  (n) =>
    Math.abs(target - f(n)) <= accuracy;
const findMinN = (closeTo, maxN = 500) =>
  range(maxN)
    .filter((x) => x > 1)
    // Range is in ascending order, we just need the first one that passes
    .find(closeTo);

const calculatePiTerm = (n) => (4 * n * n) / (4 * n * n - 1);
const skipZero = (n) => n != 0;
const productAccumulate = (x, y) => x * y;

const calculatePi = (n) =>
  2 *
  infinite_series_calculator(productAccumulate)(skipZero)(calculatePiTerm)(n);

const closeToPi = closeToTarget(calculatePi, Math.PI);
const n_pi = findMinN(closeToPi);
const pi = calculatePi(n_pi);

/**
 * Exercise 9 - Calculate e
 */
const factorial = (n) => (n > 0 ? n * factorial(n - 1) : 1);

const calculateETerm = (n) => (n + 1) / factorial(2 * n + 1);
const alwaysTrue = (_) => true;
const sumAccumulate = (x, y) => x + y;
const sum_series_calculator =
  infinite_series_calculator(sumAccumulate)(alwaysTrue);

const calculateE = (n) => 2 * sum_series_calculator(calculateETerm)(n);

const closeToE = closeToTarget(calculateE, Math.E);
const n_e = findMinN(closeToE);
const e = calculateE(n_e);

// Point-free
const calculateETerm2 = (n) => (2 * (n + 1)) / factorial(2 * n + 1);
const calculateE2 = sum_series_calculator(calculateETerm2);

/**
 * Exercise 10 - Calculate sin(x)
 */
const calculateSineTerm = (x) => (n) =>
  ((-1) ** n * x ** (2 * n + 1)) / factorial(2 * n + 1);
const sin = (x) =>
  infinite_series_calculator(sumAccumulate)(alwaysTrue)(calculateSineTerm(x))(
    500
  );

// With sum series
const sin2 = (x) => sum_series_calculator(calculateSineTerm(x));
