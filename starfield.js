console.log("Let's get to work!");

const star = document.querySelector('.star');

star.addEventListener("load", addMovement()); 

function addMovement() {
    console.log(star);
    star.classList.add("star-move");
}

// let xCoordinate = 50;
// let yCoordinate = 50;

// let counter = 0;
// const moveStarInterval = setInterval(() => {
//     console.log(counter)
//     if (counter === 2) {
//         star.style.left = `${--xCoordinate}%`;
//         star.style.top = `${++yCoordinate}%`;
//         star.style.transform = `${translate3d()}`;
//         counter = 0;

//         // break out of this once your hitting 100 or 0
//         if (xCoordinate < 0 || yCoordinate > 100) {
//             clearInterval(moveStarInterval)
//         } 
//     }
//     counter++;
// }, 500);


// create a random array that has a bunch of start coordinates

// add those to the dom on start

// then move the stars outward

// want random directions

// create a bunch of stars