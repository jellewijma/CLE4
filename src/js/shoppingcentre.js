import { Scene, Actor, Engine, Color, Vector } from 'excalibur';

export class Shoppingcentre extends Scene {
    constructor(engine) {
        super(engine);
    }

    onActivate() {

        console.log("Je bent nu in de shoppingcentre scene");

        const square = new Actor({
            pos: new Vector(100, 100),
            width: 100,
            height: 100,
            color: Color.Red
        })

        this.add(square)
        square.on('pointerdown', (event) => {
            this.changeScene();
        })
    }

    changeScene() {

        this.engine.goToScene('cafe')
    }


    onDeactivate() {

    }
}