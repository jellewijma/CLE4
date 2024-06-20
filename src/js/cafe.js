import {Scene, Label, Font, Color, Timer, Vector} from "excalibur"

class Cafe extends Scene {

    monthLoop;
    incomeLoop;

    constructor(game) {
        super()

        this.game = game
        this.backgroundColor = Color.Gray

        // label increment
        let next = new Label({
            text: "Next Scene",
            color: Color.White,
            x: 700,
            y: 10,
            font: new Font({
                size: 20,
                family: 'Arial'
            }),
        });
        next.on('pointerup', () => {
            this.game.goToScene("shoppingcenter", { sceneActivationData: this.game.counter });
        });
        this.add(next);

        this.monthLoop = new Timer({
            fcn: () => {
                if (this.game.timerLeftInMonth > 0) {
                    this.game.timerLeftInMonth--;
                    console.log(this.game.timerLeftInMonth);
                } else {
                    this.game.timerLeftInMonth = 8;
                    this.game.increaseMonthlyRent();
                    console.log(this.game.timerLeftInMonth);
                }
            },
            interval: 500,
            repeats: true
        });
        this.add(this.monthLoop);
        this.incomeTimer();
    }

    incomeTimer() {
        const randomInterval = Math.floor(Math.random() * 3000) + 1000;
        this.incomeLoop = new Timer({

            fcn: () => {
                this.game.addIncome();
                this.incomeTimer();
            },
            interval: randomInterval,
            repeats: true
        });
        this.add(this.incomeLoop);
    }

    addNpcToCafe(npc) {
        this.add(npc);
        npc.pos = new Vector(100 + Math.random() * 400, 100 + Math.random() * 400); // Position NPCs randomly in the cafe
    }

    removeNpcFromCafe(npc) {
        this.remove(npc);
    }

    onActivate() {
        console.log("Je bent nu in het Café");
        console.log(this.game.timerLeftInMonth);

        // Add NPCs that are in the cafe
        this.game.npcsInCafe.forEach(npc => {
            this.addNpcToCafe(npc);
        });

        this.monthLoop.start();
        this.incomeLoop.start();
    }

    onDeactivate() {
        this.monthLoop.stop();
        this.incomeLoop.stop();
    }
}

export { Cafe }
