import { Engine, Timer } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Shoppingcentre } from "./shoppingcentre.js"
import { Cafe } from "./cafe.js"

export class Game extends Engine {

    constructor() {
        super({
            width: 1280,
            height: 720,
            maxFps: 60,
            //displayMode: DisplayMode.FitScreen
        })
        this.startingMoney = 2000;
        this.balance = this.startingMoney;
        this.rent = 500;
        this.income = 100;



        this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame() {

        const shoppingCentre = new Shoppingcentre(this);
        const cafe = new Cafe(this);

        this.add("shoppingcentre", shoppingCentre);
        this.add("cafe", cafe);
        this.goToScene("shoppingcentre");

        this.incomeTimer();
    }

    incomeTimer() {
        console.log('income')
        new Timer(() => {
            this.balance += this.income;
            console.log(`inkomen gestort ${this.balance}`)
        }, 1000, true).start()
    }

    rentTimer() {

    }
}



new Game()