import { Actor, Vector, Color, Label, Font } from "excalibur";

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
            if (!this.upgradePopup) {
                this.showUpgradeOptions(engine);
            }
        });
    }

    showUpgradeOptions(engine) {
        const posX = this.pos.x;
        const posY = this.pos.y - 60; // Boven de machine

        const background = new Actor({
            pos: new Vector(posX, posY),
            width: 120,
            height: 50,
            color: Color.White,
        });

        const upgradeLabel = new Label({
            text: "Upgraden",
            pos: new Vector(posX - 30, posY - 10),
            font: new Font({
                size: 20,
                family: 'Arial',
                color: Color.Black,
            }),
        });

        const cancelLabel = new Label({
            text: "Niet upgraden",
            pos: new Vector(posX - 30, posY + 10),
            font: new Font({
                size: 20,
                family: 'Arial',
                color: Color.Black,
            }),
        });

        upgradeLabel.on('pointerdown', () => {
            if (engine.balance >= this.upgradeCost) {
                engine.balance -= this.upgradeCost;
                engine.income += this.incomeIncrease;
                this.level++;
                this.hideUpgradeOptions();
            } else {
                console.log('Niet genoeg geld');
            }
        });

        cancelLabel.on('pointerdown', () => {
            this.hideUpgradeOptions();
        });

        engine.add(background);
        engine.add(upgradeLabel);
        engine.add(cancelLabel);

        this.upgradePopup = { background, upgradeLabel, cancelLabel };
    }

    hideUpgradeOptions() {
        if (this.upgradePopup) {
            this.upgradePopup.background.kill();
            this.upgradePopup.upgradeLabel.kill();
            this.upgradePopup.cancelLabel.kill();
            this.upgradePopup = null;
        }
    }
}