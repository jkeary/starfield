console.log("Let's get to work!");

const starFieldEl = document.querySelector('.star-field');

// math helper function that gives back a random int between a max and a min.   Has many use cases.
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

/*
 Star Object
   coords: start x, start y, finish x, finish y,
*/
function makeStar() {
    // y coordinate starts in top left at 0 and moving down is positive (a little confusing)
    // x coordinate starts top left as well and moves right for positive which follows general cartesian coordinates.
    // z coordinates the higher the number the further away it appears.  The numbers should always shrink so they seem like theyre coming at us.
    let startX = getRandomInt(0, 100);
    let startY = getRandomInt(0, 100);
    let finishX;
    let finishY;

    let scaleStart = getRandomInt(0, 5);
    let scaleFinish = getRandomInt(5, 10);
    
    let quadrant;
    // move up and right
    if (startX > 50 && startY <= 50) {
        quadrant = 'upper-right';
        // one coord has to go to max and the other does not.  Maybe do it half the time one way and half the time the other
        if (starCount % 2) {
            finishY = -10; // up is min (set to negative 10 since there seems to be some issue with borders)
            finishX = getRandomInt(startX, 100); // right is random
        } else {
            finishY = getRandomInt(0, startY); // up is random
            finishX = 110; // right is max
        }
    }
    // move up and left
    if (startX <= 50 && startY <= 50) {
        quadrant = 'upper-left';

        if (starCount % 2) {
            finishY = -10; // up is min
            finishX = getRandomInt(0, startX); // left is rand
        } else {
            finishY = getRandomInt(0, startY); // up is rand
            finishX = -10; // left is min
        }
        
        
    }
    // move down and right
    if (startX > 50 && startY > 50) {
        quadrant = 'lower-right';
        if (starCount % 2) {
            finishY = 110; // down is max
            finishX = getRandomInt(startX, 100); // right is rand
        } else {
            finishY = getRandomInt(startY, 100); // down is rand
            finishX = 110; // right is max
        }
        
    }
    // move down and left
    if (startX <= 50 && startY > 50) {
        quadrant = 'lower-left';
        if (starCount % 2) {
            finishY = 110; // down is max
            finishX = getRandomInt(0, startX); // left is rand
        } else {
            finishY = getRandomInt(startY, 100); // down is rand
            finishX = -10; // left is min
        }
    }

    return {startX, startY, finishX, finishY, scaleStart, scaleFinish, quadrant};
}
  
/*
    add star to dom with an id
*/
function renderStar(star, id) {
    starFieldEl.insertAdjacentHTML('afterbegin', `<div class="star star-${id}" style="transition: all ${getRandomInt(0, 7)}s ease; transform: translate3d(${star.startX}vw, ${star.startY}vh, 5px) scale(${star.scaleStart})"></div>`);
}

/*
    move star around the dom based on its finish coords
*/
function moveStar(star, id) {
    const starEl = document.querySelector(`.star-${id}`);
    starEl.style.transform = `translate3d(${star.finishX}vw, ${star.finishY}vh, 5px) scale(${star.scaleFinish})`;
    starEl.style.opacity = 1;
}

// create initial star field
let starCount = 0;
let initStarField = []
while (starCount < 1000) {
    let newStar = makeStar();
    initStarField.push(newStar);
    // add those to the dom on start
    renderStar(newStar, starCount);
    ++starCount;
}

// then move the stars outward
// based on the x y coordinates, first determine which quadrant the star is in.
window.addEventListener('load', () => {
    initStarField.forEach((star, i) => moveStar(star, i));
});

// next steps, add more stars originating around the center, make a never ending loop
setInterval(() => {
    console.log('add more stars');
}, 500);

// class-ify the code, its starting to look a little rough