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
 * Complete Worksheet 4/5 by entering code in the places marked below...
 *
 * For full instructions and tests open the file observableexamples.html
 * in Chrome browser.  Keep it open side-by-side with your editor window.
 * You will edit this file (observableexamples.ts), save it, build it, and reload the
 * browser window to run the test.
 */

import { interval, fromEvent, zip } from "rxjs";
import { map, filter, scan } from "rxjs/operators";

// Simple demonstration
// ===========================================================================================
// ===========================================================================================
/**
 * an example of traditional event driven programming style - this is what we are
 * replacing with observable.
 * The following adds a listener for the mouse event
 * handler, sets p and adds or removes a highlight depending on x position
 */
function mousePosEvents() {
	const pos = document.getElementById("pos")!;

	document.addEventListener("mousemove", ({ clientX, clientY }) => {
		const p = clientX + ", " + clientY;
		pos.innerHTML = p;
		if (clientX > 400) {
			pos.classList.add("highlight");
		} else {
			pos.classList.remove("highlight");
		}
	});
}

/**
 * constructs an Observable event stream with three branches:
 *   Observable<x,y>
 *    |- set <p>
 *    |- add highlight
 *    |- remove highlight
 */
function mousePosObservable() {
	const pos = document.getElementById("pos")!,
		o = fromEvent<MouseEvent>(document, "mousemove").pipe(
			map(({ clientX, clientY }) => ({ x: clientX, y: clientY }))
		);

	o.pipe(map(({ x, y }) => `${x},${y}`)).subscribe(
		(s: string) => (pos.innerHTML = s)
	);

	o.pipe(filter(({ x }) => x > 400)).subscribe((_) =>
		pos.classList.add("highlight")
	);

	o.pipe(filter(({ x }) => x <= 400)).subscribe(({ x, y }) => {
		pos.classList.remove("highlight");
	});
}

// Exercise 5
// ===========================================================================================
// ===========================================================================================
class RNG {
	readonly m = 0x80000000;
	readonly a = 1103515245;
	readonly c = 12345;
	readonly value: number;

	constructor(seed: number) {
		this.value = seed ? seed : Math.floor(Math.random() * (this.m - 1));
	}

	int() {
		return (this.a * this.value + this.c) % this.m;
	}

	float() {
		return this.int() / (this.m - 1);
	}

	next() {
		return new RNG(this.int());
	}
}

class Dot {
	readonly colour: "red" | "green";
	readonly x: number;
	readonly y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
		this.colour = this.inCircle() ? "green" : "red";
	}

	inCircle(): boolean {
		return this.x ** 2 + this.y ** 2 < 1;
	}

	translate(x: number, y: number): Dot {
		return new Dot(this.x + x, this.y + y);
	}
}

interface Data {
	greens: number;
	reds: number;
}

function piApproximation() {
	const resultInPage = document.getElementById("value_piApproximation");
	const canvas = document.getElementById("piApproximationVis");
	if (!resultInPage || !canvas)
		console.log("Not on the observableexamples.html page");
	const circleRadius = Number(canvas.getAttribute("width")) / 2;

	resultInPage.innerText =
		"...Update this text to show the Pi approximation...";

	function createDot(point: Dot) {
		if (!canvas) throw "Couldn't get canvas element!";

		const dot = document.createElementNS(canvas.namespaceURI, "circle");

		// Set circle properties
		dot.setAttribute("cx", String(circleRadius * (point.x + 1)));
		dot.setAttribute("cy", String(circleRadius * (point.y + 1)));
		dot.setAttribute("fill", point.colour);
		dot.setAttribute("r", "3");

		// Add the dot to the canvas
		canvas.appendChild(dot);
	}

	const randomFloatStream = (seed: number) =>
		interval(50).pipe(
			scan((r, _) => r.next(), new RNG(seed)),
			map((r) => 1 - 2 * r.float())
		);
	const randomX$ = randomFloatStream(20);
	const randomY$ = randomFloatStream(21);
	const randomPoint$ = zip(randomX$, randomY$);
	const randomDot$ = randomPoint$.pipe(map(([x, y]) => new Dot(x, y)));
	const data$ = randomDot$.pipe(
		scan<Dot, Data>(
			({ greens, reds }, dot) =>
				dot.inCircle()
					? { greens: greens + 1, reds: reds }
					: { greens: greens, reds: reds + 1 },
			{ greens: 0, reds: 0 }
		)
	);
	const pi$ = data$.pipe(
		map(({ greens, reds }) => (4 * greens) / (greens + reds))
	);

	randomDot$.subscribe(createDot);
	pi$.subscribe((pi) => (resultInPage.innerText = String(pi)));
}

// Exercise 6
// ===========================================================================================
// ===========================================================================================
/**
 * animates an SVG rectangle, passing a continuation to the built-in HTML5 setInterval function.
 * a rectangle smoothly moves to the right for 1 second.
 */
function animatedRectTimer() {
	// get the svg canvas element
	const svg = document.getElementById("animatedRect")!;
	// create the rect
	const rect = document.createElementNS(svg.namespaceURI, "rect");
	Object.entries({
		x: 100,
		y: 70,
		width: 120,
		height: 80,
		fill: "#95B3D7",
	}).forEach(([key, val]) => rect.setAttribute(key, String(val)));
	svg.appendChild(rect);

	const animate = setInterval(
		() =>
			rect.setAttribute("x", String(1 + Number(rect.getAttribute("x")))),
		10
	);
	const timer = setInterval(() => {
		clearInterval(animate);
		clearInterval(timer);
	}, 1000);
}

/**
 * Demonstrates the interval method
 * You want to choose an interval so the rectangle animates smoothly
 * It terminates after 1 second (1000 milliseconds)
 */
function animatedRect() {
	// Your code starts here!
	// =========================================================================================
	// ...
	const intervalStream = interval(10).pipe((time) => time);
	const svg = document.getElementById("animatedRect")!;
	const rect = document.createElementNS(svg.namespaceURI, "rect");
	Object.entries({
		x: 100,
		y: 70,
		width: 120,
		height: 80,
		fill: "#95B3D7",
	}).forEach(([key, val]) => rect.setAttribute(key, String(val)));
	svg.appendChild(rect);

	const subscription = intervalStream.subscribe((_) =>
		rect.setAttribute("x", String(1 + Number(rect.getAttribute("x"))))
	);

	intervalStream.subscribe((time) =>
		time > 100 ? subscription.unsubscribe() : null
	);
}

// Exercise 7
// ===========================================================================================
// ===========================================================================================
/**
 * Create and control a rectangle using the keyboard! Use only one subscribe call and not the interval method
 * If statements
 */
function keyboardControl() {
	// get the svg canvas element
	const svg = document.getElementById("moveableRect")!;

	// Your code starts here!
	// =========================================================================================
	// ...
	const key$ = fromEvent<KeyboardEvent>(document, "keydown");

	key$.pipe(map((e) => e.key)).subscribe((key) =>
		key === "a" ? moveLeft(rect) : null
	);

	key$.pipe(map((e) => e.key)).subscribe((key) =>
		key === "d" ? moveRight(rect) : null
	);

	key$.pipe(map((e) => e.key)).subscribe((key) =>
		key === "w" ? moveUp(rect) : null
	);

	key$.pipe(map((e) => e.key)).subscribe((key) =>
		key === "s" ? moveDown(rect) : null
	);

	const rect = document.createElementNS(svg.namespaceURI, "rect");
	Object.entries({
		x: 100,
		y: 70,
		width: 120,
		height: 80,
		fill: "#95B3D7",
	}).forEach(([key, val]) => rect.setAttribute(key, String(val)));
	svg.appendChild(rect);
}

function moveRight(rect: Element) {
	rect.setAttribute("x", String(1 + Number(rect.getAttribute("x"))));
}

function moveLeft(rect: Element) {
	rect.setAttribute("x", String(-1 + Number(rect.getAttribute("x"))));
}

function moveDown(rect: Element) {
	rect.setAttribute("y", String(1 + Number(rect.getAttribute("y"))));
}

function moveUp(rect: Element) {
	rect.setAttribute("y", String(-1 + Number(rect.getAttribute("y"))));
}

// Running the code
// ===========================================================================================
// ===========================================================================================
document.addEventListener("DOMContentLoaded", function (event) {
	piApproximation();

	// compare mousePosEvents and mousePosObservable for equivalent implementations
	// of mouse handling with events and then with Observable, respectively.
	//mousePosEvents();
	mousePosObservable();

	//animatedRectTimer();
	// replace the above call with the following once you have implemented it:
	animatedRect();
	keyboardControl();
});
