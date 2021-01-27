console.log("Let's get to work!");

const star = document.querySelector('.star');
console.log(star);

let xCoordinate = 50;
let yCoordinate = 50;

console.log('here');
let counter = 1;
setInterval(() => {
    if (counter = 8) {
        console.log('here');
        star.style.left = `${--xCoordinate}%`;
        star.style.top = `${++yCoordinate}%`;
        counter = 1;

        // break out of this once your hitting 100 or 0
    }
    ++counter;
}, 500);

// create a random array that has a bunch of start coordinates

// add those to the dom on start

// then move the stars outward

// want random directions

// create a bunch of stars