import {Application, Sprite, Container} from 'pixi.js';

let winSection = 3;
let rotation = false;
const acceleration = 5;
let rotationSpeed = 0;

const w = 800;
const h = 600;

const app = new Application<HTMLCanvasElement>({
    backgroundColor: "#779caf",
    antialias: true,
    width: w,
    height: h,
});

app.ticker.maxFPS = 60;

document.getElementById("pixi_container").appendChild(app.view);

const container = new Container();

app.stage.addChild(container);

const wheelStand = Sprite.from("./assets/wheel_stand.png");
wheelStand.anchor.set(0.5);

const wheel = Sprite.from("./assets/wheel.png");
wheel.scale.set(0.6);
wheel.anchor.set(0.5);

container.addChild(wheelStand);
container.addChild(wheel);

// Move container to the center
container.x = app.screen.width / 2;
container.y = app.screen.height / 2;

// Move wheel to the wheelStand cross
wheel.x = wheelStand.width / 2;
wheel.y = wheelStand.height / 2 - 100;

wheel.eventMode = 'static';

wheel.cursor = 'pointer';

wheel.on('click', WheelBehavior);

function WheelBehavior() {
    if (!rotation) {
        startRotating();
    } else {
        stopRotating();
    }
}

function startRotating() {
    rotation = true;
    app.ticker.add(rotateWheel);
}

function stopRotating() {

    app.ticker.remove(rotateWheel);
    app.ticker.add(stopRotateWheel);
}

function rotateWheel() {

    rotationSpeed += acceleration;

    rotationSpeed = Math.min(rotationSpeed, 15);

    wheel.angle += rotationSpeed;

    if (Math.round(wheel.angle) === 360) {
        wheel.angle = 0;
    }
}

function stopRotateWheel() {

    if (Math.round( wheel.angle) != winSection * 90){

        wheel.angle += rotationSpeed;

        if (Math.round(wheel.angle) === 360) {
            wheel.angle = 0;
        }

    }else {
        rotation = false;
        app.ticker.remove(stopRotateWheel);
    }
}
