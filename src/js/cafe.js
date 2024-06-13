import { Scene, Color, Vector, Actor } from 'excalibur';


export class Cafe extends Scene {
    constructor(engine) {
        super(engine)
    }

    onActivate() {
        console.log('Je bent nu in de Cafe scene');

        const square = new Actor({
            pos: new Vector(100, 100),
            width: 100,
            height: 100,
            color: Color.Black
        })

        this.add(square)
        square.on('pointerdown', (event) => {
            this.changeScene();
        })
    }

    changeScene() {
        this.engine.goToScene('shoppingcentre')
    }
}



