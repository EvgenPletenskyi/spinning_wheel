import {Application, Sprite, Container} from 'pixi.js';

let winSection = 0;
let rotation = false;
let maxSpeed = 15;
let angleOfSection = 90;
const acceleration = 0.08;
const stopAcceleration = 0.05;
let rotationSpeed = 0;
let fakeSpin = false;
let twist = false;
let stopAngle;

const w = 800;
const h = 600;

const app = new Application<HTMLCanvasElement>({
    backgroundColor: "#779caf",
    antialias: true,
    width: w,
    height: h,
});
globalThis.__PIXI_APP__ = app;
// app.ticker.maxFPS = 60;

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

    if (rotation) {
        rotationSpeed += acceleration * delta;

        rotationSpeed = Math.min(rotationSpeed, maxSpeed);
        wheel.angle += rotationSpeed;

        if (wheel.angle >= 360) {
            wheel.angle = 0;
        }
    } else if (rotationSpeed !== 0 && !rotation) {
        //
        // if (wheel.angle < 360 && wheel.angle !== 0 && !fakeSpin) {
        //     wheel.angle += rotationSpeed;
        //
        // } else if (wheel.angle >= 360 && !fakeSpin) {
        //     wheel.angle = 0;
        fakeSpin = true;
        // }
        if (fakeSpin) {
            // if (wheel.angle <= 360 * 4 - winSection * 180 && !twist) {
            if (rotationSpeed !== 3 && !twist) {
                rotationSpeed -= stopAcceleration * delta;
                rotationSpeed = Math.max(rotationSpeed, 3);
                wheel.angle += rotationSpeed;
                if (wheel.angle >= 360) {
                    wheel.angle = 0;
                }
            } else if (Math.abs(wheel.angle - stopAngle) >= 10 && !twist) {
                wheel.angle += rotationSpeed;
                if (wheel.angle >= 360) {
                    wheel.angle = 0;
                }
                console.log(wheel.angle);
                console.log(Math.abs(wheel.angle - stopAngle))
            } else  {
                console.log(twist);
                twist = true;
            }
            if (Math.round(wheel.angle) != winSection * 90 && twist) {
                rotationSpeed -= stopAcceleration * delta;
                rotationSpeed = Math.max(rotationSpeed, 1);
                wheel.angle += rotationSpeed;
                if (wheel.angle >= 360) {
                    wheel.angle = 0;
                }
            } else if (twist) {
                rotationSpeed = 0;
                rotation = false;
                fakeSpin = false;
                twist = false;
            }
        }
        //     if (wheel.angle <= 360 * 4 - winSection * 180 && fakeSpin){
        //         console.log('wheel.angle', wheel.angle)
        //         rotationSpeed -= stopAcceleration * delta;
        //         rotationSpeed = Math.max(rotationSpeed, 5);
        //         wheel.angle += rotationSpeed;
        //     }else if (Math.round(wheel.angle) != winSection * 90) {
        //         fakeSpin = false;
        //         // wheel.angle = Math.floor(wheel.angle/360);
        //         rotationSpeed -= stopAcceleration * delta;
        //
        //         rotationSpeed = Math.max(rotationSpeed, 1);
        //         wheel.angle += rotationSpeed;
        //         console.log(wheel.angle)
        //         if (wheel.angle >= 360 - 0.001) {
        //             wheel.angle = 0;
        //         }
        //
        //     } else {
        //         wheel.angle = winSection * 90;
        //         rotationSpeed = 0;
        //         console.log(wheel.angle);
        //         rotation = false;
        //         fakeSpin = true;
        //     }
    }
})
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