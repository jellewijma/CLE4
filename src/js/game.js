import {Engine, DisplayMode, Vector, Scene} from 'excalibur';
import { Resources, ResourceLoader } from './resources.js';
import { Npc } from "./npc.js";
import { NpcPaid } from "./npcPaid.js";
import { Shop } from "./shop.js";
import { SpawnPoint } from "./spawnPoint.js";
import { Product } from "./product.js";
import { ScoreBoard } from "./scoreboard.js";
import { Path } from "./path.js";
import { StartScreen } from './startScreen.js';

export class Game extends Engine {
    constructor() {
        super({
            width: 1280,
            height: 720,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen
        });

        this.npcCount = 0;
        this.maxNpcCount = 15;
        this.npcs = [];
        this.spawnPoints = [];
        this.shops = [];
        this.products = [];

        this.start(ResourceLoader).then(() => {
            this.addScenes();
            this.goToScene('startScreen');
        });
    }

    addScenes() {
        this.add('startScreen', new StartScreen());
        this.add('game', new MainGameScene(this)); // Add the main game scene
    }

    startGame() {
        console.log("start the game!");

        // Create shops in each corner
        const corners = [
            new Vector(0, 0),
            new Vector(1280 - 20, 0),
            new Vector(0, 720 - 20),
            new Vector(1280 - 20, 720 - 20)
        ];

        // Create spawn points in between the shops
        const spawnPositions = [
            new Vector(640 - 10, 0),
            new Vector(1280 - 20, 360 - 10),
            new Vector(640 - 10, 720 - 20),
            new Vector(0, 360 - 10)
        ];

        // Create shops
        corners.forEach(corner => {
            const shop = new Shop(corner.x, corner.y);
            this.add(shop);
            this.shops.push(shop);
        });

        // Create spawn points
        spawnPositions.forEach(spawnPos => {
            const spawnPoint = new SpawnPoint(spawnPos.x, spawnPos.y);
            this.add(spawnPoint);
            this.spawnPoints.push(spawnPoint);
        });

        // Create paths
        const center = new Vector(640 - 10, 360 - 10);
        spawnPositions.forEach(spawnPos => {
            const pathToCenter = new Path([spawnPos, center]);
            this.add(pathToCenter);
        });

        // Create products
        this.products = [
            new Product("Coffee", 3),
            new Product("Sandwich", 8),
            new Product("Smoothie", 5)
        ];

        // Create scoreboard
        this.scoreBoard = new ScoreBoard(640, 360);
        this.add(this.scoreBoard);

        // Spawn initial NPC
        this.spawnNpc();

        // Spawn NPCs every 3 seconds
        this.spawnNpcInterval = setInterval(() => {
            if (this.npcCount < this.maxNpcCount) {
                this.spawnNpc();
            }
        }, 3000);

        // Spawn NpcPaid every 3 seconds
        this.spawnNpcPaidInterval = setInterval(() => {
            this.spawnNpcPaid();
        }, 3000);
    }

    spawnNpc() {
        // Pick a random spawn point
        if (this.spawnPoints.length > 0) {
            const spawnPoint = this.spawnPoints[Math.floor(Math.random() * this.spawnPoints.length)];
            const npc = new Npc(spawnPoint.pos.x, spawnPoint.pos.y, this);
            this.add(npc);
            this.npcs.push(npc);
            this.npcCount++;
            console.log('npc created, total:', this.npcCount);
        } else {
            console.error('No spawn points available');
        }
    }

    spawnNpcPaid() {
        // Pick a random shop with a score greater than 1
        const eligibleShops = this.shops.filter(shop => shop.score >= 1);
        if (eligibleShops.length > 0) {
            const shop = eligibleShops[Math.floor(Math.random() * eligibleShops.length)];
            const npcPaid = new NpcPaid(shop.pos.x, shop.pos.y, this, shop);
            this.add(npcPaid);
            this.npcs.push(npcPaid);
            this.npcCount++;
            console.log('npcPaid created, total:', this.npcCount);
        } else {
            console.log('No eligible shops to spawn NpcPaid');
        }
    }

    removeNpc(npc) {
        this.remove(npc);
        this.npcs = this.npcs.filter(n => n !== npc);
        this.npcCount--;
        console.log('npc removed, total:', this.npcCount);
    }
}

class MainGameScene extends Scene {
    constructor(game) {
        super(game);
        this.game = game;
    }

    onInitialize(engine) {
        this.game.startGame();
    }
}

new Game();

