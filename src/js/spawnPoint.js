import { Actor, Vector, Color, CollisionType } from "excalibur";

export class SpawnPoint extends Actor {
    constructor(x, y) {
        super({
            pos: new Vector(x, y),
            width: 20,
            height: 20,
            color: Color.Green,
            collisionType: CollisionType.Fixed // No collision needed for spawn points
        });
    }
}
