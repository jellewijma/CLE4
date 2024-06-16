import { Actor, Vector, CollisionType } from "excalibur";
import { Resources } from "./resources.js";
import { SpawnPoint } from "./spawnPoint.js";

export class NpcPaid extends Actor {
    constructor(x, y, game, shop) {
        super({
            pos: new Vector(x, y),
            width: 20,
            height: 20,
            collisionType: CollisionType.Passive // Allow NPCs to pass through each other
        });

        // Assign the sprite to the NpcPaid and make it smaller
        const npcPaidSprite = Resources.paidnpc.toSprite();
        npcPaidSprite.width = 20;
        npcPaidSprite.height = 20;
        this.graphics.use(npcPaidSprite);

        // Store reference to the game instance
        this.game = game;

        // Decrease the shop score by 1
        shop.decrementScore();

        // Move to a random spawn point
        this.moveToRandomSpawnPoint();
    }

    // Method to move to a random spawn point
    moveToRandomSpawnPoint() {
        const spawnPoints = this.game.spawnPoints;
        if (spawnPoints.length > 0) {
            const randomSpawnPoint = spawnPoints[Math.floor(Math.random() * spawnPoints.length)];
            this.actions.moveTo(randomSpawnPoint.pos.x, randomSpawnPoint.pos.y, 100); // 100 pixels per second
        }
    }

    onInitialize() {
        this.on('precollision', (evt) => this.onPreCollision(evt));
    }

    onPreCollision(evt) {
        if (evt.other instanceof SpawnPoint) {
            this.game.removeNpc(this);
        }
    }
}
