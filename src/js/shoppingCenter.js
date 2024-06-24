import { Scene, Label, Font, Color, Timer, Vector, CollisionType, Actor, Polygon, vec } from "excalibur";
import { Resources } from "./resources";
import { CreateTilemap } from "./loadTilemap";
import { Npc } from "./npc.js";
import { NpcPaid } from "./npcPaid.js";
import { Shop } from "./shop.js";
import { SpawnPoint } from "./spawnPoint.js";
import { Product } from "./product.js";
import { ScoreBoard } from "./scoreboard.js";
import { Path } from "./path.js";
import { UI } from "./ui";
import { Competitor } from "./competitor";
class ShoppingCenter extends Scene {

    monthLoop;
    incomeLoop;
    ui;


    constructor(game) {
        super();
        this.game = game;
        this.monthLoop = null;
        this.incomeLoop = null;
    }

    onInitialize() {
        const createTileMap = new CreateTilemap();
        this.add(createTileMap);



        // label increment
        let next = new Actor({
            x: 468,
            y: 75,
            z: 10,
        });

        next.graphics.add(Resources.Button.toSprite());

        next.on('pointerup', () => {
            this.game.goToScene("cafe", { sceneActivationData: this.game.counter });
        });
        this.add(next);

        // Create shops in each corner
        const corners = [
            new Vector(400, 170),
            new Vector(680 - 20, 170),
            new Vector(465, 550 - 20),//your shop
            new Vector(850 - 20, 550 - 20)
        ];

        // Create spawn points
        const spawnPositions = [
            new Vector(850 - 10, 100),//top
            new Vector(1100 - 20, 270 - 10),//right-top
            new Vector(1100 - 20, 470 - 10),//right-bottom
            new Vector(640 - 10, 600 - 20),//bottom-right
            new Vector(330 - 10, 600 - 20),//bottom-left
            new Vector(100, 270 - 10),//left-top
            new Vector(100, 470 - 10)//left-bottom

        ];

        // Create shops
        corners.forEach(corner => {
            const shop = new Shop(corner.x, corner.y);
            this.add(shop);
            this.game.shops.push(shop);
        });

        // Create spawn points
        spawnPositions.forEach(spawnPos => {
            const spawnPoint = new SpawnPoint(spawnPos.x, spawnPos.y);
            this.add(spawnPoint);
            this.game.spawnPoints.push(spawnPoint);
        });

        // Create paths
        const center = new Vector(640 - 10, 360 - 10);
        spawnPositions.forEach(spawnPos => {
            const pathToCenter = new Path([spawnPos, center]);
            this.add(pathToCenter);
        });

        // Create products
        this.game.products = [
            new Product("Coffee", 3),
            new Product("Sandwich", 8),
            new Product("Smoothie", 5)
        ];

        // Create scoreboard
        this.game.scoreBoard = new ScoreBoard(640, 360);
        this.add(this.game.scoreBoard);

        // Spawn initial NPC
        this.spawnNpc();

        // Spawn NPCs every 3 seconds
        this.game.spawnNpcInterval = setInterval(() => {
            if (this.game.npcCount < this.game.maxNpcCount) {
                this.spawnNpc();
            }
        }, 3000);

        // Spawn NpcPaid every 3 seconds
        this.game.spawnNpcPaidInterval = setInterval(() => {
            this.spawnNpcPaid();
        }, 3000);

        // Initialize loops
        this.initLoops();
    }

    spawnNpc() {
        // Pick a random spawn point
        if (this.game.spawnPoints.length > 0) {
            const spawnPoint = this.game.spawnPoints[Math.floor(Math.random() * this.game.spawnPoints.length)];
            const npc = new Npc(spawnPoint.pos.x, spawnPoint.pos.y, this.game);
            this.add(npc);
            this.game.npcs.push(npc);
            this.game.npcCount++;
            console.log('npc created, total:', this.game.npcCount);
        } else {
            console.error('No spawn points available');
        }
    }

    spawnNpcPaid() {
        // Pick a random shop with a score greater than 1
        const eligibleShops = this.game.shops.filter(shop => shop.score >= 1);
        if (eligibleShops.length > 0) {
            const shop = eligibleShops[Math.floor(Math.random() * eligibleShops.length)];
            const npcPaid = new NpcPaid(shop.pos.x, shop.pos.y, this.game, shop);
            this.add(npcPaid);
            this.game.npcs.push(npcPaid);
            this.game.npcCount++;
            console.log('npcPaid created, total:', this.game.npcCount);
        } else {
            console.log('No eligible shops to spawn NpcPaid');
        }
    }

    initLoops() {
        this.monthLoop = new Timer({
            fcn: () => {
                if (this.game.timerLeftInMonth > 0) {
                    this.game.timerLeftInMonth--;
                    // console.log(this.game.timerLeftInMonth);
                } else {
                    this.game.timerLeftInMonth = 8;
                    this.game.increaseMonthlyRent(this.ui);
                    // console.log(this.game.timerLeftInMonth);
                }
            },
            interval: 500,
            repeats: true
        });
        this.add(this.monthLoop);

        this.incomeTimer();

        this.ui = new UI();
        this.ui.pos.x = 10;
        this.ui.pos.y = 10;
        this.add(this.ui);

        // Swipe tracking
        this.isSwiping = false;
        this.swipeStartPos = null;
        this.lastPointerPos = null;

        document.addEventListener('touchmove', this.handleMove.bind(this), { passive: false });
        document.addEventListener('touchstart', this.handleDown.bind(this), { passive: false });
        document.addEventListener('touchend', this.onPointerUp.bind(this), { passive: false });
      
        this.addCompetitors()
    }

    addCompetitors() {
        const competitors = [
            { name: 'Competitor A', position: { x: 100, y: 200 } }
        ];
        competitors.forEach(comp => {
            const competitor = new Competitor(comp.name, comp.position);
            this.add(competitor);
        });
    }

    // Handle pointer/touch start
    handleDown(evt) {
        if (this.game.currentScene.constructor.name !== 'ShoppingCenter') {
            return;
        }
        if (evt && typeof evt.preventDefault === 'function') {
            evt.preventDefault();
        }
        let worldPos = this.getWorldPos(evt);
        console.log("Pointer/touch down");
        this.swipeStartPos = { x: worldPos.x, y: worldPos.y };
        this.isSwiping = true;
    }

    // Handle pointer/touch move
    handleMove(evt) {
        if (this.game.currentScene.constructor.name !== 'ShoppingCenter') {
            return;
        }
        if (evt && typeof evt.preventDefault === 'function') {
            evt.preventDefault();
        }
        if (!this.isSwiping) return;
        let worldPos = this.getWorldPos(evt);
        console.log("Pointer/touch move");
        if (this.lastPointerPos) {
            const deltaX = worldPos.x - this.lastPointerPos.x;

            // not outside the map
            if (this.game.currentScene.camera.pos.x - deltaX < 145) {
                this.game.currentScene.camera.pos.x = 145;
                console.log("niet verder dan 0")
            } else if (this.game.currentScene.camera.pos.x - deltaX > 992 - 146) {
                this.game.currentScene.camera.pos.x = 992 - 146;
                console.log("niet verder dan 500")
            } else {
                this.game.currentScene.camera.pos.x -= deltaX;
            }
        }
        this.lastPointerPos = worldPos;
    }

    // Handle pointer/touch end
    onPointerUp(evt) {
        this.isSwiping = false;
        this.lastPointerPos = null;
    }

    // Utility function to normalize touch and pointer positions
    getWorldPos(evt) {
        let pos = evt.touches ? evt.touches[0] : evt;
        return { x: pos.clientX, y: pos.clientY }; // Assuming worldPos can be derived from clientX/Y for simplicity
    }
    incomeTimer() {
        const randomInterval = Math.floor(Math.random() * 3000) + 1000;
        this.incomeLoop = new Timer({
            fcn: () => {
                this.game.addIncome(this.ui);
                this.incomeTimer(); // Start de timer opnieuw met een nieuw willekeurig interval
            },
            interval: randomInterval,
            repeats: true
        });
        this.add(this.incomeLoop);
    }

    onActivate() {
        console.log("Je bent nu in het winkelcentrum");
        console.log(this.game.timerLeftInMonth);
        this.monthLoop.start();
        this.incomeLoop.start();
    }

    onDeactivate() {
        // deactiveer de document event listeners
        document.removeEventListener('touchmove', this.handleMove.bind(this));
        document.removeEventListener('touchstart', this.handleDown.bind(this));
        document.removeEventListener('touchend', this.onPointerUp.bind(this));
        this.monthLoop.stop();
        this.incomeLoop.stop();
    }
}

export { ShoppingCenter };
