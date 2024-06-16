import { Actor, Vector, Random, CollisionType } from "excalibur";
import { Resources } from "./resources.js";
import { Shop } from "./shop.js";
import { SpawnPoint } from "./spawnPoint.js";

export class Npc extends Actor {
    constructor(x, y, game) {
        super({
            pos: new Vector(x, y),
            width: 20,
            height: 20,
            collisionType: CollisionType.Passive // Allow NPCs to pass through each other
        });

        // Assign the sprite to the NPC and make it smaller
        const npcSprite = Resources.Npc.toSprite();
        npcSprite.width = 20;
        npcSprite.height = 20;
        this.graphics.use(npcSprite);

        // Set up random movement
        this.random = new Random();
        this.moveRandomly();

        // Store reference to the game instance
        this.game = game;

        // Initialize enteredShop flag
        this.enteredShop = false;
    }

    // Method to move to a random corner
    moveRandomly() {
        const corners = [
            new Vector(0, 0), // Top-left
            new Vector(1280 - 20, 0), // Top-right
            new Vector(0, 720 - 20), // Bottom-left
            new Vector(1280 - 20, 720 - 20) // Bottom-right
        ];
        const targetCorner = corners[this.random.integer(0, corners.length - 1)];
        this.actions.moveTo(targetCorner.x, targetCorner.y, 100); // 100 pixels per second

        // Schedule the next random move
        setTimeout(() => this.moveRandomly(), this.random.integer(1000, 3000)); // Move every 1 to 3 seconds
    }

    onInitialize() {
        this.on('precollision', (evt) => this.onPreCollision(evt));
    }

    onPreCollision(evt) {
        if (evt.other instanceof Shop && !this.enteredShop) {
            const shop = evt.other;
            this.game.removeNpc(this);
            shop.incrementScore();
        }
    }
}



