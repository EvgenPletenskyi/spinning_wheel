import {Application, Sprite, Container} from 'pixi.js';
import {gsap, Linear, Back, Sine} from "gsap";

let winSection = 0;

const w = 800;
const h = 600;

const app = new Application<HTMLCanvasElement>({
    backgroundColor: "#779caf",
    antialias: true,
    width: w,
    height: h,
});
globalThis.__PIXI_APP__ = app;
// app.ticker.maxFPS = 10;

document.getElementById("pixi_container").appendChild(app.view);

const container = new Container();

app.stage.addChild(container);

const wheelStand = Sprite.from("./assets/wheel_stand.png");
wheelStand.anchor.set(0.5);

const wheel: Sprite = Sprite.from("./assets/wheel.png");
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

// wheel.on('click', wheelBehavior);
wheel.once('click', startSpinning);

function continueSpinning() {
    wheel.once('click', stopSpinning);
    wheel.angle = 0;
    gsap.to(wheel, {
        duration: 0.3,
        repeat: -1,
        ease: Linear.easeNone,
        angle: 360,
        overwrite: "auto",
    });
}

function startSpinning() {
    gsap.to(wheel, {
        duration: 1,
        repeat: 0,
        ease: Sine.easeIn,
        angle: 360,
        onComplete: continueSpinning,
    });
}

function stopSpinning() {
    gsap.killTweensOf(wheel);
    gsap.to(wheel, {
        duration: 3,
        repeat: 0,
        ease: Back.easeOut.config(1),
        angle: 360 * 2 + winSection * 90,
    })
}