import { Actor, Vector, CollisionType, Color, Label, FontUnit, Font, TextAlign } from "excalibur";

export class Shop extends Actor {
    constructor(x, y) {
        super({
            pos: new Vector(x, y),
            width: 20,
            height: 20,
            color: Color.Red,
            collisionType: CollisionType.Fixed // Set collision type
        });

        // Initialize score
        this.score = 0;

        // Create a label for the scoreboard
        this.label = new Label({
            text: `Score: ${this.score}`,
            pos: new Vector(x, y - 30), // Position above the shop
            font: new Font({
                family: 'Arial',
                size: 16,
                unit: FontUnit.Px,
                textAlign: TextAlign.Center,
                color: Color.White
            })
        });
    }

    onInitialize(engine) {
        engine.add(this.label); // Add the label to the game
    }

    incrementScore() {
        this.score++;
        this.label.text = `Score: ${this.score}`;
    }

    decrementScore() {
        if (this.score > 0) {
            this.score--;
            this.label.text = `Score: ${this.score}`;
        }
    }
}


