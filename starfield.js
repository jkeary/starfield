console.log("Let's get to work!");

const starFieldEl = document.querySelector('.star-field');

// class-ify the code, its starting to look a little rough
class Star {

    constructor() {
        // y coordinate starts in top left at 0 and moving down is positive (a little confusing)
        // x coordinate starts top left as well and moves right for positive which follows general cartesian coordinates.
        this.startX = this.getRandomInt(0, 100);
        this.startY = this.getRandomInt(0, 100);
        this.finishX;
        this.finishY;
    
        this.scaleStart = this.getRandomInt(0, 5);
        this.scaleFinish = this.getRandomInt(5, 10);
        
        this.quadrant;

        this.speed = this.getRandomInt(0, 7);

        // move up and right
        if (this.startX > 50 && this.startY <= 50) {
            this.quadrant = 'upper-right';
            // one coord has to go to max and the other does not.  Maybe do it half the time one way and half the time the other
            if (starCount % 2) {
                this.finishY = -10; // up is min (set to negative 10 since there seems to be some issue with borders)
                this.finishX = this.getRandomInt(this.startX, 100); // right is random
            } else {
                this.finishY = this.getRandomInt(0, this.startY); // up is random
                this.finishX = 110; // right is max
            }
        }
        // move up and left
        if (this.startX <= 50 && this.startY <= 50) {
            this.quadrant = 'upper-left';
    
            if (starCount % 2) {
                this.finishY = -10; // up is min
                this.finishX = this.getRandomInt(0, this.startX); // left is rand
            } else {
                this.finishY = this.getRandomInt(0, this.startY); // up is rand
                this.finishX = -10; // left is min
            }
            
            
        }
        // move down and right
        if (this.startX > 50 && this.startY > 50) {
            this.quadrant = 'lower-right';
            if (starCount % 2) {
                this.finishY = 110; // down is max
                this.finishX = this.getRandomInt(this.startX, 100); // right is rand
            } else {
                this.finishY = this.getRandomInt(this.startY, 100); // down is rand
                this.finishX = 110; // right is max
            }
            
        }
        // move down and left
        if (this.startX <= 50 && this.startY > 50) {
            this.quadrant = 'lower-left';
            if (starCount % 2) {
                this.finishY = 110; // down is max
                this.finishX = this.getRandomInt(0, this.startX); // left is rand
            } else {
                this.finishY = this.getRandomInt(this.startY, 100); // down is rand
                this.finishX = -10; // left is min
            }
        }
    }
    

    // math helper function that gives back a random int between a max and a min.   Has many use cases.
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }
}

let starCount = 0;

// Anything that deals with the ui
class App {

    constructor() {
        this.generateStars();
    }

    // function that just generates stars eternally
    generateStars() {
        setInterval(() => {
            let newStarObj = new Star();
            this.renderStar(newStarObj, starCount).then(results => {
                let { id, starObj, starEl } = results;
                if (starEl) {
                    // Throw the move in a setTimeout so that it fully reaches next render cycle.  Fixes issue where original transition styles were just being overwritter and not actually transitioning/moving the star.
                    setTimeout(() => {
                        this.moveStar(starObj, id, starEl);
                        starEl.addEventListener('transitionend', (e) => { 
                            // Make sure you destroy star once the transform's transition has completed (not opacity, opacity seems to be happening faster).
                            if (e.propertyName === 'transform') {
                                this.destroyStar(starEl);
                            }
                        });
                    });
                    
                };
            });
            ++starCount;
        }, .01);
    }

    /*
        add star to dom with an id.  This function happens asyncrhonously as it deals with the rendering engine, so it returns a promise of the rendering
    */
    renderStar(star, id) {
        return new Promise(resolve => {
            starFieldEl.insertAdjacentHTML('afterbegin', `<div id="star-${id}" class="star" style="transition: all ${star.speed}s linear; transform: translate3d(${star.startX}vw, ${star.startY}vh, 5px) scale(${star.scaleStart})"></div>`);
            resolve({ id, starObj: star, starEl: document.querySelector(`#star-${id}`) });
        });
    }

    /*
        move star around the dom based on its finish coords
    */
   moveStar(star, id, el) {
        const starEl = el || document.querySelector(`#star-${id}`);
        starEl.style.transform = `translate3d(${star.finishX}vw, ${star.finishY}vh, 5px) scale(${star.scaleFinish})`;
        starEl.style.opacity = 1;
    }

    /*
        collects and destrys "dead" stars.  Stars that have already finished their animations.  This will help prevent the dom from overloading
    */
    destroyStar(starEl) {
        starFieldEl.removeChild(starEl);
    }
}

const app = new App();