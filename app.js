import { Hill } from "./hill.js";
import { sheepController } from "./sheep-controller.js";
import { Sun } from "./sun.js";
class App {
    constructor() {
        //create canvas and append to body
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext("2d");
        document.body.appendChild(this.canvas);
        //get screen size
        this.sun = new Sun();

        this.hills = [
            new Hill('#abffb8', 0.2, 12),
            new Hill('#60ec75', 0.5, 8),
            new Hill('#7bdda2', 1.4, 6),
        ];

        this.sheepController = new sheepController();

        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        requestAnimationFrame(this.animate.bind(this));
    }

    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;
        //set canvas display to 2x so it looks better on retina displays
        this.canvas.width = this.stageWidth * 2;
        this.canvas.height = this.stageHeight * 2;
        this.ctx.scale(2, 2);

        this.sun.resize(this.stageWidth, this.stageHeight);

        for (let i = 0; i < this.hills.length; i++) {
            this.hills[i].resize(this.stageWidth, this.stageHeight);
        }

        this.sheepController.resize(this.stageWidth, this.stageHeight);
    }
    //clear canvas
    animate(t) {
        //define animation frame
        requestAnimationFrame(this.animate.bind(this));

        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        this.sun.draw(this.ctx, t);

        let dots;
        for (let i = 0; i < this.hills.length; i++) {
            dots = this.hills[i].draw(this.ctx);
        }

        this.sheepController.draw(this.ctx, t, dots);
    }
}

window.onload = () => {
    new App();
};
