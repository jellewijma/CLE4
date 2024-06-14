import { Actor, Engine, Vector, DisplayMode } from "excalibur"
import { Resources, ResourceLoader } from './resources.js';
import { Cafe } from './cafe.js';
import { ShoppingCenter } from './shoppingCenter.js';

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
        this.add("cafe", new Cafe(this));
        this.add("shoppingcenter", new ShoppingCenter(this));
        this.goToScene("shoppingcenter", { sceneActivationData: this.timerLeftInMonth });
    }
}

new Game();
