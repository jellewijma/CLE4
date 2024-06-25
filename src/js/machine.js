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
            z: 10,
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
        const posX = this.pos.x + 96;
        const posY = this.pos.y; // Boven de machine

        const background = new Actor({
            pos: new Vector(posX, posY),
            width: 128,
            height: 64,
            z: 19,
            color: Color.White,
        });

        const upgradeLabel = new Label({
            text: "Upgraden",
            pos: new Vector(posX - 64, posY - 32),
            font: new Font({
                size: 12,
                family: 'Arial',
                color: Color.Black,
            }),
            anchor: Vector.Half,
            z: 20,
        });

        const cancelLabel = new Label({
            text: "Sluiten",
            pos: new Vector(posX - 64, posY - 16),
            font: new Font({
                size: 12,
                family: 'Arial',
                color: Color.Black,
            }),
            anchor: Vector.Half,
            z: 20,
        });

        const levelLabel = new Label({
            text: `De koffiemachine is level: ${this.level}`,
            pos: new Vector(posX - 64, posY),
            font: new Font({
                size: 12,
                family: 'Arial',
                color: Color.Black,
            }),
            anchor: Vector.Half,
            z: 20,
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