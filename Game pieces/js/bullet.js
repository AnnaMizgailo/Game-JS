let bullets = [];

function makeBullet(hero) {
    if (bullets.length <= 4) {
        let newBullet = {
            x: hero.x + 10,
            y: hero.y + 10,
        };
        bullets.push(newBullet);

        return newBullet;
    } else return;
};

function clearBullet(bullet) {
    context.clearRect(bullet.x - 3, bullet.y - 3, 6, 6);
};

function moveBullet(bullet) {
    if (bullet.x !== hero.x) {
        clearBullet(bullet);
    }
    
    // check area is out
    if (bullet.x < 10 || bullet.x > 690) {
        // взять индексы тех пуль которые долшли до конца
        let _index = bullets.indexOf(bullet);

        // очистить их
        context.clearRect(bullet.x, bullet.y, 6, 6);

        // удалить пулю из массива (т е взять те пули которые не дошли до конца)
        bullets = bullets.filter((bullet, index) => index !== _index);
    }

    bullet.x += 20;

    let killsquare = squares.find((square) => (square.x + 10) === bullet.x && (square.y + 10) === bullet.y);
    if (killsquare) {
        // взять индексы тех пуль которые долшли до конца
        let _indexBullet = bullets.indexOf(bullet);

        // удалить пулю из массива (т е взять те пули которые не дошли до конца)
        bullets = bullets.filter((bullet, index) => index !== _indexBullet);

        // взять индексы тех квадратиков которые долшли до конца
        let _indexSquare = squares.indexOf(killsquare);

        context.clearRect(killsquare.x, killsquare.y, 20, 20);

        // удалить квадратиков из массива (т е взять те квадратиков которые не дошли до конца)
        squares = squares.filter((bullet, index) => index !== _indexSquare);

        finishedSquares += 1;
        total.value = finishedSquares;

        return;
    }
        
    context.beginPath();
    context.arc(bullet.x, bullet.y, 3, 0, 2 * Math.PI);
    context.fillStyle = 'red';
    context.fill();
    context.closePath();
};
