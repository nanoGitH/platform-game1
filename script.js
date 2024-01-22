const canvas = document.querySelector('canvas');
canvas.width = 1024;
canvas.height = 576;
const c = canvas.getContext('2d');

const gravity = 0.5;

class Player
{
    constructor(position) {
        this.position = position,
        this.velocity = {
            x: 0,
            y: 1
        },
        this.height = 100
    }

    draw() {
        c.fillStyle = 'red';
        c.fillRect(this.position.x, this.position.y, 100, this.height);
    }

    update() {
        this.draw();

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        
        if( this.position.y + this.height + this.velocity.y < canvas.height){
            this.velocity.y += gravity;
        }else {
            this.velocity.y = 0;
        }
    }
}

const player1 = new Player({x:500,y:100});

let y = 100;
function animate () {
    window.requestAnimationFrame(animate);
    c.fillStyle = 'white';
    c.fillRect(0, 0, canvas.width, canvas.height);
    player1.update();

    player1.velocity.x = 0
    if(keys.d.pressed == true) {
        player1.velocity.x = 2;
    }else if (keys.a.pressed == true){
        player1.velocity.x =  -2;
    }
}

const keys = {
    d: {pressed: false},
    a: {pressed: false},
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
            player1.velocity.y = -15;
            break;    
        default:
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
        case 'w':
            player1.velocity.y = -15;
            break;    
        default:
            break;
    }
});