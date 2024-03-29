/**
 * Surname     | First name | email                       | Contribution% | Any issues?
 * ===================================================================================
 * Chow        | Albert    | acho0023@student.monash.edu | 25%           |
 * Putamorsi   | Max       | mput0002@student.monash.edu | 25%           |
 * Ongko       | Timothy   | tong0006@student.monash.edu | 25%           |
 * Ibrahim     | Hassan    | ihas0001@student.monash.edu | 25%           |
 *
 * Please do not hesitate to contact your tutors if there are
 * issues that you cannot resolve within the group.
 *
 * Complete Worksheet 4 by entering code in the places marked below...
 *
 * For full instructions and tests open the file worksheetChecklist.html
 * in Chrome browser.  Keep it open side-by-side with your editor window.
 * You will edit this file (main.ts), save it, build it, and reload the
 * browser window to run the test.
 */

/**
 * Replace references to IMPLEMENT_THIS with your code!
 */
const IMPLEMENT_THIS: any = undefined;

/**
 *  Exercise 1 - General Purpose infinite sequence function
 */

interface LazySequence<T> {
	value: T;
	next(): LazySequence<T>;
}

// Implement the function:
function initSequence<T>(
	transform: (value: T) => T
): (initialValue: T) => LazySequence<T> {
	return function _next(initialValue: T) {
		return {
			value: initialValue,
			next: () => _next(transform(initialValue)),
		};
	};
}

/**
 *  Exercise 2 - map, filter, take, reduce
 */

function map<T, V>(func: (v: T) => V, seq: LazySequence<T>): LazySequence<V> {
	return {
		value: func(seq.value),
		next: () => map(func, seq.next()),
	};
}

function filter<T>(
	func: (v: T) => boolean,
	seq: LazySequence<T>
): LazySequence<T> {
	return func(seq.value)
		? { value: seq.value, next: () => filter(func, seq.next()) }
		: filter(func, seq.next());
}

/**
 * Creates a sequence of finite length (terminated by undefined) from a longer or infinite sequence.
 * Take returns a sequence that contains the specified number of elements of the sequence, and then 'undefined'.
 * That is, the next attribute of the last element in the returned sequence, will be a function that returns 'undefined'.
 *
 * @param n number of elements to return before returning undefined
 * @param seq the sequence
 */
function take<T>(n: number, seq: LazySequence<T>): LazySequence<T> | undefined {
	if (n <= 0) {
		return undefined;
	}

	return {
		value: seq.value,
		/**
		 * We have to cast the type here due to the limitations of the TypeScript type system.
		 * If you have to type cast something, make sure to justify it in the comments.
		 */
		next: () => take(n - 1, seq.next()) as LazySequence<T>,
	};
}

/**
 * reduce a finite sequence to a value using the specified aggregation function
 * @param func aggregation function
 * @param seq either a sequence or undefined if we have reached the end of the sequence
 * @param start starting value of the reduction past as first parameter to first call of func
 */
function reduce<T, V>(
	func: (_: V, x: T) => V,
	seq: LazySequence<T> | undefined,
	start: V
): V {
	return seq === undefined
		? start
		: reduce(func, seq.next(), func(start, seq.value));
}

function reduceRight<T, V>(
	f: (_: V, x: T) => V,
	seq: LazySequence<T> | undefined,
	start: V
): V {
	return seq === undefined
		? start
		: f(reduceRight(f, seq.next(), start), seq.value);
}

/**
 *  Exercise 3 - Reduce Practice
 */

function maxNumber(lazyList: LazySequence<number>): number {
	// ******** YOUR CODE HERE ********
	// Use __only__ reduce on the
	// lazyList passed in. The lazyList
	// will terminate so don't use `take`
	// inside this function body.
	return reduce((x, y) => (x < y ? y : x), lazyList, 0);
}

function lengthOfSequence(lazyList: LazySequence<any>): number {
	// ******** YOUR CODE HERE ********
	// Again only use reduce and don't
	// use `take` inside this function.
	return reduce((x, _) => x + 1, lazyList, 0);
}

function toArray<T>(seq: LazySequence<T>): T[] {
	// ******** YOUR CODE HERE ********
	// Again only use reduce and don't
	// use `take` inside this function.
	return reduce((x: T[], y) => x.concat(y), seq, []);
}

/**
 *  Exercise 4 - Lazy Pi Approximations
 */
function pi4Term(n: number) {
	return ((-1) ** (n + 1) * 1) / (2 * n - 1);
}

function pi4Approx(): LazySequence<number> {
	return (function _next(term: number, value: number): LazySequence<number> {
		return {
			value: value,
			next: () => _next(term + 1, value + pi4Term(term + 1)),
		};
	})(1, 1);
}

function takeLastTerm<T>(
	seq: LazySequence<T> | undefined,
	returnValue: T | null = null
): T | null {
	return seq === undefined
		? returnValue
		: takeLastTerm(seq.next(), seq.value);
}

function exercise4Solution(seriesLength: number): number {
	// Your solution using lazy lists.
	// Use `take` to only take the right amount of the infinite list.

	// Casting needed her as TS doesn't know when it will null or a number, however, we always know it will be a number
	// given that the series isn't undefined to begin with (will be null when seriesLength = 0).
	return takeLastTerm(take(seriesLength, pi4Approx())) as number;
}
