import { Label, ScreenElement, Font, Color, Actor, CollisionType, Vector } from "excalibur"
import { Resources } from "./resources"

class UI extends ScreenElement {

    score;
    monthlyRent;
    bgScore;
    bgRent;

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
            text: 'Balance: €1000',
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
            text: 'Huur: €200',
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

    }

    onInitialize() {
        this.addChild(this.score)
        this.addChild(this.monthlyRent)
        this.graphics.add(Resources.Backdrop.toSprite());
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