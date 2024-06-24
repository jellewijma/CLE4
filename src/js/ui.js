import { Label, ScreenElement, Font, Color, Actor, CollisionType, Vector } from "excalibur"

class UI extends ScreenElement {

    score;
    monthlyRent;
    bgScore;
    bgRent;

    constructor() {
        super()

        this.score = new Label({
            text: 'Balance: €0',
            x: 5,
            y: 5,
            width: 100,
            height: 20,
            z: 10,
            font: new Font({
                size: 16,
                color: Color.White
            })
        })

        this.bgScore = new Actor({
            z: 2,
            x: 4,
            y: 4,
            width: 125,
            height: 18,
            color: Color.Black,
            collisionType: CollisionType.PreventCollision,
            anchor: new Vector(0, 0)
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
                color: Color.White
            })
        })

        this.bgRent = new Actor({
            z: 2,
            x: 4,
            y: 24,
            width: 125,
            height: 18,
            color: Color.Black,
            collisionType: CollisionType.PreventCollision,
            anchor: new Vector(0, 0)
        })
    }

    onInitialize() {
        this.addChild(this.score)
        this.addChild(this.bgScore)
        this.addChild(this.monthlyRent)
        this.addChild(this.bgRent)
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