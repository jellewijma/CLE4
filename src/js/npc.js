import { Actor, Vector, Random, CollisionType } from "excalibur";
import { Resources } from "./resources.js";
import { Shop } from "./shop.js";

export class Npc extends Actor {
    constructor(x, y, game) {
        super({
            pos: new Vector(x, y),
            width: 20,
            height: 20,
            collisionType: CollisionType.Passive
        });

        const npcSprite = Resources.Npc.toSprite();
        npcSprite.width = 20;
        npcSprite.height = 20;
        this.graphics.use(npcSprite);

        this.game = game;
        this.enteredShop = false;
        this.random = new Random();
        this.hitBorder = false;
        this.moveDirection = null;
        this.nearestCheckpoint = null;

        this.moveToCenter();
    }

    moveToCenter() {
        if (!this.hitBorder) {
            const center = new Vector(640 - 10, 360 - 10);
            this.actions.moveTo(center.x, center.y, 100).callMethod(() => this.moveToRandomShop());
        }
    }

    moveToRandomShop() {
        const shops = this.game.shops;
        this.targetShop = shops[Math.floor(Math.random() * shops.length)];
        this.moveToTargetShop();
    }

    moveToTargetShop() {
        if (!this.hitBorder) {
            this.actions.moveTo(this.targetShop.pos.x, this.targetShop.pos.y, 100);
        } else if (this.nearestCheckpoint) {
            this.actions.moveTo(this.nearestCheckpoint.pos.x, this.nearestCheckpoint.pos.y, 100)
                .callMethod(() => {
                    this.hitBorder = false;
                    this.moveToRandomShop();
                });
        }
    }

    handleBorderCollision() {
        this.hitBorder = true;
        this.actions.clearActions();
        this.moveToTargetShop();
    }

    onInitialize(engine) {
        this.on('precollision', (evt) => this.onPreCollision(evt));
    }

    onPreCollision(evt) {
        if (evt.other instanceof Shop && !this.enteredShop) {
            const shop = evt.other;

            if (shop.pos.equals(new Vector(0, 720 - 20))) {
                const product = this.game.products[this.random.integer(0, this.game.products.length - 1)];
                this.game.scoreBoard.addMoney(product.price);
                console.log(`NPC bought ${product.name} for $${product.price}`);
                this.game.transferNpcToCafe(this);
            }

            this.game.removeNpc(this);
            shop.incrementScore();
            this.enteredShop = true;
        }
    }
}
