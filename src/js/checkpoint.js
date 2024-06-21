import { Actor, CollisionType, Vector, Color, Circle } from "excalibur";

export class Checkpoint extends Actor {
    constructor(x, y) {
        super({
            pos: new Vector(x, y),
            width: 20,
            height: 20,
            collisionType: CollisionType.Passive,
            z: 1
        });

        this.color = Color.Green;
    }

    onInitialize(engine) {
        this.graphics.use(new Circle({
            radius: 10,
            color: this.color
        }));
    }
}
