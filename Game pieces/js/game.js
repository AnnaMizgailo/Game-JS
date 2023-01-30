// global
let finishedSquares = 0;
let canvas = document.getElementsByTagName("canvas")[0];
canvas.width = "600";
canvas.height = "700";
let context = canvas.getContext("2d");

let generateSquaresInterval;
let moveSquaresInterval;

let gameOverInterval;

let moveBulletInterval;

let total = document.getElementById("total");

const startButton = document.getElementById('start-button');
startButton.addEventListener('click', function() {
    // hero = {
    //     x: 10, y:10
    // };
    // squares = [];
    // bullets = [];

    // context.clearRect(0, 0, 600, 700);
    
    // создавать новые квадратики каждые 2 сек
    generateSquaresInterval = setTimeout(function tick() {
        generateSquares();
        generateSquaresInterval = setTimeout(tick, 2000);
    }, 2000);

    // передвигать(перерисовывать) квадратики каждые 1 сек
    moveSquaresInterval = setTimeout(function tick() {
        // gameOver(hero, squares);
        if (squares.length !== 0) {
            for (let i = 0; i < squares.length; i++) {
                moveSquare(squares[i]);
            }
        }

        countSquares();
        total.value = finishedSquares;

        moveSquaresInterval = setTimeout(tick, 1000);
    }, 1000);

    // вызывает функцию gameOver каждые 10 мсек
    gameOverInterval = setInterval(function() {
        gameOver(hero, squares);
    }, 1);

    // передвижение пули
    moveBulletInterval = setTimeout(function tick() {
        if (bullets.length !== 0) {
            for (let i = 0; i < bullets.length; i++) {
                moveBullet(bullets[i], squares);
            }
        }

        console.log(bullets);
        moveBulletInterval = setTimeout(tick, 50);
    }, 50);

    // двигать героя (если никаких аргументов не переда то значит с начальной точки рисовать)
    moveHero();
});

// const stopButton = document.getElementById('stop-button');
// stopButton.addEventListener('click', function() {
//     // stop game
// });

function keyboardHandler(event) {
    gameOver(hero, squares);

    if (event.defaultPrevented) {
        return; // Do nothing if event already handled
    }
    
    switch(event.code) {
        case "ArrowDown":
            moveHero(hero.x, hero.y + 20);
            break;
        case "ArrowUp":
            moveHero(hero.x, hero.y - 20);
            break;
        case "ArrowLeft":
            moveHero(hero.x - 20, hero.y);
            break;
        case "ArrowRight":
            moveHero(hero.x + 20, hero.y);
            break;
        case "Space":
            makeBullet(hero);
            break;
    }  
    
    if (event.code !== "Tab") {
        // Consume the event so it doesn't get handled twice,
        // as long as the user isn't trying to move focus away
        event.preventDefault();
    }
};

window.addEventListener("keydown",keyboardHandler, true);

// проверяет попал ли герой-круг в область квадрата
function gameOver(hero, squares) {
    if (!squares || squares.length === 0) return false;
    
    if (squares.some((square) => ((square.x === hero.x) && (square.y === hero.y)))) { 
  
        window.removeEventListener('keydown', keyboardHandler, true);
        clearTimeout(generateSquaresInterval);
        clearTimeout(moveSquaresInterval);
        clearTimeout(gameOverInterval);

        context.beginPath();
        context.drawImage(hero.img, hero.x, hero.y, 20, 20);
        context.fill();
        context.closePath();
        alert('Game over!');
    
    }
};
