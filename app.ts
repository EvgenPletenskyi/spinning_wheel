import {Application, Sprite, Container} from 'pixi.js';

let winSection = 2;
let rotation = false;
let maxSpeed = 15;
const acceleration = 0.08;
const stopAcceleration = 0.05;
let rotationSpeed = 0;
let twist = false;
let stopAngle: number;

const w = 800;
const h = 600;

const app = new Application<HTMLCanvasElement>({
    backgroundColor: "#779caf",
    antialias: true,
    width: w,
    height: h,
});
globalThis.__PIXI_APP__ = app;
// app.ticker.maxFPS = 20;

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

getStopAngle(winSection);

wheel.eventMode = 'static';

wheel.cursor = 'pointer';

// wheel.on('click', wheelBehavior);
wheel.on('click', getClick);
app.ticker.add((delta) => {
    resetAngle();

    if (rotation) {

        rotationSpeed += acceleration * delta;
        rotationSpeed = Math.min(rotationSpeed, maxSpeed);
        wheel.angle += rotationSpeed;

    } else if (rotationSpeed !== 0 && !rotation) {

        if (rotationSpeed !== 3 && !twist) {
            rotationSpeed -= stopAcceleration * delta;
            rotationSpeed = Math.max(rotationSpeed, 3);
            wheel.angle += rotationSpeed;

        } else if (Math.abs(wheel.angle - stopAngle) >= 10 && !twist) {
            wheel.angle += rotationSpeed;

        } else {
            twist = true;
        }
        if (Math.round(wheel.angle) != winSection * 90 && twist) {
            rotationSpeed -= stopAcceleration * delta;
            rotationSpeed = Math.max(rotationSpeed, 1);
            wheel.angle += rotationSpeed;
        } else if (twist) {
            rotationSpeed = 0;
            rotation = false;
            twist = false;
        }
    }
})

function resetAngle() {
    if (wheel.angle >= 360) {
        wheel.angle = 0;
    }
}

function getStopAngle(winSection) {
    switch (winSection) {
        case 0:
            stopAngle = 270;
            break;
        case 1:
            stopAngle = 0;
            break;
        case 2:
            stopAngle = 90;
            break;
        case 3:
            stopAngle = 180;
    }
}

function getClick() {
    console.log('click');
    if (rotationSpeed === maxSpeed || rotationSpeed === 0) {
        rotation = !rotation;
    }
}