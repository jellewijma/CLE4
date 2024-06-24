
import { Actor, Vector, Random, CollisionType, Animation, range } from "excalibur";
import { Resources } from "./resources.js";
import { Shop } from "./shop.js";

export class Npc extends Actor {
    constructor(x, y, game) {
        super({
            pos: new Vector(x, y),
            width: 64,
            height: 64,
            collisionType: CollisionType.Passive // Allow NPCs to pass through each other
        });

        // Create animations from the sprite sheets
        this.animations = {
            bottomWalk: Animation.fromSpriteSheet(Resources.bottomWalk, range(0, 3), 100), // 100ms per frame
            leftWalk: Animation.fromSpriteSheet(Resources.leftWalk, range(0, 3), 100),
            rightWalk: Animation.fromSpriteSheet(Resources.rightWalk, range(0, 3), 100),
            topWalk: Animation.fromSpriteSheet(Resources.topWalk, range(0, 3), 100)
        };

        // Scale animations if needed
        for (let key in this.animations) {
            this.animations[key].scale = new Vector(0.6, 0.6);
        }

        // Use the bottom walk animation by default
        this.graphics.use(this.animations.bottomWalk);

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
        this.updateAnimation(center);
        this.actions.moveTo(center.x, center.y, 100).callMethod(() => this.moveToRandomShop());
    }

    moveToRandomShop() {
        const shops = this.game.shops;
        const targetShop = shops[Math.floor(Math.random() * shops.length)];
        this.actions.moveTo(targetShop.pos.x, targetShop.pos.y, 100);
    }

        this.updateAnimation(targetShop.pos);
        this.actions.moveTo(targetShop.pos.x, targetShop.pos.y, 100);
    }

    updateAnimation(targetPos) {
        const direction = targetPos.sub(this.pos).normalize();

        if (Math.abs(direction.x) > Math.abs(direction.y)) {
            if (direction.x > 0) {
                this.graphics.use(this.animations.rightWalk);
            } else {
                this.graphics.use(this.animations.leftWalk);
            }
        } else {
            if (direction.y > 0) {
                this.graphics.use(this.animations.bottomWalk);
            } else {
                this.graphics.use(this.animations.topWalk);
            }
        }
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
                console.log(`NPC bought ${product.name} for $${product.price}`);
                // Transfer NPC to cafe scene
                this.game.transferNpcToCafe(this);
            }

            this.game.removeNpc(this); // Ensure this is accessible and properly defined
            // shop.incrementScore();
            shop.incrementScore();
            this.enteredShop = true; // Mark that the NPC has entered the shop
        }
    }
}
