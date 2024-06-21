import { Label, ScreenElement, Font, Color } from "excalibur"

class UI extends ScreenElement {

    score;

    constructor() {
        super()

        this.score = new Label({
            text: 'Balance: 0',
            x: 10,
            y: 10,
            width: 100,
            height: 20,
            font: new Font({
                size: 16,
                color: Color.White
            })
        })
    }

    onInitialize() {
        this.addChild(this.score)
    }

    add(child) {
        this.addChild(child);
    }

    updateScore(score) {
        this.score.text = `Balance: ${score}`
    }
}

export { UI }