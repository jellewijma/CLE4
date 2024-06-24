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
    }
}


