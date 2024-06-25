import { Engine, DisplayMode, Vector, Scene } from 'excalibur';
import { Resources, ResourceLoader } from './resources.js';
import { Cafe } from './cafe.js';
import { ShoppingCenter } from './shoppingCenter.js';
import { End } from './end.js';
import { Competitor } from './competitor.js';

export class Game extends Engine {
    timerLeftInMonth = 8;
    balance = 1000;
    monthlyRent = 200;
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

        this.start(ResourceLoader).then(() => this.startGame());
        this.backgroundMusic = Resources.BackgroundMusic;
    }


    startGame() {
        console.log("start de game!");
        this.add("cafe", new Cafe(this));
        this.add("shoppingcenter", new ShoppingCenter(this));
        this.add("end", new End(this));
        this.goToScene("shoppingcenter", { sceneActivationData: this.timerLeftInMonth });
    }

    increaseMonthlyRent(UI) {
        if (this.balance < this.monthlyRent) {
            console.log("Je hebt niet genoeg geld om de huur te betalen")
            Competitor.bankruptShops.push("Jij");
            Competitor.bankruptShops.push("Dunkin Donuts");
            Competitor.bankruptShops.push("Mac Donalds");
            Competitor.bankruptShops.push("Burger King");
            Competitor.bankruptShops.push("KFC");
            this.goToScene("end");
            this.goToScene('end')
            return;
        }

        if (this.balance > 0) {
            this.balance -= this.monthlyRent;
        }

        this.monthlyRent += 50;
        UI.updateRent(this.monthlyRent);
        console.log(`De maandhuur is nu ${this.monthlyRent}`)
        UI.updateScore(this.balance);

        this.currentScene.actors.forEach(actor => {
            if (actor instanceof Competitor) {
                if (actor.balance > 0) {
                    actor.balance -= this.monthlyRent;
                }
                if (actor.balance < 0) {
                    actor.opponentGameOver(this);
                } else {
                    console.log(`${actor.name} paid ${this.monthlyRent} rent, new balance is ${actor.balance}`);
                }
            }
        });
    }

    addIncome(UI) {
        this.balance += this.income;
        // console.log(`Je hebt ${this.income} ontvangen, je hebt nu ${this.balance} euro op je rekening`);
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

new Game();

import '../css/style.css';
