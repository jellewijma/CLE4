import { Label, ScreenElement, Font, Color, Actor, CollisionType, Vector, Resource } from "excalibur"
import { Resources } from "./resources"


class UI extends ScreenElement {

    score;
    monthlyRent;
    backdrop;

    constructor() {
        super(
            {
                x: 0,
                y: 0,
                width: 800,
                height: 600,
                z: 10
            }
        )

        this.score = new Label({
            text: 'Balance: €0',
            x: 5,
            y: 5,
            width: 100,
            height: 20,
            z: 10,
            font: new Font({
                size: 16,
                color: Color.Black
            })
        })

        this.monthlyRent = new Label({
            text: 'Huur: €500',
            x: 5,
            y: 25,
            width: 100,
            height: 20,
            z: 10,
            font: new Font({
                size: 16,
                color: Color.Black
            })
        })

        // this.backdrop = new Actor({
        //     x: 0,
        //     y: 0,
        //     width: 800,
        //     height: 600
        // })

        // this.backdrop = Resources.Backdrop.toSprite()
        // this.backdrop.x = 0
        // this.backdrop.y = 0
        // this.backdrop.z = 0
    }

    onInitialize() {
        this.addChild(this.score)
        this.addChild(this.monthlyRent)
        // this.add(this.backdrop)
        // console.log(this.backdrop)
        this.graphics.add(Resources.Backdrop.toSprite())
    }

    add(child) {
        this.addChild(child);
    }

    updateScore(score) {
        this.score.text = `Balance: €${score}`
    }

    updateRent(rent) {
        this.monthlyRent.text = `Huur: €${rent}`
    }
}

export { UI }