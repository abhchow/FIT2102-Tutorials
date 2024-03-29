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
function padLeft(value: string, padding: number | string): string {
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
function curry<T, U, V>(f: (x: T, y: U) => V): (x: T) => (y: U) => V {
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
 * A function to convert to an array for easier visibility or debugging
 * @param list the list that will be converted
 * @param array the accumulated array
 */
function toArray<T>(list: Cons<T>, array: T[] = []): T[] {
	return rest(list)
		? toArray(rest(list), array.concat(head(list)))
		: array.concat(head(list));
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
 * Generates a new list by taking an operation on each element
 * @param f Function used for each element in the list
 * @param l the list being applied by f
 */
function map<T, V>(f: (_: T) => V, l: ConsList<T>): ConsList<V> {
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
function fromArray<T>(array: T[], l: ConsList<T> = null): ConsList<T> {
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
function reduce<T, U>(f: (x: T, y: U) => T, initial: T, list: ConsList<U>): T {
	return list ? reduce(f, f(initial, head(list)), rest(list)) : initial;
}

/**
 * Reduces the list from the right direction
 * @param f The function that reduces the list
 * @param initial the initial value (carries over through recursion)
 * @param list the list being reduced
 */
function reduceRight<T, U>(
	f: (x: T, y: U) => T,
	initial: T,
	list: ConsList<U>
): T {
	return list ? f(reduceRight(f, initial, rest(list)), head(list)) : initial;
}

/**
 * Deep clones a list
 * @param list the list being cloned
 */
function clone<T>(
	list: ConsList<T>,
	appendList: ConsList<T> = null,
	initial: ConsList<T> = null
): ConsList<T> {
	return list
		? cons(head(list), clone(rest(list), appendList, initial))
		: appendList;
}

/**
 * Concatenates two lists
 * @param leftList the left list
 * @param rightList the right list
 */
function concat<T>(leftList: ConsList<T>, rightList: ConsList<T>): ConsList<T> {
	return clone(leftList, clone(rightList));
}

/**
 * Filters the list
 * @param filterFunction A function that gives the criteria for each element to be kept in the new list
 * @param list the list being filtered
 * @param returnList the accumulated list
 */
function filter<T>(
	filterFunction: (n: T) => boolean,
	list: ConsList<T>,
	returnList: ConsList<T> = null
): ConsList<T> {
	return list
		? filter(
				filterFunction,
				rest(list),
				filterFunction(head(list))
					? concat(returnList, cons(head(list), null))
					: returnList
		  )
		: returnList;
}

/**
 * Reverses the elements in the list
 * @param list the list being reversed
 * @param returnList the accumulated reversed list
 */
function reverse<T>(
	list: ConsList<T>,
	returnList: ConsList<T> = null
): ConsList<T> {
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
class List<T> {
	private readonly head: ConsList<T>;

	constructor(list: T[] | ConsList<T> = []) {
		this.head = (list instanceof Array ? fromArray(list) : list) ?? null;
	}

	getHead(): ConsList<T> {
		return this.head;
	}

	/**
	 * create an array containing all the elements of this List
	 */
	toArray(): T[] {
		// Getting type errors here?
		// Make sure your type annotation for reduce()
		// in Exercise 3 is correct!
		return reduce((a, t) => [...a, t], <T[]>[], this.head);
	}

	// Add methods here:
	map<U>(f: (_: T) => U): List<U> {
		return new List(map(f, this.head));
	}

	isEmpty(): boolean {
		return this.head === null;
	}

	forEach<U>(f: (_: T) => U): List<T> {
		forEach(f, this.head);
		return this;
	}

	filter(f: (_: T) => boolean): List<T> {
		return new List(filter(f, this.head));
	}

	reduce<U>(f: (x: U, y: T) => U, initial: U): U {
		return reduce(f, initial, this.head);
	}

	concat(rightList: List<T>): List<T> {
		return new List(concat(this.head, rightList.getHead()));
	}
}

/*****************************************************************
 * Exercise 5
 */
type LineType = [number, string];
const line: (text: string) => LineType = (text) => [0, text];
const lineToList: (line: LineType) => List<LineType> = (line) =>
	new List([line]);

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

// example tree:
const myTree = new BinaryTreeNode(
	1,
	new BinaryTreeNode(2, new BinaryTreeNode(3)),
	new BinaryTreeNode(4)
);

const nest: (indent: number, layout: List<LineType>) => List<LineType> = (
	indent,
	layout
) => layout.map((x) => [x[0] + indent, x[1]]);

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

/*****************************************************************
 * Exercise 7: Implement prettyPrintNaryTree, which takes a NaryTree as input
 * and returns a list of the type expected by your nest function
 */

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

// Implement: function prettyPrintNaryTree(...)
function prettyPrintNaryTree<T>(
	node: NaryTree<T>,
	depth: number = 0
): List<LineType> {
	return node.children.reduce(
		(x, y) =>
			x.concat(
				!y.children.isEmpty()
					? prettyPrintNaryTree(y, depth + 1)
					: new List([[depth + 1, y.data.toString()]])
			),
		new List([[depth, node.data.toString()]])
	);
}

const test = new NaryTree(
	1,
	new List([
		new NaryTree(2),
		new NaryTree(3, new List([new NaryTree(4)])),
		new NaryTree(5),
	])
);

const outputNaryTree = prettyPrintNaryTree(naryTree)
	.map((aLine) => new Array(aLine[0] + 1).join("-") + aLine[1])
	.reduce((a, b) => a + "\n" + b, "")
	.trim();
console.log(outputNaryTree);

/*****************************************************************
 * Exercise 8 (Supplementary)
 */

type jsonTypes =
	| Array<jsonTypes>
	| { [key: string]: jsonTypes }
	| string
	| boolean
	| number
	| null;

const jsonPrettyToDoc: (json: jsonTypes) => List<[number, string]> = (json) => {
	if (Array.isArray(json)) {
		// Handle the Array case.
	} else if (typeof json === "object" && json !== null) {
		// Handle the object case.
		// Hint: use Object.keys(json) to get a list of
		// keys that the object has.
	} else if (typeof json === "string") {
		// Handle string case.
	} else if (typeof json === "number") {
		// Handle number
	} else if (typeof json === "boolean") {
		// Handle the boolean case
	} else if (json === null) {
		// Handle the null case
	}

	// Default case to fall back on.
	return new List<[number, string]>([]);
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
