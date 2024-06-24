import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode } from "excalibur"
import { Resources, ResourceLoader } from './resources.js';
import { Cafe } from './cafe.js';
import { ShoppingCenter } from './shoppingCenter.js';
import { End } from './end.js';
import { Competitor } from './competitor.js';

export class Game extends Engine {

    timerLeftInMonth = 8;
    balance = 10000;
    monthlyRent = 1000;
    income = 1000;

    constructor() {
        super({
            width: 1248,
            height: 704,
            maxFps: 60,
            //displayMode: DisplayMode.FitScreen
        });
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
            this.goToScene('end')
            return;
        }

        if (this.balance > 0) {
            this.balance -= this.monthlyRent;
        }

        this.monthlyRent += 50;
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
}

new Game();
