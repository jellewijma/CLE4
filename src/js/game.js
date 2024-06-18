import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode } from "excalibur"
import { Resources, ResourceLoader } from './resources.js';
import { Cafe } from './cafe.js';
import { ShoppingCenter } from './shoppingCenter.js';

export class Game extends Engine {

    timerLeftInMonth = 8;
    balance = 10000;
    monthlyRent = 500;

    constructor() {
        super({
            width: 1248,
            height: 704,
            maxFps: 60,
            //displayMode: DisplayMode.FitScreen
        });
        this.start(ResourceLoader).then(() => this.startGame());
    }

    startGame() {
        console.log("start de game!");
        this.add("cafe", new Cafe(this));
        this.add("shoppingcenter", new ShoppingCenter(this));
        this.goToScene("shoppingcenter", { sceneActivationData: this.timerLeftInMonth });
    }

    increaseMonthlyRent(UI) {
        if (this.balance < this.monthlyRent) {
            console.log("Je hebt niet genoeg geld om de huur te betalen")
            return;
        }
        this.balance -= this.monthlyRent;
        this.monthlyRent += 50;
        console.log(`De maandhuur is nu ${this.monthlyRent}`)
        console.log(`Je hebt nu nog ${this.balance} op je rekening`)
        UI.updateScore(this.balance);
    }

    addIncome(UI) {
        const income = 100// Math.floor(Math.random() * 1000) + 100;
        this.balance += income;
        console.log(`Je hebt ${income} ontvangen, je hebt nu ${this.balance} euro op je rekening`);
        UI.updateScore(this.balance);
    }
}

new Game();
