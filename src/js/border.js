import { Actor, CollisionType, Color, Vector, Rectangle } from "excalibur";
import { Npc } from '../js/npc.js';

export class Border extends Actor {
    constructor() {
        super({
            pos: new Vector(590, 350),
            width: 620,
            height: 200,
            collisionType: CollisionType.Active,
        });

        this.color = Color.Red;
    }

    onInitialize(engine) {
        this.graphics.use(new Rectangle({
            width: this.width,
            height: this.height,
            color: this.color
        }));

        this.on('precollision', (evt) => this.onPreCollision(evt));
    }

    onPreCollision(evt) {
        if (evt.other instanceof Npc) {
            const npc = evt.other;

            if (npc.pos.y < this.pos.y) {
                npc.moveDirection = "down";
            } else {
                npc.moveDirection = "up";
            }

            npc.nearestCheckpoint = this.getNearestCheckpoint(npc.pos);
            npc.handleBorderCollision();
        }
    }

    getNearestCheckpoint(pos) {
        let nearest = null;
        let nearestDistance = Infinity;

        for (const checkpoint of this.scene.engine.currentScene.checkpoints) {
            const distance = pos.distance(checkpoint.pos);
            if (distance < nearestDistance) {
                nearest = checkpoint;
                nearestDistance = distance;
            }
        }

        return nearest;
    }
}
