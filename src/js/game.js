import { Engine, DisplayMode, Actor, Vector, Color } from "excalibur";
import { Resources, ResourceLoader } from './resources.js';
import { Npc } from "./npc.js";

export class Game extends Engine {
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
        console.log("start the game!");

        // Create NPC and add it to the game
        const npc = new Npc(100, 100);
        this.add(npc);
        console.log('npc created');

        // Create red squares in each corner
        const corners = [
            new Vector(0, 0), // Top-left
            new Vector(1280 - 20, 0), // Top-right
            new Vector(0, 720 - 20), // Bottom-left
            new Vector(1280 - 20, 720 - 20) // Bottom-right
        ];

        corners.forEach(corner => {
            const square = new Actor({
                pos: corner,
                width: 20,
                height: 20,
                color: Color.Red
            });
            this.add(square);
        });
    }
}

new Game();
