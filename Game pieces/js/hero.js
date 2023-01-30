let hero = {
    img: (function(){
        let img = new Image();
        img.src = './img/hero.jpg';
        console.log(img);

        return img;
    })(),
    x: 0,
    y: 0
    
};

function moveHero(x = hero.x, y = hero.y) {
    // check area is out
    // if (x < 0 || x > 590) return;
    // if (y <0 || y > 690) return;

    clearHero();

    hero.x = x;
    hero.y = y;
    context.beginPath();
    context.drawImage(hero.img, hero.x, hero.y, 20, 20);
    // context.fillStyle = '#004A70';
    // context.fill();
    context.closePath();
};  

function clearHero() {
    context.clearRect(hero.x, hero.y, 20, 20);
};