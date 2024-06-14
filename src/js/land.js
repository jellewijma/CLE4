import { Scene, Label, Font, Color, Timer } from "excalibur"

class Land extends Scene {

    monthLoop;
    constructor(game) {
        super()

        this.game = game
        this.backgroundColor = Color.Green

        // label increment
        let next = new Label({
            text: "Next Scene",
            color: Color.White,
            x: 10,
            y: 10,
            font: new Font({
                size: 20,
                family: 'Arial'
            }),
        });
        next.on('pointerup', () => {
            this.game.goToScene("town", { sceneActivationData: this.game.counter });
        });
        this.add(next);

        this.monthLoop = new Timer({
            fcn: () => {
                if (this.game.timerLeftInMonth > 0) {
                    this.game.timerLeftInMonth--;
                    console.log(this.game.timerLeftInMonth);
                } else {
                    this.game.timerLeftInMonth = 8;
                    console.log("month is over!")
                    console.log(this.game.timerLeftInMonth);
                }
            },
            interval: 500,
            repeats: true
        });
        this.add(this.monthLoop);
    }

    onActivate() {
        console.log("Land activated!")
        console.log(this.game.timerLeftInMonth)
        this.monthLoop.start();
    }
}



export { Land }