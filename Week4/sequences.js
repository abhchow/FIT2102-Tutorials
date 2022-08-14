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
var IMPLEMENT_THIS = undefined;
// Implement the function:
function initSequence(transform) {
    return function _next(initialValue) {
        return {
            value: initialValue,
            next: function () { return _next(transform(initialValue)); }
        };
    };
}
/**
 *  Exercise 2 - map, filter, take, reduce
 */
function map(func, seq) {
    return {
        value: func(seq.value),
        next: function () { return map(func, seq.next()); }
    };
}
function filter(func, seq) {
    return func(seq.value)
        ? { value: seq.value, next: function () { return filter(func, seq.next()); } }
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
function take(n, seq) {
    if (n <= 0) {
        return undefined;
    }
    return {
        value: seq.value,
        /**
         * We have to cast the type here due to the limitations of the TypeScript type system.
         * If you have to type cast something, make sure to justify it in the comments.
         */
        next: function () { return take(n - 1, seq.next()); }
    };
}
/**
 * reduce a finite sequence to a value using the specified aggregation function
 * @param func aggregation function
 * @param seq either a sequence or undefined if we have reached the end of the sequence
 * @param start starting value of the reduction past as first parameter to first call of func
 */
function reduce(func, seq, start) {
    return seq === undefined
        ? start
        : reduce(func, seq.next(), func(start, seq.value));
}
function reduceRight(f, seq, start) {
    return seq === undefined
        ? start
        : f(reduceRight(f, seq.next(), start), seq.value);
}
/**
 *  Exercise 3 - Reduce Practice
 */
function maxNumber(lazyList) {
    // ******** YOUR CODE HERE ********
    // Use __only__ reduce on the
    // lazyList passed in. The lazyList
    // will terminate so don't use `take`
    // inside this function body.
    return IMPLEMENT_THIS;
}
function lengthOfSequence(lazyList) {
    // ******** YOUR CODE HERE ********
    // Again only use reduce and don't
    // use `take` inside this function.
    return IMPLEMENT_THIS;
}
function toArray(seq) {
    // ******** YOUR CODE HERE ********
    // Again only use reduce and don't
    // use `take` inside this function.
    return IMPLEMENT_THIS;
}
/**
 *  Exercise 4 - Lazy Pi Approximations
 */
function exercise4Solution(seriesLength) {
    // Your solution using lazy lists.
    // Use `take` to only take the right amount of the infinite list.
    return IMPLEMENT_THIS;
}
