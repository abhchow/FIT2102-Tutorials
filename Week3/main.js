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
const IMPLEMENT_THIS = undefined;
/*****************************************************************
 * Exercise 1
 */
function addStuff(a, b) {
    return a + b;
}
function numberToString(input) {
    return JSON.stringify(input);
}
/**
 * Takes a string and adds "padding" to the left.
 * If 'padding' is a string, then 'padding' is appended to the left side.
 * If 'padding' is a number, then that number of spaces is added to the left side.
 */
function padLeft(value, padding) {
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
function curry(f) {
    return function (x) {
        return function (y) {
            return f(x, y);
        };
    };
}
/**
 * cons "constructs" a list node, if no second argument is specified it is the last node in the list
 */
function cons(head, rest) {
    return (selector) => selector(head, rest);
}
/**
 * head selector, returns the first element in the list
 * @param list is a Cons (note, not an empty ConsList)
 */
function head(list) {
    if (!list)
        throw new TypeError("list is null");
    return list((head, rest) => head);
}
/**
 * rest selector, everything but the head
 * @param list is a Cons (note, not an empty ConsList)
 */
function rest(list) {
    if (!list)
        throw new TypeError("list is null");
    return list((head, rest) => rest);
}
/**
 * Use this as an example for other functions!
 * @param f Function to use for each element
 * @param list Cons list
 */
function forEach(f, list) {
    if (list) {
        f(head(list));
        forEach(f, rest(list));
    }
}
/**
 * Implement this function! Also, complete this documentation (see forEach).
 */
function map(f, l) {
    // return IMPLEMENT_THIS;
    if (l) {
        return cons(f(head(l)), map(f, rest(l)));
    }
    else {
        return null;
    }
}
/*****************************************************************
 * Exercise 3
 */
function fromArray(arr) {
    function fromArrayAux(arr, i, n) {
        return i < n ? cons(arr[i], fromArrayAux(arr, i + 1, n)) : null;
    }
    return fromArrayAux(arr, 0, arr.length);
}
function reduce(f, init, list) {
    return list ? reduce(f, f(init, head(list)), rest(list)) : init;
}
function reduceRightOld(f, init, list) {
    return rest(list)
        ? f(reduceRightOld(f, init, rest(list)), head(list))
        : f(init, head(list));
}
// is there a way to do this tail recursively? don't think so directly.
// need to read every node to know what to calculate at each step
// but we can split up the tasks:
// read everything first, put it in the order we want to calculate things, then reduce tail recursively
// ie just reverse then reduce
function reduceRight(f, init, list) {
    return reduce(f, init, reverse(list));
}
function filter(f, list) {
    return list
        ? f(head(list))
            ? cons(head(list), filter(f, rest(list)))
            : filter(f, rest(list))
        : null;
}
function concat(list1, list2) {
    return list1
        ? cons(head(list1), concat(rest(list1), list2))
        : list2
            ? cons(head(list2), concat(list1, rest(list2)))
            : null;
}
function reverse(list) {
    function reverseHelper(list, prevCons) {
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
function countLetters(stringArray) {
    const list = fromArray(stringArray);
    return reduce((len, s) => len + s.length, 0, list);
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
class List {
    constructor(list) {
        if (list instanceof Array) {
            this.head = fromArray(list);
        }
        else {
            // nullish coalescing operator
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator
            this.head = list !== null && list !== void 0 ? list : null;
        }
    }
    /**
     * create an array containing all the elements of this List
     */
    toArray() {
        return reduce((a, t) => [...a, t], [], this.head);
    }
    // Add methods here:
    forEach(f) {
        forEach(f, this.head);
        return this.map((x) => x);
    }
    filter(f) {
        return new List(filter(f, this.head));
    }
    map(f) {
        return new List(map(f, this.head));
    }
    reduce(f, init) {
        return reduce(f, init, this.head);
    }
    concat(list) {
        return new List(concat(this.head, list.head));
    }
}
/*****************************************************************
 * Exercise 5
 */
const line = (str) => [0, str];
function lineToList(line) {
    return new List([line]);
}
class BinaryTreeNode {
    constructor(data, leftChild, rightChild) {
        this.data = data;
        this.leftChild = leftChild;
        this.rightChild = rightChild;
    }
}
// example tree:
const myTree = new BinaryTreeNode(1, new BinaryTreeNode(2, new BinaryTreeNode(3)), new BinaryTreeNode(4));
// *** uncomment the following code once you have implemented List and nest function (above) ***
// function prettyPrintBinaryTree<T>(node: BinaryTree<T>): List<[number, string]> {
//     if (!node) {
//         return new List<[number, string]>([])
//     }
//     const thisLine = lineToList(line(node.data.toString())),
//           leftLines = prettyPrintBinaryTree(node.leftChild),
//           rightLines = prettyPrintBinaryTree(node.rightChild);
//     return thisLine.concat(nest(1, leftLines.concat(rightLines)))
// }
// const output = prettyPrintBinaryTree(myTree)
//                     .map(aLine => new Array(aLine[0] + 1).join('-') + aLine[1])
//                     .reduce((a,b) => a + '\n' + b, '').trim();
// console.log(output);
// /*****************************************************************
//  * Exercise 7: Implement prettyPrintNaryTree, which takes a NaryTree as input
//  * and returns a list of the type expected by your nest function
//  */
// class NaryTree<T> {
//   constructor(
//     public data: T,
//     public children: List<NaryTree<T>> = new List(undefined)
//   ) {}
// }
// // Example tree for you to print:
// const naryTree = new NaryTree(
//   1,
//   new List([
//     new NaryTree(2),
//     new NaryTree(3, new List([new NaryTree(4)])),
//     new NaryTree(5),
//   ])
// );
// // Implement: function prettyPrintNaryTree(...)
// function prettyPrintNaryTree<T>(node: NaryTree<T>): List<[number, string]> {
//   return IMPLEMENT_THIS;
// }
// // *** uncomment the following code once you have implemented prettyPrintNaryTree (above) ***
// //
// // const outputNaryTree = prettyPrintNaryTree(naryTree)
// //                     .map(aLine => new Array(aLine[0] + 1).join('-') + aLine[1])
// //                     .reduce((a,b) => a + '\n' + b, '').trim();
// // console.log(outputNaryTree);
// /*****************************************************************
//  * Exercise 8 (Supplementary)
//  */
// type jsonTypes =
//   | Array<jsonTypes>
//   | { [key: string]: jsonTypes }
//   | string
//   | boolean
//   | number
//   | null;
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
//# sourceMappingURL=main.js.map