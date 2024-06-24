import { Actor, Label, Font, FontUnit, TextAlign, Color, Vector } from "excalibur";

export class ScoreBoard extends Actor {
    constructor(x, y) {
        super({
            pos: new Vector(x, y),
        });

        this.totalMoney = 0;

        this.label = new Label({
            text: `Total Money: $${this.totalMoney}`,
            pos: new Vector(x, y),
            font: new Font({
                family: 'Arial',
                size: 24,
                unit: FontUnit.Px,
                textAlign: TextAlign.Center,
                color: Color.White
            })
        });
    }

    onInitialize(engine) {
        engine.add(this.label);
    }

    addMoney(amount) {
        this.totalMoney += amount;
        this.label.text = `Total Money: $${this.totalMoney}`;
    }
}
