import { Label, ScreenElement, Font, Color } from "excalibur"

class UI extends ScreenElement {

    score;

    constructor() {
        super()

        this.score = new Label({
            text: 'Balance: 0',
            x: 20,
            y: 20,
            width: 100,
            height: 20,
            font: new Font({
                size: 64,
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