
import { Engine, DisplayMode, Scene } from 'excalibur';
import { Resources, ResourceLoader } from './resources.js';
import { StartScreen } from './startScreen.js';
import { Cafe } from './cafe.js';
import { ShoppingCenter } from './shoppingCenter.js';
import { End } from './end.js';

export class Game extends Engine {
    timerLeftInMonth = 8;
    balance = 10000;
    monthlyRent = 500;
    income = 100;

    constructor() {
        super({
            width: 288,
            height: 512,
            maxFps: 60,
            pixelArt: true,
            displayMode: DisplayMode.FitScreen,
            antialiasing: false
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

            this.startGame();
        });
    }

    addScenes() {
        this.add('startScreen', new StartScreen());
        this.add('cafe', new Cafe(this));
        this.add('shoppingcenter', new ShoppingCenter(this));
        this.add('end', new End(this));
    }


    startGame() {
        console.log("start de game!");
        this.goToScene("shoppingcenter", { sceneActivationData: this.timerLeftInMonth });
    }

    increaseMonthlyRent(UI) {
        if (this.balance < this.monthlyRent) {
            console.log("Je hebt niet genoeg geld om de huur te betalen");
            this.goToScene('end');
            return;
        }
        this.balance -= this.monthlyRent;
        this.monthlyRent += 50;
        UI.updateRent(this.monthlyRent);
        console.log(`De maandhuur is nu ${this.monthlyRent}`);
        console.log(`Je hebt nu nog ${this.balance} op je rekening`);
        UI.updateScore(this.balance);
    }

    addIncome(UI) {
        this.balance += this.income;
        console.log(`Je hebt ${this.income} ontvangen, je hebt nu ${this.balance} euro op je rekening`);
        UI.updateScore(this.balance);
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
