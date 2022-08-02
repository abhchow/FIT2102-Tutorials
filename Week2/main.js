// Surname     | Firstname | Contribution % | Any issues?
// =====================================================
// Person 1... |           | 25%
// Person 2... |           | 25%
// Person 3... |           | 25%
// Person 4... |           | 25%
//
// complete Worksheet 2 by entering code in the places marked below...
//
// For full instructions and tests open the file worksheetChecklist.html
// in Chrome browser.  Keep it open side-by-side with your editor window.
// You will edit this file (main.js), save it, and reload the
// browser window to run the test.

/**
 * Exercise 1
 */
let myObj = { aProperty: "", anotherProperty: 0 };

/**
 * Exercise 2
 */
const operationOnTwoNumbers = (f) => (a) => (b) => f(a, b);

/**
 * Exercise 3
 */
const callEach = (array) => array.forEach((item) => item());

/**
 * Exercise 4
 */
const addN = (n, array) => array.map((item) => item + n);
const getEvens = (array) => array.filter((item) => item % 2 === 0);
const multiplyArray = (array) =>
	array.filter((item) => item !== 0).reduce((a, b) => a * b);

/**
 * Exercise 5
 */
const range = (n, i = 0, list = []) =>
	i === n ? list : range(n, i + 1, list.concat([i]));

/**
 * Exercise 6
 */

/**
 * Exercise 7
 */

/**
 * Exercise 8
 */

/**
 * Exercise 9
 */

/**
 * Exercise 10
 */
