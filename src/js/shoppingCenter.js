import { Scene, Label, Font, Color, Timer } from "excalibur"
import { CreateTilemap } from "./loadTilemap";
import { UI } from "./ui";
import { Competitor } from "./competitor";
class ShoppingCenter extends Scene {

    monthLoop;
    incomeLoop;
    ui;


    constructor(game) {
        super()

        this.game = game
        const createTileMap = new CreateTilemap();
        this.add(createTileMap);



        // label increment
        let next = new Label({
            text: "Next Scene",
            color: Color.White,
            x: 700,
            y: 50,
            font: new Font({
                size: 20,
                family: 'Arial'
            }),
        });
        next.on('pointerup', () => {
            this.game.goToScene("cafe", { sceneActivationData: this.game.counter });
        });
        this.add(next);

        this.monthLoop = new Timer({
            fcn: () => {
                if (this.game.timerLeftInMonth > 0) {
                    this.game.timerLeftInMonth--;
                    // console.log(this.game.timerLeftInMonth);
                } else {
                    this.game.timerLeftInMonth = 8;
                    this.game.increaseMonthlyRent(this.ui);
                    // console.log(this.game.timerLeftInMonth);
                }
            },
            interval: 500,
            repeats: true
        });
        this.add(this.monthLoop);
        this.incomeTimer();

        this.ui = new UI();
        this.ui.pos.x = 20;
        this.ui.pos.y = 20;
        this.add(this.ui);

        // this.uiM = new UI();
        // this.uiM.pos.x = 20;
        // this.uiM.pos.y = 20;
        // // this.uiM.text = "Maandhuur: 500";
        // this.add(this.uiM);
        this.addCompetitors()
    }


    addCompetitors() {
        const competitors = [
            { name: 'Competitor A', position: { x: 100, y: 200 } }
        ];
        competitors.forEach(comp => {
            const competitor = new Competitor(comp.name, comp.position);
            this.add(competitor);
        });
    }

    incomeTimer() {
        const randomInterval = Math.floor(Math.random() * 3000) + 1000;
        this.incomeLoop = new Timer({

            fcn: () => {
                this.game.addIncome(this.ui);

                this.incomeTimer(); // Start de timer opnieuw met een nieuw willekeurig interval
            },
            interval: randomInterval,
            repeats: true
        });

        this.add(this.incomeLoop);
    }

    onActivate() {
        console.log("Je bent nu in het winkelcentrum")
        console.log(this.game.timerLeftInMonth)
        this.monthLoop.start();
        this.incomeLoop.start()
    }
}



export { ShoppingCenter }