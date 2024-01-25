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
        y: y * 16,
    },
    height: 4,
    }));
});
});


console.log(platformCollision2D);


const gravity = 0.1;
let facingLeft = false;

const player = new Player({
    position: {x:100,y:300},
    collisionBlocks, //shorthand for collisionBlocks: collisionBlocks
    platformCollisionBlocks,
    imageSrc: 'img/warrior/Idle.png',
    frameRate: 8,
    animations: {
        Idle: {
            imageSrc: 'img/warrior/Idle.png',
            frameRate: 8,
            frameBuffer: 3,
        },
        Run: {
            imageSrc: 'img/warrior/Run.png',
            frameRate: 8,
            frameBuffer: 5,
        },
        Jump: {
            imageSrc: 'img/warrior/Jump.png',
            frameRate: 2,
            frameBuffer: 3,
        },
        Fall: {
            imageSrc: 'img/warrior/Fall.png',
            frameRate: 2,
            frameBuffer: 3,
        },
        IdleLeft: {
            imageSrc: 'img/warrior/IdleLeft.png',
            frameRate: 8,
            frameBuffer: 3,
        },
        RunLeft: {
            imageSrc: 'img/warrior/RunLeft.png',
            frameRate: 8,
            frameBuffer: 5,
        },
        JumpLeft: {
            imageSrc: 'img/warrior/JumpLeft.png',
            frameRate: 2,
            frameBuffer: 3,
        },
        FallLeft: {
            imageSrc: 'img/warrior/FallLeft.png',
            frameRate: 2,
            frameBuffer: 3,
        },
    }
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
    if (keys.d.pressed == true) {
        player.switchSprite('Run');
        player.velocity.x = 2;
        facingLeft = false;
    }else if (keys.a.pressed == true) {
        player.switchSprite('RunLeft');
        player.velocity.x =  -2;
        facingLeft = true;
    }else if (player.velocity.y === 0 && !facingLeft) {
        player.switchSprite('Idle');
    }else if (player.velocity.y === 0 && facingLeft) {
        player.switchSprite('IdleLeft');
    }

    if ( player.velocity.y < 0 && !facingLeft ) {
        player.switchSprite('Jump');
    }else if ( player.velocity.y > 0 && !facingLeft ) {
        player.switchSprite('Fall');
    }else if ( player.velocity.y < 0 && facingLeft ) {
        player.switchSprite('JumpLeft');
    }else if ( player.velocity.y > 0 && facingLeft ) {
        player.switchSprite('FallLeft');
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
            player.velocity.y = -4;
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