import { Label, ScreenElement, Font, Color } from "excalibur"

class UI extends ScreenElement {

    score;
    monthlyRent;

    constructor() {
        super()

        this.score = new Label({
            text: 'Balance: 0',
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

        this.monthlyRent = new Label({
            text: 'Huur: 500',
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
    }

    onInitialize() {
        this.addChild(this.score)
        this.addChild(this.monthlyRent)
    }

    add(child) {
        this.addChild(child);
    }

    updateScore(score) {
        this.score.text = `Balance: ${score}`
    }

    updateRent(rent) {
        this.monthlyRent.text = `Huur: ${rent}`
    }
}

export { UI }