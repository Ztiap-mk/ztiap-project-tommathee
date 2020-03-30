
var myGamePiece;

function startGame() {
    myGamePiece = new component(120, 80, "chick1.png", -100, 320, "image");    
    myGameArea.start();
}

imgAim = new Image();
imgAim.src = "images/aimcursor.png";

imgLife = new Image();
imgLife.src = "images/life.png";

var name="Moorhuhn";

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 960;
        this.canvas.height = 640;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 5);
        
    },


    stop : function() {
        clearInterval(this.interval);
    },    
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
}

function component(width, height, color, x, y, type) {

    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }

    this.width = width;
    this.height = height;
    this.speed = 1;
    this.angle = 0;
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = myGameArea.context;
        if (type == "image") {
            ctx.drawImage(this.image, 
                this.x, 
                this.y,
                this.width, this.height);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }

        ctx.drawImage(imgAim, 450, 320);
        ctx.fillText(name, 450, 30); 
        ctx.drawImage(imgLife, 20, 570);

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);               
        ctx.restore();    
    }
    this.newPos = function() {
        this.x += 1;
        this.y -= 0;
    }
}

function updateGameArea() {
    myGameArea.clear();
    myGamePiece.newPos();
    myGamePiece.update();
}