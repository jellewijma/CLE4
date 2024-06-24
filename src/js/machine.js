import { Actor, Vector, Color, Label, Font } from "excalibur";
import { Resources } from "./resources";

export class Machine extends Actor {

    resourceName;
    constructor(x, y, ui, upgradeCost, spritePrefix) {
        super({
            pos: new Vector(x, y),
            width: 50,
            height: 50,
            color: Color.Black,
            z: 15
        })

        this.spritePrefix = spritePrefix;
        this.level = 1;
        this.upgradeCost = upgradeCost;
        this.incomeIncrease = 200;
        this.resourceName = `${this.spritePrefix}Level1`;
        this.graphics.use(Resources[this.resourceName].toSprite())
        console.log(this.upgradeCost)
        this.ui = ui
    }

    updateSprite() {
        this.resourceName = `${this.spritePrefix}Level${this.level}`;
        this.graphics.use(Resources[this.resourceName].toSprite());
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

            width: 320,
            height: 100,
            color: Color.White,
        });

        const upgradeLabel = new Label({
            text: "Upgraden",
            pos: new Vector(posX - 110, posY - 10),
            font: new Font({
                size: 20,
                family: 'Arial',
                color: Color.Black,
            }),
        });

        const cancelLabel = new Label({
            text: "Sluiten",
            pos: new Vector(posX - 110, posY + 10),
            font: new Font({
                size: 20,
                family: 'Arial',
                color: Color.Black,
            }),
        });

        const levelLabel = new Label({
            text: `De koffiemachine is level: ${this.level}`,
            pos: new Vector(posX - 110, posY - 30),
            font: new Font({
                size: 20,
                family: 'Arial',
                color: Color.Black,
            }),
        });

        upgradeLabel.on('pointerdown', () => {
            if (engine.balance >= this.upgradeCost) {
                engine.balance -= this.upgradeCost;
                this.ui.updateScore(engine.balance);
                engine.income += this.incomeIncrease;
                this.level++;
                this.updateSprite();
                this.hideUpgradeOptions();
                console.log(`koffie apparaat is nu level ${this.level}`);
            } else {
                console.log('Niet genoeg geld');
            }
        });

        cancelLabel.on('pointerdown', () => {
            this.hideUpgradeOptions();
        });

        engine.add(background);

        if (this.level < 2) {
            engine.add(upgradeLabel);
        }
        engine.add(cancelLabel);
        engine.add(levelLabel)
        this.upgradePopup = { background, upgradeLabel, cancelLabel, levelLabel };
    }

    hideUpgradeOptions() {
        if (this.upgradePopup) {
            this.upgradePopup.background.kill();
            this.upgradePopup.upgradeLabel.kill();
            this.upgradePopup.cancelLabel.kill();
            this.upgradePopup.levelLabel.kill();
            this.upgradePopup = null;
        }
    }
}