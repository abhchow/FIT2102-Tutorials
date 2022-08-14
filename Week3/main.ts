/**
 * Surname     | Firstname | email                       | Contribution% | Any issues?
 * ===================================================================================
 * Chow        | Albert    | acho0023@student.monash.edu | 25%           |
 * Putamorsi   | Max       | mput0002@student.monash.edu | 25%           |
 * Ongko       | Timothy   | tong0006@student.monash.edu | 25%           |
 * Ibrahim     | Hassan    | ihas0001@student.monash.edu | 25%           |
 *
 * Please do not hesitate to contact your tutors if there are
 * issues that you cannot resolve within the group.
 *
 * Complete the worksheet by entering code in the places marked below...
 *
 * For full instructions and tests open the file worksheetChecklist.html
 * in Chrome browser.  Keep it open side-by-side with your editor window.
 * You will edit this file, save it, compile it, and reload the
 * browser window to run the test.
 */

// Stub value to indicate an implementation
const IMPLEMENT_THIS: any = undefined;

/*****************************************************************
 * Exercise 1
 */

function addStuff(a: number, b: number): number {
    return a + b;
}
function numberToString(input: number): string {
    return JSON.stringify(input);
}

/**
 * Takes a string and adds "padding" to the left.
 * If 'padding' is a string, then 'padding' is appended to the left side.
 * If 'padding' is a number, then that number of spaces is added to the left side.
 */
function padLeft(value: string, padding: number) {
    if (typeof padding === "number") {
        return Array(padding + 1).join(" ") + value;
    }
    if (typeof padding === "string") {
        return padding + value;
    }
    throw new Error(`Expected string or number, got '${padding}'.`);
}

padLeft("Hello world", 4); // returns "    Hello world"

// What's the type of arg0 and arg1?
function curry<T, U, V>(f: (arg0: T, arg1: U) => V) {
    return function (x: T) {
        return function (y: U) {
            return f(x, y);
        };
    };
}

/*****************************************************************
 * Exercise 2: implement the map function for the cons list below
 */

/**
 * A ConsList is either a function created by cons, or empty (null)
 */
type ConsList<T> = Cons<T> | null;

/**
 * The return type of the cons function, is itself a function
 * which can be given a selector function to pull out either the head or rest
 */
type Cons<T> = (selector: Selector<T>) => T | ConsList<T>;

/**
 * a selector will return either the head or rest
 */
type Selector<T> = (head: T, rest: ConsList<T>) => T | ConsList<T>;

/**
 * cons "constructs" a list node, if no second argument is specified it is the last node in the list
 */
function cons<T>(head: T, rest: ConsList<T>): Cons<T> {
    return (selector: Selector<T>) => selector(head, rest);
}

/**
 * head selector, returns the first element in the list
 * @param list is a Cons (note, not an empty ConsList)
 */
function head<T>(list: Cons<T>): T {
    if (!list) throw new TypeError("list is null");
    return <T>list((head, rest?) => head);
}

/**
 * rest selector, everything but the head
 * @param list is a Cons (note, not an empty ConsList)
 */
function rest<T>(list: Cons<T>): ConsList<T> {
    if (!list) throw new TypeError("list is null");
    return <Cons<T>>list((head, rest?) => rest);
}

/**
 * Use this as an example for other functions!
 * @param f Function to use for each element
 * @param list Cons list
 */
function forEach<T>(f: (_: T) => void, list: ConsList<T>): void {
    if (list) {
        f(head(list));
        forEach(f, rest(list));
    }
}

/**
 * Implement this function! Also, complete this documentation (see forEach).
 */
function map<T, V>(f: (_: T) => V, l: ConsList<T>): ConsList<V> {
    // return IMPLEMENT_THIS;
    if (l) {
        return <Cons<V>>cons(f(head(l)), map(f, rest(l)));
    } else {
        return null;
    }
}

/*****************************************************************
 * Exercise 3
 */

function fromArray<T>(arr: T[]): ConsList<T> {
    function fromArrayAux(arr: T[], i: number, n: number): ConsList<T> {
        return i < n ? cons(arr[i], fromArrayAux(arr, i + 1, n)) : null;
    }
    return fromArrayAux(arr, 0, arr.length);
}

function reduce<T, V>(f: (acc: V, val: T) => V, init: V, list: ConsList<T>): V {
    return list ? reduce(f, f(init, head(list)), rest(list)) : init;
}

function reduceRightOld<T, V>(
    f: (acc: V, val: T) => V,
    init: V,
    list: ConsList<T>
): V {
    return rest(list)
        ? f(reduceRightOld(f, init, rest(list)), head(list))
        : f(init, head(list));
}
// is there a way to do this tail recursively? don't think so directly.
// need to read every node to know what to calculate at each step
// but we can split up the tasks:
// read everything first, put it in the order we want to calculate things, then reduce tail recursively
// ie just reverse then reduce

function reduceRight<T, V>(
    f: (acc: V, val: T) => V,
    init: V,
    list: ConsList<T>
): V {
    return reduce(f, init, reverse(list));
}

function filter<T>(f: (val: T) => Boolean, list: ConsList<T>): ConsList<T> {
    return list
        ? f(head(list))
            ? cons(head(list), filter(f, rest(list)))
            : filter(f, rest(list))
        : null;
}

function concat<T>(list1: ConsList<T>, list2: ConsList<T>): ConsList<T> {
    return list1 ? cons(head(list1), concat(rest(list1), list2)) : list2;
}

function reverse<T>(list: ConsList<T>): ConsList<T> {
    function reverseHelper<T>(
        list: ConsList<T>,
        prevCons: ConsList<T>
    ): ConsList<T> {
        return list
            ? reverseHelper(rest(list), cons(head(list), prevCons))
            : prevCons;
    }
    // create some cons(currVal, prevCons)
    // pass it to the next recursive call
    // at the end don't pass it to another recursive call, just return the prevCons
    // prevCons initialised at null, then each recursive call prepends to the prevCons

    return reverseHelper(list, null);
}

// Example use of reduce
function countLetters(stringArray: string[]): number {
    const list = fromArray(stringArray);
    return reduce((len: number, s: string) => len + s.length, 0, list);
}
console.log(countLetters(["Hello", "there!"]));

/*****************************************************************
 * Exercise 4
 *
 * Tip: Use the functions in exercise 3!
 */

/**
 * A linked list backed by a ConsList
 */
class List<T> {
    private readonly head: ConsList<T>;

    constructor(list: T[] | ConsList<T>) {
        if (list instanceof Array) {
            this.head = fromArray(list);
        } else {
            // nullish coalescing operator
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator
            this.head = list ?? null;
        }
    }

    /**
     * create an array containing all the elements of this List
     */
    toArray(): T[] {
        return reduce((a, t) => [...a, t], <T[]>[], this.head);
    }

    // Add methods here:
    forEach(f: (_: T) => void): List<T> {
        forEach(f, this.head);
        return this.map((x) => x);
    }

    filter(f: (val: T) => Boolean): List<T> {
        return new List(filter(f, this.head));
    }

    map<V>(f: (_: T) => V): List<V> {
        return new List(map(f, this.head));
    }

    reduce<V>(f: (acc: V, val: T) => V, init: V): V {
        return reduce(f, init, this.head);
    }

    concat(list: List<T>): List<T> {
        return new List(concat(this.head, list.head));
    }
}

/*****************************************************************
 * Exercise 5
 */
const line: (str: string) => [indent: number, str: string] = (str) => [0, str];

function lineToList(line: [number, string]): List<[number, string]> {
    return new List([line]);
}
/*****************************************************************
 * Exercise 6
 */

type BinaryTree<T> = BinaryTreeNode<T> | undefined;

class BinaryTreeNode<T> {
    constructor(
        public readonly data: T,
        public readonly leftChild?: BinaryTree<T>,
        public readonly rightChild?: BinaryTree<T>
    ) {}
}

function nest(
    indent: number,
    layout: List<[number, string]>
): List<[number, string]> {
    return layout.map((pair) => [pair[0] + indent, pair[1]]);
}

// example tree:
const myTree = new BinaryTreeNode(
    1,
    new BinaryTreeNode(2, new BinaryTreeNode(3)),
    new BinaryTreeNode(4)
);

// *** uncomment the following code once you have implemented List and nest function (above) ***

function prettyPrintBinaryTree<T>(node: BinaryTree<T>): List<[number, string]> {
    if (!node) {
        return new List<[number, string]>([]);
    }
    const thisLine = lineToList(line(node.data.toString())),
        leftLines = prettyPrintBinaryTree(node.leftChild),
        rightLines = prettyPrintBinaryTree(node.rightChild);
    return thisLine.concat(nest(1, leftLines.concat(rightLines)));
}

const output = prettyPrintBinaryTree(myTree)
    .map((aLine) => new Array(aLine[0] + 1).join("-") + aLine[1])
    .reduce((a, b) => a + "\n" + b, "")
    .trim();
console.log(output);

// /*****************************************************************
//  * Exercise 7: Implement prettyPrintNaryTree, which takes a NaryTree as input
//  * and returns a list of the type expected by your nest function
//  */

class NaryTree<T> {
    constructor(
        public data: T,
        public children: List<NaryTree<T>> = new List(undefined)
    ) {}
}

// Example tree for you to print:
const naryTree = new NaryTree(
    1,
    new List([
        new NaryTree(2),
        new NaryTree(3, new List([new NaryTree(4)])),
        new NaryTree(5),
    ])
);

// wrapper function for List to be able to pass it to reduce. Makes it a function of two List types
// function concatList<T>(list1: List<T>, list2: List<T>): List<T> {
//     return list1.concat(list2);
// }

// Implement: function prettyPrintNaryTree(...)
function prettyPrintNaryTree<T>(node: NaryTree<T>): List<[number, string]> {
    if (!node) {
        return new List<[number, string]>([]);
    }
    const thisLine = lineToList(line(node.data.toString())),
        // leftLines = prettyPrintBinaryTree(node.leftChild),
        // rightLines = prettyPrintBinaryTree(node.rightChild);
        childLines = node.children.map(prettyPrintNaryTree);
    // return thisLine.concat(nest(1, leftLines.concat(rightLines)));
    return thisLine.concat(
        // nest(1, childLines.reduce(concatList, new List<[number, string]>([])))
        nest(
            1,
            childLines.reduce(
                (list1, list2) => list1.concat(list2),
                new List<[number, string]>([])
            )
        )
    );
}

// *** uncomment the following code once you have implemented prettyPrintNaryTree (above) ***
const outputNaryTree = prettyPrintNaryTree(naryTree)
    .map((aLine) => new Array(aLine[0] + 1).join("-") + aLine[1])
    .reduce((a, b) => a + "\n" + b, "")
    .trim();
console.log(outputNaryTree);

// /*****************************************************************
//  * Exercise 8 (Supplementary)
//  */

type jsonTypes =
    | Array<jsonTypes>
    | { [key: string]: jsonTypes }
    | string
    | boolean
    | number
    | null;

// const jsonPrettyToDoc: (json: jsonTypes) => List<[number, string]> = (json) => {
//   if (Array.isArray(json)) {
//     // Handle the Array case.
//   } else if (typeof json === "object" && json !== null) {
//     // Handle the object case.
//     // Hint: use Object.keys(json) to get a list of
//     // keys that the object has.
//   } else if (typeof json === "string") {
//     // Handle string case.
//   } else if (typeof json === "number") {
//     // Handle number
//   } else if (typeof json === "boolean") {
//     // Handle the boolean case
//   } else if (json === null) {
//     // Handle the null case
//   }

//   // Default case to fall back on.
//   return new List<[number, string]>([]);
// };

// // *** uncomment the following code once you are ready to test your implemented jsonPrettyToDoc ***
// // const json = {
// //     unit: "FIT2102",
// //     year: 2021,
// //     semester: "S2",
// //     active: true,
// //     assessments: {"week1": null as null, "week2": "Tutorial 1 Exercise", "week3": "Tutorial 2 Exercise"},
// //     languages: ["Javascript", "Typescript", "Haskell", "Minizinc"]
// // }
// //
// // function lineIndented(aLine: [number, string]): string {
// //     return new Array(aLine[0] + 1).join('    ') + aLine[1];
// // }
// //
// // function appendLine(acc: string, nextLine: string): string {
// //     return nextLine.slice(-1) === "," ? acc + nextLine.trim() :
// //            acc.slice(-1) === ":"      ? acc + " " + nextLine.trim() :
// //            acc + '\n' + nextLine;
// // }
// //
// // console.log(jsonPrettyToDoc(json)
// //               .map(lineIndented)
// //               .reduce(appendLine, '').trim());

// // *** This is what it should look like in the console ***
// //
// // {
// //     unit: FIT2102,
// //     year: 2021,
// //     semester: S2,
// //     active: true,
// //     assessments: {
// //         week1: null,
// //         week2: Tutorial 1 Exercise,
// //         week3: Tutorial 2 Exercise
// //     },
// //     languages: [
// //         Javascript,
// //         Typescript,
// //         Haskell,
// //         Minizinc
// //     ]
// }
