/* 
Complete the following table when you submit this file:

Surname     | Firstname | email | Contribution% | Any issues?
=============================================================
Person 1... | Timothy ONGKO | tong0006@student.monash.edu | 25% | no
Person 2... |           |       | 0%           |
Person 3... |           |       | 0%           |
Person 4... |           |       | 0%           |

complete Worksheet 1 by entering code in the places marked below...

For full instructions and tests open the file worksheetChecklist.html
in Chrome browser.  Keep it open side-by-side with your editor window.
You will edit this file (main.js), save it, and reload the 
browser window to run the test. 
*/

/**
    Exercise 1:
    The let and const keywords are for creating mutable and immutable variables 
    respectively.
    Create a mutable variable called ‘aVariable’ and assign its value to 1.
*/
let aVariable = 1;

/*
    Create an immutable variable called ‘aConst’ and assign its value to aVariable + 1.
*/
const aConst = aVariable + 1;

/**
    Exercise 2:
    Create a function called ‘aFunction’ using the function keyword.  
    Inside the function create another variable called 'anotherVariable',
    set its value to 2 and return anotherVariable.
*/
function aFunction() {
	let anotherVariable = 2;
	return anotherVariable;
}

/**
    Exercise 3:
    Make a function called ‘projectEulerProblem1’ that calculates the answer using
    mutable variables, a while loop, and returns the answer.
*/
function projectEulerProblem1() {
	const multipleOf = (x, n) => x % n === 0;
	const maxNumber = 1000;
	let result = 0;
	let i = 1;
	while (i < maxNumber) {
		result += multipleOf(i, 3) || multipleOf(i, 5) ? i : 0;
		i++;
	}
	return result;
}
/**
    Exercise 4:
    Write a function called ‘alwaysTrue’ which always returns true, no matter what argument it is given.
*/
//function alwaysTrue() {
//	return true;
//}
const alwaysTrue = (_) => true;

/**
    Write a function called imperativeSummer that takes two parameters: a function f, and a number n.  
    It should use an imperative loop to sum over the numbers from 1 up to (but not including) n,
    including the number x in the sum only if f(x) is true.
*/
function imperativeSummer(f, n) {
	let result = 0;
	for (let i = 1; i < n; i++) {
		result += f(i) ? i : 0;
	}
	return result;
}

/**
    Write a function called sumTo that takes as parameter a number n and
    uses imperativeSummer and alwaysTrue to calculate the sum of all numbers
    from 1 up to (but not including) n.
*/
const sumTo = (n) => imperativeSummer(alwaysTrue, n);

/**
    Write a function called ‘isDivisibleByThreeOrFive’ which takes a number as parameter,
    tests if it is divisible by 3 or 5, returning true if it is.
*/
const isDivisibleByThreeOrFive = (n) => n % 3 === 0 || n % 5 === 0;

/**
    Write a function called projectEulerProblem1UsingImperativeSummer 
    that uses your imperativeSummer and isDivisibleByThreeOrFive to
    again solve Project Euler Problem 1.  It should be one line of code!
*/
const projectEulerProblem1UsingImperativeSummer = (_) =>
	imperativeSummer(isDivisibleByThreeOrFive, 1000);
/**
    Exercise 5:
    Write a function called 'immutableSummer' with parameters f and n, which computes the sum of numbers
    from 1 up to (but not including) n that satisfy f, but does *not* use while,
    for or any mutable variables (defined with let or var).
    Hint: use recursion!
*/
const recursiveSummer = (f, n, i, result) =>
	i === n ? result : recursiveSummer(f, n, i + 1, f(i) ? result + i : result);
const immutableSummer = (f, n) => recursiveSummer(f, n, 1, 0);

/*
    Write a function called projectEulerProblem1UsingImmutableSummer 
    that uses your immutableSummer and isDivisibleByThreeOrFive to
    again solve Project Euler Problem 1.  It should be one line of code!
*/
const projectEulerProblem1UsingImmutableSummer = (_) =>
	immutableSummer(isDivisibleByThreeOrFive, 1000);
