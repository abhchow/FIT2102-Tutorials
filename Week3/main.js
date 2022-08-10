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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// Stub value to indicate an implementation
var IMPLEMENT_THIS = undefined;
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
    throw new Error("Expected string or number, got '".concat(padding, "'."));
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
    return function (selector) { return selector(head, rest); };
}
/**
 * head selector, returns the first element in the list
 * @param list is a Cons (note, not an empty ConsList)
 */
function head(list) {
    if (!list)
        throw new TypeError("list is null");
    return list(function (head, rest) { return head; });
}
/**
 * rest selector, everything but the head
 * @param list is a Cons (note, not an empty ConsList)
 */
function rest(list) {
    if (!list)
        throw new TypeError("list is null");
    return list(function (head, rest) { return rest; });
}
/**
 * A function to convert to an array for easier visibility or debugging
 * @param list the list that will be converted
 * @param array the accumulated array
 */
function toArray(list, array) {
    if (array === void 0) { array = []; }
    return rest(list)
        ? toArray(rest(list), array.concat(head(list)))
        : array.concat(head(list));
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
 * Generates a new list by taking an operation on each element
 * @param f Function used for each element in the list
 * @param l the list being applied by f
 */
function map(f, l) {
    return l ? cons(f(head(l)), map(f, rest(l))) : null;
}
/*****************************************************************
 * Exercise 3
 */
/**
 * Converts an array into a list
 * @param array The array being converted
 * @param l the list being generated
 */
function fromArray(array, l) {
    if (l === void 0) { l = null; }
    return array.length === 0
        ? l
        : cons(array[0], fromArray(array.slice(1), l));
}
/**
 * Reduces the list
 * @param f The function that reduces the list
 * @param initial the initial value (carries over through recursion)
 * @param list the list being reduced
 */
function reduce(f, initial, list) {
    return list ? reduce(f, f(initial, head(list)), rest(list)) : initial;
}
/**
 * Reduces the list from the right direction
 * @param f The function that reduces the list
 * @param initial the initial value (carries over through recursion)
 * @param list the list being reduced
 */
function reduceRight(f, initial, list) {
    return list ? f(reduceRight(f, initial, rest(list)), head(list)) : initial;
}
/**
 * Deep clones a list
 * @param list the list being cloned
 */
function clone(list, appendList, initial) {
    if (appendList === void 0) { appendList = null; }
    if (initial === void 0) { initial = null; }
    return list
        ? cons(head(list), clone(rest(list), appendList, initial))
        : appendList;
}
/**
 * Concatenates two lists
 * @param leftList the left list
 * @param rightList the right list
 */
function concat(leftList, rightList) {
    return clone(leftList, clone(rightList));
}
/**
 * Filters the list
 * @param filterFunction A function that gives the criteria for each element to be kept in the new list
 * @param list the list being filtered
 * @param returnList the accumulated list
 */
function filter(filterFunction, list, returnList) {
    if (returnList === void 0) { returnList = null; }
    return list
        ? filter(filterFunction, rest(list), filterFunction(head(list))
            ? cons(head(list), returnList)
            : returnList)
        : returnList;
}
/**
 * Reverses the elements in the list
 * @param list the list being reversed
 * @param returnList the accumulated reversed list
 */
function reverse(list, returnList) {
    if (returnList === void 0) { returnList = null; }
    return list
        ? reverse(rest(list), concat(cons(head(list), null), returnList))
        : returnList;
}
/*****************************************************************
 * Exercise 4
 *
 * Tip: Use the functions in exercise 3!
 */
/**
 * A linked list backed by a ConsList
 */
var List = /** @class */ (function () {
    function List(list) {
        var _a;
        this.head = (_a = (list instanceof Array ? fromArray(list) : list)) !== null && _a !== void 0 ? _a : null;
    }
    /**
     * create an array containing all the elements of this List
     */
    List.prototype.toArray = function () {
        // Getting type errors here?
        // Make sure your type annotation for reduce()
        // in Exercise 3 is correct!
        return reduce(function (a, t) { return __spreadArray(__spreadArray([], a, true), [t], false); }, [], this.head);
    };
    List.prototype.map = function (f) {
        return map(f, this.head);
    };
    List.prototype.forEach = function (f) {
        forEach(f, this.head);
    };
    List.prototype.filter = function (f) {
        return filter(f, this.head);
    };
    List.prototype.reduce = function (f, initial) {
        return reduce(f, initial, this.head);
    };
    List.prototype.concat = function (rightList) {
        return clone(this.head, clone(rightList));
    };
    return List;
}());
var BinaryTreeNode = /** @class */ (function () {
    function BinaryTreeNode(data, leftChild, rightChild) {
        this.data = data;
        this.leftChild = leftChild;
        this.rightChild = rightChild;
    }
    return BinaryTreeNode;
}());
// example tree:
var myTree = new BinaryTreeNode(1, new BinaryTreeNode(2, new BinaryTreeNode(3)), new BinaryTreeNode(4));
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
/*****************************************************************
 * Exercise 7: Implement prettyPrintNaryTree, which takes a NaryTree as input
 * and returns a list of the type expected by your nest function
 */
var NaryTree = /** @class */ (function () {
    function NaryTree(data, children) {
        if (children === void 0) { children = new List(undefined); }
        this.data = data;
        this.children = children;
    }
    return NaryTree;
}());
// Example tree for you to print:
var naryTree = new NaryTree(1, new List([
    new NaryTree(2),
    new NaryTree(3, new List([new NaryTree(4)])),
    new NaryTree(5),
]));
// Implement: function prettyPrintNaryTree(...)
function prettyPrintNaryTree(node) {
    return IMPLEMENT_THIS;
}
var jsonPrettyToDoc = function (json) {
    if (Array.isArray(json)) {
        // Handle the Array case.
    }
    else if (typeof json === "object" && json !== null) {
        // Handle the object case.
        // Hint: use Object.keys(json) to get a list of
        // keys that the object has.
    }
    else if (typeof json === "string") {
        // Handle string case.
    }
    else if (typeof json === "number") {
        // Handle number
    }
    else if (typeof json === "boolean") {
        // Handle the boolean case
    }
    else if (json === null) {
        // Handle the null case
    }
    // Default case to fall back on.
    return new List([]);
};
// *** uncomment the following code once you are ready to test your implemented jsonPrettyToDoc ***
// const json = {
//     unit: "FIT2102",
//     year: 2021,
//     semester: "S2",
//     active: true,
//     assessments: {"week1": null as null, "week2": "Tutorial 1 Exercise", "week3": "Tutorial 2 Exercise"},
//     languages: ["Javascript", "Typescript", "Haskell", "Minizinc"]
// }
//
// function lineIndented(aLine: [number, string]): string {
//     return new Array(aLine[0] + 1).join('    ') + aLine[1];
// }
//
// function appendLine(acc: string, nextLine: string): string {
//     return nextLine.slice(-1) === "," ? acc + nextLine.trim() :
//            acc.slice(-1) === ":"      ? acc + " " + nextLine.trim() :
//            acc + '\n' + nextLine;
// }
//
// console.log(jsonPrettyToDoc(json)
//               .map(lineIndented)
//               .reduce(appendLine, '').trim());
// *** This is what it should look like in the console ***
//
// {
//     unit: FIT2102,
//     year: 2021,
//     semester: S2,
//     active: true,
//     assessments: {
//         week1: null,
//         week2: Tutorial 1 Exercise,
//         week3: Tutorial 2 Exercise
//     },
//     languages: [
//         Javascript,
//         Typescript,
//         Haskell,
//         Minizinc
//     ]
// }
