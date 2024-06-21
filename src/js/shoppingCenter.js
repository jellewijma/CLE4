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
            z: 10,
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
        this.ui.pos.x = 10;
        this.ui.pos.y = 10;
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

        this.game.input.pointers.primary.on('move', this.handleMove.bind(this));
        this.game.input.pointers.primary.on('down', this.handleDown.bind(this));
        document.addEventListener('touchmove', this.handleMove.bind(this), { passive: false });
        document.addEventListener('touchstart', this.handleDown.bind(this), { passive: false });
        document.addEventListener('touchend', this.onPointerUp.bind(this), { passive: false });

    }

    // Handle pointer/touch start
    handleDown(evt) {
        if (evt && typeof evt.preventDefault === 'function') {
            evt.preventDefault();
        }
        let worldPos = this.getWorldPos(evt);
        console.log("Pointer/touch down");
        this.swipeStartPos = { x: worldPos.x, y: worldPos.y };
        this.isSwiping = true;
    }

    // Handle pointer/touch move
    handleMove(evt) {
        if (evt && typeof evt.preventDefault === 'function') {
            evt.preventDefault();
        }
        if (!this.isSwiping) return;
        let worldPos = this.getWorldPos(evt);
        console.log("Pointer/touch move");
        if (this.lastPointerPos) {
            const deltaX = worldPos.x - this.lastPointerPos.x;

            // not outside the map
            if (this.game.currentScene.camera.pos.x - deltaX < 145) {
                this.game.currentScene.camera.pos.x = 145;
                console.log("niet verder dan 0")
            } else if (this.game.currentScene.camera.pos.x - deltaX > 992 - 146) {
                this.game.currentScene.camera.pos.x = 992 - 146;
                console.log("niet verder dan 500")
            } else {
                this.game.currentScene.camera.pos.x -= deltaX;
            }
        }
        this.lastPointerPos = worldPos;
    }

    // Handle pointer/touch end
    onPointerUp(evt) {
        this.isSwiping = false;
        this.lastPointerPos = null;
    }

    // Utility function to normalize touch and pointer positions
    getWorldPos(evt) {
        let pos = evt.touches ? evt.touches[0] : evt;
        return { x: pos.clientX, y: pos.clientY }; // Assuming worldPos can be derived from clientX/Y for simplicity
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