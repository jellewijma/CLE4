import { Actor, Vector, CollisionType, Color, Circle } from "excalibur";
import { Resources } from "./resources.js";
import { SpawnPoint } from "./spawnPoint.js";
import { Checkpoint } from "./checkpoint.js"; // Ensure the Checkpoint class is imported

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

        // Move towards the nearest checkpoint
        this.moveToNearestCheckpoint();
    }

    moveToNearestCheckpoint() {
        // Find the nearest checkpoint
        const nearestCheckpoint = this.findNearestCheckpoint();
        if (nearestCheckpoint) {
            this.actions.moveTo(nearestCheckpoint.pos.x, nearestCheckpoint.pos.y, 100)
                .callMethod(() => this.moveToRandomSpawnPoint());
        } else {
            console.log('No checkpoints available');
        }
    }

    findNearestCheckpoint() {
        const checkpoints = this.game.currentScene.checkpoints;
        let nearestCheckpoint = null;
        let minDistance = Number.MAX_VALUE;

        checkpoints.forEach(checkpoint => {
            const distance = this.pos.distance(checkpoint.pos);
            if (distance < minDistance) {
                minDistance = distance;
                nearestCheckpoint = checkpoint;
            }
        });

        return nearestCheckpoint;
    }

    moveToRandomSpawnPoint() {
        const spawnPoints = this.game.spawnPoints;
        if (spawnPoints.length > 0) {
            const randomSpawnPoint = spawnPoints[Math.floor(Math.random() * spawnPoints.length)];
            this.actions.moveTo(randomSpawnPoint.pos.x, randomSpawnPoint.pos.y, 100)
                .callMethod(() => this.despawn());
        } else {
            console.log('No spawn points available');
        }
    }

    despawn() {
        this.game.removeNpc(this);
    }

    onInitialize() {
        this.on('precollision', (evt) => this.onPreCollision(evt));
    }

    onPreCollision(evt) {
        if (evt.other instanceof Checkpoint) {
            this.moveToRandomSpawnPoint();
        }
    }
}
