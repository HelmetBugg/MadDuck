let thingsToLoad = [
    "res/alien.png",
];

let g = hexi(512, 512, setup, thingsToLoad, load);
g.fps = 30;
let version = 0.1;
let once = false;

//Optionally scale and align the canvas inside the browser window
g.scaleToWindow();
g.start();
let cats, title, ship, final_frontier, bullet, spawner;

function load() {
    g.loadingBar();
}

function setup() {
    title = g.text("Schmuck " + version, "38px puzzler", "red");
    g.stage.putCenter(title);
    title.pivotX = 0.5;
    title.pivotY = 0.5;
    playButton = g.text("Play", "38px puzzler", "red");
    playButton.x = 400;
    playButton.y = 350;
	
	finalFrontier = g.rectangle(512, 512, "black");
    ship = g.circle(25, "blue", "black", 5, 750, 400);
    bullets = [];
    enemies = [];
    spawner = g.rectangle(512, 5, "white", "white", 0, 0, -5);
	titleScene = g.group(title, playButton);
    gameScene = g.group(ship);

    g.makeInteractive(playButton);
    playButton.press = function () {
        g.slide(titleScene, -514, 0, 30, "decelerationCubed");
        g.slide(gameScene, -514, 0, 30, "decelerationCubed");
        once=true;
    }

    // controls
    let leftArrow = g.keyboard(37),
    upArrow = g.keyboard(38),
    rightArrow = g.keyboard(39),
    downArrow = g.keyboard(40),
    space = g.keyboard(32);
    leftArrow.press = () => {
        ship.vx = -5;
        ship.vy = 0;
    };
    leftArrow.release = () => {
        if (!rightArrow.isDown && ship.vy === 0) {
            ship.vx = 0;
        }
    };
    rightArrow.press = () => {
        ship.vx = 5;
        ship.vy = 0;
    };
    rightArrow.release = () => {
        if (!leftArrow.isDown && ship.vy === 0) {
            ship.vx = 0;
        }
    };
    space.press = () => {
        g.shoot(ship, 4.71, 12.5, 12.5, g.stage, 10, bullets, 
        function () {
          return g.circle(8, "yellow");
        });
    };

    g.state = play;
}

function play() {
    if (once){
        once = false;
        // Set enemy spawner
        setInterval(function(){ 
            g.shoot(spawner, 4.71, Math.random() * (512 - 1), 12.5, g.stage, -7, bullets, 
            function () {return g.circle(12, "red");}); 
         }, 300);
    }

    g.move(ship);
    g.move(bullets);
    // Removing Bullets out of bounds.
    bullets = bullets.filter(function (bullet) {
        var collision = g.outsideBounds(bullet, g.stage);
        if (collision){
            g.remove(bullet);
            return false;
        }
        return true;
     });
}
