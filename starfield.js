console.log("Let's get to work!");

// const star = document.querySelector('.star');
const starField = document.querySelector('.star-field');
console.log(starField)
// star.addEventListener("load", addMovement()); 

// function addMovement() {
//     star.classList.add("star-move");
// }

// creating a star field
// each start needs a starting x, starting y, ending x and ending y.
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
  
let starCount = 0;
let initStarField = []
while (starCount < 1000) {
    initStarField.push({x: getRandomInt(0, 100), y: getRandomInt(0, 100)});
    ++starCount;
} 

// add those to the dom on start
initStarField.forEach(star => {
    console.log(starField);
    starField.insertAdjacentHTML('afterbegin', `<div class="star" style="transform: translate3d(${star.x}vw, ${star.y}vh, 5px)"></div>`);
});


// then move the stars outward

// want random directions

// create a bunch of stars