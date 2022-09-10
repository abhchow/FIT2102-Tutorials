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
function piApproximation() {
    // a simple, seedable, pseudo-random number generator
    class RNG {
        // LCG using GCC's constants
        m = 0x80000000; // 2**31
        a = 1103515245;
        c = 12345;
        state: number;
        constructor(seed: number) {
            this.state = seed ? seed : Math.floor(Math.random() * (this.m - 1));
        }
        nextInt() {
            this.state = (this.a * this.state + this.c) % this.m;
            return this.state;
        }
        nextFloat() {
            // returns in range [0,1]
            return this.nextInt() / (this.m - 1);
        }
    }

    const resultInPage = document.getElementById("value_piApproximation"),
        canvas = document.getElementById("piApproximationVis");

    if (!resultInPage || !canvas) {
        console.log("Not on the observableexamples.html page");
        return;
    }

    // Some handy types for passing data around
    type Colour = "red" | "green";
    type Dot = { x: number; y: number; colour?: Colour };
    interface Data {
        point?: Dot;
        insideCount: number;
        totalCount: number;
    }

    // an instance of the Random Number Generator with a specific seed
    const rng = new RNG(20);
    // return a random number in the range [-1,1]
    const nextRandom = () => rng.nextFloat() * 2 - 1;
    // you'll need the circleDiameter to scale the dots to fit the canvas
    const circleRadius = Number(canvas.getAttribute("width")) / 2;
    // test if a point is inside a unit circle
    const inCircle = ({ x, y }: Dot) => x * x + y * y <= 1;
    // you'll also need to set innerText with the pi approximation
    resultInPage.innerText =
        "...Update this text to show the Pi approximation...";

    // Your code starts here!
    // =========================================================================================
    
    function updateApprox(pointData: Data) {
        resultInPage.innerText =
            "Current Approximation of Pi is " +
            String((4 * pointData.insideCount) / pointData.totalCount);
    }

    function pointsToDots(point: Dot): Dot {
        return ({
            x: circleRadius * (point.x + 1),
            y: circleRadius * (point.y + 1),
            colour: inCircle(point) ? "green" : "red",
        })
    }
    
    function dataScan(data: Data, dot: Dot): Data {
        return {
            point: dot,
            insideCount: data.insideCount + (inCircle(dot) ? 1 : 0),
            totalCount: data.totalCount + 1
        }
    }

    function createDot(dataInfo: Data) {
        if (!canvas) throw "Couldn't get canvas element!";
        const dot = document.createElementNS(canvas.namespaceURI, "circle");
        const x = dataInfo.point.x,
            y = dataInfo.point.y;

        // Set circle properties
        dot.setAttribute("cx", String(x));
        dot.setAttribute("cy", String(y));
        dot.setAttribute("r", "2");
        dot.setAttribute("fill", dataInfo.point.colour);

        // Add the dot to the canvas
        canvas.appendChild(dot);
        updateApprox(dataInfo)
    }

    // A stream of random numbers
    const time = 50;
    const randStreamX = interval(time).pipe(map(nextRandom));
    const randStreamY = interval(time).pipe(map(nextRandom));
    const points = zip(randStreamX, randStreamY).pipe(
        map(([xStream, yStream]) => (<Dot>{ x: xStream, y: yStream }))
    );

    const dataStream = points.pipe(
        scan(dataScan, {insideCount: 0, totalCount: 0}),
        map((data: Data) => <Data>({
            point: pointsToDots(data.point),
            insideCount: data.insideCount,
            totalCount: data.totalCount
        }))
    )

    dataStream.subscribe(createDot);
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
