import { Actor, Color, Vector, Timer, Label, Font } from 'excalibur';

export class Competitor extends Actor {
    constructor(name, position) {
        super({
            pos: new Vector(position.x, position.y),
            width: 50,
            height: 50,
            color: Color.Transparent
        });

        this.name = name;
        this.balance = 2000;  // Begin saldo
        this.income = this.getRandomIncome();  // Willekeurig inkomen

        this.on('pointerdown', () => {
            console.log('billen');
        });

    }

    onInitialize(engine) {

        this.incomeTimer(engine)
        console.log('hey');
    }

    getRandomIncome() {
        const incomeArray = [500, 700, 1000, 1200, 1500];
        return incomeArray[Math.floor(Math.random() * incomeArray.length)];
    }

    incomeTimer(engine) {

        const randomInterval = Math.floor(Math.random() * 3000) + 1000;
        const timer = new Timer({
            fcn: () => {
                this.addIncome();
                this.incomeTimer(engine);
            },
            interval: randomInterval,
            repeats: false
        });
        engine.currentScene.add(timer);
        timer.start();
    }

    addIncome() {
        this.balance += this.income;
        console.log(`${this.name} received ${this.income}, new balance is ${this.balance}`);
        if (this.balance <= 0) {
            this.opponentGameOver();
        }
    }

    opponentGameOver(game) {
        console.log(`${this.name} is bankrupt`);
        this.showBankruptMessage(game)
        this.kill();
    }

    showBankruptMessage(game) {

        const message = new Label({
            text: `${this.name} is failliet`,
            pos: new Vector(624, 352),  // Midden van het scherm
            font: new Font({
                size: 50,
                color: Color.Red,
                textAlign: 'center'
            })
        });

        message.z = 10
        game.add(message);

        // Timer om het bericht na 3 seconden te verwijderen
        const timer = new Timer({
            fcn: () => {
                message.kill();
            },
            interval: 3000,
            repeats: false
        });

        game.add(timer);
        timer.start();
    }
}