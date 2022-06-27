/* 
Complete the following table when you submit this file:

Surname     | Firstname | email                       | Contribution% | Any issues?
=============================================================
Chow        | Albert    | acho0023@student.monash.edu | 25%           |
Hunt        | Ethan     | ehun0006@student.monash.edu | 25%           |
Geeson      | Madison   | mgee0003@student.monash.edu | 25%           |
Buckeridge  | Sophie    | sbuc0005@student.monash.edu | 25%           |

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
// your first line of code here...
let aVariable = 1;

/*
    Create an immutable variable called ‘aConst’ and assign its value to aVariable + 1.
*/
// your second line of code here...
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
function projectEulerProblem1(max=1000, div1=3, div2=5) {
    // quot1 = Math.floor((max-1)/div1) ;
    // quot2 = Math.floor((max-1)/div2) ;
    // quot3 = Math.floor((max-1)/(div1*div2)) ;

    // return (quot1*(quot1+1)*div1 + quot2*(quot2+1)*div2 - quot3*(quot3+1)*div1*div2)/2;

    // Alternative approach:
    let sum = 0;
    let i = 0;
    while (i < max) {
        (i%div1 == 0 || i%div2 == 0) ? sum += i : sum += 0;
        i += 1;
    }
    return sum;
}

/**
    Exercise 4:
    Write a function called ‘alwaysTrue’ which always returns true, no matter what argument it is given.
*/

// function alwaysTrue() {return true}
const alwaysTrue = (_=0) => true;


/**
    Write a function called imperativeSummer that takes two parameters: a function f, and a number n.  
    It should use an imperative loop to sum over the numbers from 1 up to (but not including) n,
    including the number x in the sum only if f(x) is true.
*/

function imperativeSummer(f,n) {
    let sum=0;
    for (let i=1; i<n; i++) {
        f(i) ? sum += i : sum += 0;
    }
    return sum;
}

/**
    Write a function called sumTo that takes as parameter a number n and
    uses imperativeSummer and alwaysTrue to calculate the sum of all numbers
    from 1 up to (but not including) n.
*/

const sumTo = (n) => imperativeSummer(alwaysTrue,n);

/**
    Write a function called ‘isDivisibleByThreeOrFive’ which takes a number as parameter,
    tests if it is divisible by 3 or 5, returning true if it is.
*/

const isDivisibleByThreeOrFive = (num, div1=3, div2=5) => (num%div1 == 0 || num%div2 == 0);

/**
    Write a function called projectEulerProblem1UsingImperativeSummer 
    that uses your imperativeSummer and isDivisibleByThreeOrFive to
    again solve Project Euler Problem 1.  It should be one line of code!
*/

const projectEulerProblem1UsingImperativeSummer = (num=1000) => imperativeSummer(isDivisibleByThreeOrFive, num);

/**
    Exercise 5:
    Write a function called 'immutableSummer' with parameters f and n, which computes the sum of numbers
    from 1 up to (but not including) n that satisfy f, but does *not* use while,
    for or any mutable variables (defined with let or var).
    Hint: use recursion!
*/

const immutableSummer = (f, n) => n-1 > 0 ? (f(n-1) ? immutableSummer(f, n-1) + n-1 : immutableSummer(f, n-1)) : 0;

/*
    Write a function called projectEulerProblem1UsingImmutableSummer 
    that uses your immutableSummer and isDivisibleByThreeOrFive to
    again solve Project Euler Problem 1.  It should be one line of code!
*/

const projectEulerProblem1UsingImmutableSummer = (num=1000) => immutableSummer(isDivisibleByThreeOrFive, num);