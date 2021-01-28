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
    add star to dom with an id.  This function happens asyncrhonously as it deals with the rendering engine, so it returns a promise of the rendering
*/
function renderStar(star, id) {
    return new Promise((resolve, reject) => {
        starFieldEl.insertAdjacentHTML('afterbegin', `<div id="star-${id}" class="star" style="transition: all ${getRandomInt(0, 7)}s linear; transform: translate3d(${star.startX}vw, ${star.startY}vh, 5px) scale(${star.scaleStart})"></div>`);
        resolve({ id, starObj: star, starEl: document.querySelector(`#star-${id}`) });
    });
}

/*
    move star around the dom based on its finish coords
*/
function moveStar(star, id, el) {
    console.log(`starting moving ${id}`)
    const starEl = el || document.querySelector(`#star-${id}`);
    starEl.style.transform = `translate3d(${star.finishX}vw, ${star.finishY}vh, 5px) scale(${star.scaleFinish})`;
    starEl.style.opacity = 1;
}

/*
    collects and destrys "dead" stars.  Stars that have already finished their animations.  This will help prevent the dom from overloading
*/
function destroyStar(starEl) {
    starFieldEl.removeChild(starEl);
}

let starCount = 0;
// adding stars!  this eventually kills your browser, so eventually you will need some way to remove the stars.
setInterval(() => {
    let newStarObj = makeStar();
    renderStar(newStarObj, starCount).then(results => {
        let { id, starObj, starEl } = results;
        if (starEl) {
            // Throw the move in a setTimeout so that it fully reaches next render cycle.  Fixes issue where original transition styles were just being overwritter and not actually transitioning/moving the star.
            setTimeout(() => {
                moveStar(starObj, id, starEl);
                starEl.addEventListener('transitionend', (e) => { 
                    // Make sure you destroy star once the transform's transition has completed (not opacity, opacity seems to be happening faster).
                    if (e.propertyName === 'transform') {
                        destroyStar(starEl);
                    }
                });
            });
            
        };
    });
    ++starCount;
}, .01);

// class-ify the code, its starting to look a little rough