import { Actor, Vector, Color } from "excalibur";

export class Machine extends Actor {


    constructor(x, y, upgradeCost) {
        super({
            pos: new Vector(x, y),
            width: 50,
            height: 50,
            color: Color.Black,
        })

        this.level = 1;
        this.upgradeCost = upgradeCost;
        this.incomeIncrease = 200;
        console.log(this.upgradeCost)
    }

    onInitialize(engine) {
        this.on('pointerdown', () => {
            if (engine.balance >= this.upgradeCost) {
                console.log('je hebt genoeg geld, de upgrade is voltooid');
                engine.balance -= this.upgradeCost;
                engine.income += this.incomeIncrease;
                this.level++;
            } else {
                console.log('niet genoeg geld');
            }
        })
    }


}