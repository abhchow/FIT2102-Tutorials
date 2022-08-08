// Surname     | Firstname | email                       | Contribution% | Any issues?
// ===================================================================================
// Chow        | Albert    | acho0023@student.monash.edu | 25%           |
// Putamorsi   | Max       | mput0002@student.monash.edu | 25%           |
// Ongko       | Timothy   | tong0006@student.monash.edu | 25%           |
// Ibrahim     | Hassan    | ihas0001@student.monash.edu | 25%           | 
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
const myObj = { aProperty: "VIM is the best", anotherProperty: 0 };

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
const Euler1 = (_) =>
	range(1000)
		.filter((item) => item % 3 === 0 || item % 5 === 0)
		.reduce((a, b) => a + b);

/**
 * Exercise 7
 */
const infinite_series_calculator =
	(reduceFunction) => (filterFunction) => (transformFunction) => (n) =>
		range(n)
			.filter(filterFunction)
			.map(transformFunction)
			.reduce(reduceFunction);

/**
 * Exercise 8
 */
const calculatePiTerm = (n) => (4 * n ** 2) / (4 * n ** 2 - 1);
const skipZero = (x) => x !== 0;
const productAccumulate = (a, b) => a * b;
const calculatePi = (n) =>
	2 *
	infinite_series_calculator(productAccumulate)(skipZero)(calculatePiTerm)(n);
const pi = calculatePi(79);

const minError = (f, target, error = 0.01, n = 2) =>
	Math.abs(f(n) - target) <= error ? n : minError(f, target, error, n + 1);
const minPiN = minError(calculatePi, Math.PI);

/**
 * Exercise 9
 */
//const factorial = (n) => range(n).map((x) => x + 1).reduce(productAccumulate);
const factorial = (n, product = 1) =>
	n === 0 ? product : factorial(n - 1, product * n);
const calculateETerm = (n) => (2 * (n + 1)) / factorial(2 * n + 1);
const alwaysTrue = (_) => true;
const sumAccumulate = (a, b) => a + b;
const sum_series_calculator =
	infinite_series_calculator(sumAccumulate)(alwaysTrue);
const calculateE = (n) => sum_series_calculator(calculateETerm)(n);
const e = calculateE(3);

const minEN = minError(calculateE, Math.E);
/**
 * Exercise 10
 */
const calculateSinTerm = (x) => (n) =>
	((-1) ** n * x ** (2 * n + 1)) / factorial(2 * n + 1);
const calculateSin = (n) => (x) =>
	sum_series_calculator(calculateSinTerm(x))(n);
const sin = calculateSin(3);
