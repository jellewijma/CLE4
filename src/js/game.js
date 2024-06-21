import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode } from "excalibur"
import { Resources, ResourceLoader } from './resources.js';
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
        this.start(ResourceLoader).then(() => this.startGame());
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
            this.goToScene('end')
            return;
        }
        this.balance -= this.monthlyRent;
        this.monthlyRent += 50;
        console.log(`De maandhuur is nu ${this.monthlyRent}`)
        console.log(`Je hebt nu nog ${this.balance} op je rekening`)
        UI.updateScore(this.balance);
    }

    addIncome(UI) {
        this.balance += this.income;
        console.log(`Je hebt ${this.income} ontvangen, je hebt nu ${this.balance} euro op je rekening`);
        UI.updateScore(this.balance);
    }
}

new Game();
