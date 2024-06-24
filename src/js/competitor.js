import { Actor, Color, Vector, Timer, Label, Font } from 'excalibur';

export class Competitor extends Actor {

    static bankruptShops = [];

    constructor(name, position) {
        super({
            pos: new Vector(position.x, position.y),
            width: 50,
            height: 50,
            color: Color.Transparent
        });

        this.name = name;
        this.balance = 10000;  // Begin saldo
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
        const incomeArray = [500];
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
        Competitor.bankruptShops.push(this.name);
        console.log(`${this.name} is bankrupt`);
        if (Competitor.bankruptShops.length === 3) { // Aanname: er zijn in totaal 5 tegenstanders
            Competitor.bankruptShops.push('jij')
            game.goToScene("end"); // Aanname: deze methode schakelt over naar de eindscene
        }
        this.showBankruptMessage(game)
        console.log(Competitor.bankruptShops)


    }



    showBankruptMessage(game) {

        const message = new Label({
            text: `${this.name} is failliet`,
            pos: new Vector(207, 230),  // Midden van het scherm
            font: new Font({
                size: 20,
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
                this.kill()
            },
            interval: 3000,
            repeats: false
        });

        game.add(timer);
        timer.start();
    }
}