let squares = [];

function moveSquare(square) {
    clearSquare(square);

    // check area is out
    if (square.x < 0) return;

    square.x -= 20;

    context.beginPath();
    // context.lineWidth = 1;
    // context.lineCap = 'square';
    // context.lineCap = 'round';
    // context.fillStyle = 'black';
    // context.fillRect(square.x, square.y, 20, 20);
    context.drawImage(square.img, square.x, square.y, 20, 20);
    context.closePath();
};

function clearSquare(square) {
    context.clearRect(square.x, square.y, 20, 20);
};

function makeSquare(y) {
    return {
        img: (function(){
            let img = new Image();
            img.src = './img/enemy.jpg';

            return img;
        })(),
        x: 600,
        y
    };
};

// создает новые квадратики и ложит в массив squares
function generateSquares() {
    const coordinates = [0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340, 360, 380, 400, 420, 440, 460, 480, 500, 520, 540, 560, 580, 600, 620, 640, 660, 680];
    
    const choosenCoordinates = new Set();

    while (choosenCoordinates.size != 3) {
        // генерировать случайное число от 0 до 34, брать координату X из массива по этому случайному номеру, ложить эту координату в Set
        choosenCoordinates.add(coordinates[Math.floor(Math.random() * (34 - 0 + 1) + 0)]);
    }

    for (let choosenCoordinate of choosenCoordinates) {
        squares.push(makeSquare(choosenCoordinate));
    }
};

// проверяет дошел ли квадратик до конца x = 0 считает его и удаляет из массива
function countSquares() {
    if (squares.length !== 0) {
        // взять индексы тех квадратиков которые долшли до конца
        let indexes = squares.filter((square) => square.x === 0).map((square, index) => index);

        // очистить их
        for (let i = 0; i < indexes.length; i++) {
            context.clearRect(squares[indexes[i]].x, squares[indexes[i]].y, 20, 20);
        }

        // прибавить в счет 
        finishedSquares += indexes.length;

        // удалить их из массива (т е взять те квадратики которые не дошли до конца)
        squares = squares.filter((value, index) => {
            return !indexes.includes(index);
        });
    }
};