import { Actor, Engine, Vector, DisplayMode, Label, Color, Font } from "excalibur";
import { Resources, ResourceLoader } from './resources.js';
import { Town } from './town.js';
import { Land } from './land.js';

export class Game extends Engine {

    timerLeftInMonth = 8;

    constructor() {
        super({
            width: 1280,
            height: 720,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen
        });
        this.start(ResourceLoader).then(() => this.startGame());
    }

    startGame() {
        console.log("start de game!");
        this.add("town", new Town(this));
        this.add("land", new Land(this));
        this.goToScene("town", { sceneActivationData: this.timerLeftInMonth });
    }
}

new Game();