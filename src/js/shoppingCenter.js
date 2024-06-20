import { Scene, Label, Font, Color, Timer } from "excalibur"
import { CreateTilemap } from "./loadTilemap";
import { UI } from "./ui";

class ShoppingCenter extends Scene {

    monthLoop;

    incomeLoop;

    ui;
    uiM;
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
                    console.log(this.game.timerLeftInMonth);
                } else {
                    this.game.timerLeftInMonth = 8;
                    this.game.increaseMonthlyRent(this.ui);
                    console.log(this.game.timerLeftInMonth);
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


        // Swipe tracking
        this.isSwiping = false;
        this.swipeStartPos = null;
        this.lastPointerPos = null;

        // Listen for pointer events'
        // this.game.input.pointers.primary.on('move', (evt) => {
        //     console.log("Pointer move");
        //     if (this.lastPointerPos) {
        //         const deltaX = evt.worldPos.x - this.lastPointerPos.x;
        //         this.game.currentScene.camera.pos.x -= deltaX;
        //     }
        //     this.lastPointerPos = evt.worldPos;
        // }
        // );
        // this.game.input.pointers.primary.on('down', (evt) => {
        //     console.log("Pointer move");
        //     if (this.lastPointerPos) {
        //         const deltaX = evt.worldPos.x - this.lastPointerPos.x;
        //         this.game.currentScene.camera.pos.x -= deltaX;
        //     }
        //     this.lastPointerPos = evt.worldPos;
        // }
        // );
        // this.on('pointerdown', this.onPointerDown.bind(this));
        // this.on('pointermove', this.onPointerMove.bind(this));
        // this.on('pointerup', this.onPointerUp.bind(this));
        this.game.input.pointers.primary.on('down', this.onPointerDown.bind(this));
        this.game.input.pointers.primary.on('move', this.onPointerMove.bind(this));
        this.game.input.pointers.primary.on('up', this.onPointerUp.bind(this));

    }

    onPointerDown(evt) {
        console.log("Pointer down");
        this.swipeStartPos = { x: evt.worldPos.x, y: evt.worldPos.y };
        this.isSwiping = true;
    }

    onPointerMove(evt) {
        console.log("Pointer move");
        if (!this.isSwiping || !this.swipeStartPos) return;

        const deltaX = evt.worldPos.x - this.swipeStartPos.x;
        // Optional: Implement vertical swiping with deltaY
        // const deltaY = evt.worldPos.y - this.swipeStartPos.y;

        // Adjust the camera based on deltaX
        if (Math.abs(deltaX) > 10) { // Threshold to detect swipe
            this.game.currentScene.camera.pos.x -= deltaX;
            this.swipeStartPos = { x: evt.worldPos.x, y: evt.worldPos.y }; // Reset start position for continuous swiping
        }
    }

    onPointerUp() {
        console.log("Pointer up");
        this.isSwiping = false;
        this.swipeStartPos = null;
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