import { Actor } from "excalibur";
import { Resources } from "./resources";


export class CreateTilemap extends Actor {
    constructor(game) {
        super()
        this.game = game;
    }
    /**
         * 
         * @param {*} engine 
         */
    onInitialize(engine) {
        Resources.TiledMapResource.addToScene(engine.currentScene)
    }
}