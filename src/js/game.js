import { Engine, DisplayMode, Vector, Scene } from 'excalibur';
import { Resources, ResourceLoader } from './resources.js';
import { StartScreen } from './startScreen.js';
import { Cafe } from './cafe.js';
import { ShoppingCenter } from './shoppingCenter.js';

export class Game extends Engine {
    constructor() {
        super({
            width: 1280,
            height: 720,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen
        });

        // Properties from both versions
        this.npcCount = 0;
        this.maxNpcCount = 15;
        this.npcs = [];
        this.spawnPoints = [];
        this.shops = [];
        this.products = [];
        // NPCs in the cafe
        this.npcsInCafe = [];

        // New properties from the second version
        this.timerLeftInMonth = 8;
        this.balance = 10000;
        this.monthlyRent = 500;

        this.start(ResourceLoader).then(() => {
            this.addScenes();
            this.goToScene('startScreen');
        });
    }

    addScenes() {
        this.add('startScreen', new StartScreen());
        this.add('game', new MainGameScene(this));
        this.add('cafe', new Cafe(this));
        this.add('shoppingcenter', new ShoppingCenter(this));
    }

    increaseMonthlyRent() {
        this.balance -= this.monthlyRent;
        this.monthlyRent += 50;
        console.log(`De maandhuur is nu ${this.monthlyRent}`);
        console.log(`Je hebt nu nog ${this.balance} op je rekening`);
    }

    addIncome() {
        const income = 100; // Math.floor(Math.random() * 1000) + 100;
        this.balance += income;
        console.log(`Je hebt ${income} ontvangen, je hebt nu ${this.balance} euro op je rekening`);
    }

    removeNpc(npc) {
        this.remove(npc);
        this.npcs = this.npcs.filter(n => n !== npc);
        this.npcCount--;
        console.log('npc removed, total:', this.npcCount);
    }

    transferNpcToCafe(npc) {
        this.removeNpc(npc);
        this.npcsInCafe.push(npc);
        if (this.currentScene instanceof Cafe) {
            this.currentScene.addNpcToCafe(npc);
        }
    }

    removeNpcFromCafe(npc) {
        this.npcsInCafe = this.npcsInCafe.filter(n => n !== npc);
        if (this.currentScene instanceof Cafe) {
            this.currentScene.removeNpcFromCafe(npc);
        }
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

import '../css/style.css';
