const canvas = document.querySelector('canvas');
canvas.width = 1024;
canvas.height = 576;
const c = canvas.getContext('2d');

class Player
{
    constructor(x,y) {
        this.x = x,
        this.y = y
    }

    draw() {
        c.fillStyle = 'red';
        c.fillRect(this.x, this.y, 50, 50);
    }

    update() {
        this.draw();
        this.y++;
    }
}

const player1 = new Player(500,100);

let y = 100;
function animate () {
    window.requestAnimationFrame(animate);
    c.fillStyle = 'white';
    c.fillRect(0, 0, canvas.width, canvas.height);
    player1.update();
}

animate();
