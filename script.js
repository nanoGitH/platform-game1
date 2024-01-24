const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

const scaledCanvas = {
    width: canvas.width / 4,
    height: canvas.height / 4
}

const floorCollisions2D = [];
const platformCollision2D = [];
for(let i = 0; i < floorCollisions.length; i += 36) {
    floorCollisions2D.push(floorCollisions.slice(i, i + 36));
    platformCollision2D.push(platformCollisions.slice(i, i + 36));
}

const collisionBlocks = [];
floorCollisions2D.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if (symbol === 1008)
        collisionBlocks.push(new CollisionBlock({
    position: {
        x: x * 16,
        y: y * 16}
    }));
});
});
const platformCollisionBlocks = [];
platformCollision2D.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if (symbol === 1008)
        platformCollisionBlocks.push(new CollisionBlock({
    position: {
        x: x * 16,
        y: y * 16}
    }));
});
});


console.log(platformCollision2D);


const gravity = 0.5;

const player = new Player({
    position: {x:100,y:100},
    collisionBlocks, //shorthand for collisionBlocks: collisionBlocks
    imageSrc: 'img/warrior/Idle.png',
    frameRate: 8,
});

const background = new Sprite({
    position: {x:0, y:0},
    imageSrc: 'img/background.png'
})

const keys = {
    d: {pressed: false},
    a: {pressed: false},
}

let y = 100;
function animate () {
    window.requestAnimationFrame(animate);
    c.fillStyle = 'white';
    c.fillRect(0, 0, canvas.width, canvas.height);
    
    c.save();
    c.scale(4, 4); //tidak merubah dimensi original image
    c.translate(0, -background.image.height + scaledCanvas.height)
    background.update();
    collisionBlocks.forEach(e => e.update())
    platformCollisionBlocks.forEach(e => e.update())
    
    player.update();
    player.velocity.x = 0
    if(keys.d.pressed == true) {
        player.velocity.x = 5;
    }else if (keys.a.pressed == true){
        player.velocity.x =  -5;
    }
    
    c.restore();

}

animate();

window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'd':
            keys.d.pressed = true;
            break;
        case 'a':
            keys.a.pressed = true;
            break;
        case 'w':
            player.velocity.y = -8;
            break;
    }
});

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'd':
            keys.d.pressed = false;
            break;
        case 'a':
            keys.a.pressed = false;
            break;
    }
});