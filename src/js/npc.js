import { Actor, Vector, Random, CollisionType } from "excalibur";
import { Resources } from "./resources.js";
import { Shop } from "./shop.js";

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

        // Store reference to the game instance
        this.game = game;

        // Initialize enteredShop flag
        this.enteredShop = false;

        // Initialize random instance
        this.random = new Random();

        // Set up movement along the path
        this.moveToCenter();
    }

    moveToCenter() {
        const center = new Vector(640 - 10, 360 - 10);
        this.actions.moveTo(center.x, center.y, 100).callMethod(() => this.moveToRandomShop());
    }

    moveToRandomShop() {
        const shops = this.game.shops;
        const targetShop = shops[Math.floor(Math.random() * shops.length)];
        this.actions.moveTo(targetShop.pos.x, targetShop.pos.y, 100);
    }

    onInitialize() {
        this.on('precollision', (evt) => this.onPreCollision(evt));
    }

    onPreCollision(evt) {
        if (evt.other instanceof Shop && !this.enteredShop) {
            const shop = evt.other;

            // Check if it's the bottom-left shop
            if (shop.pos.equals(new Vector(0, 720 - 20))) {
                // Select a random product
                const product = this.game.products[this.random.integer(0, this.game.products.length - 1)];
                this.game.scoreBoard.addMoney(product.price);
                // console.log(`NPC bought ${product.name} for $${product.price}`);
                // Transfer NPC to cafe scene
                this.game.transferNpcToCafe(this);
            }

            this.game.removeNpc(this); // Ensure this is accessible and properly defined
            // shop.incrementScore();
            this.enteredShop = true; // Mark that the NPC has entered the shop
        }
    }
}
