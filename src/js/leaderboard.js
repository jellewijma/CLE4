import { Scene, Label, Font, Color, Vector } from 'excalibur';

export class Leaderboard {
    constructor(game, bankruptShops) {
        this.game = game;
        this.bankruptShops = bankruptShops;
    }

    display() {
        const baseY = 100; // Start Y-position for the first label
        const intervalY = 50; // Vertical space between labels

        this.bankruptShops.forEach((shopName, index) => {
            const positionLabel = new Label({
                text: `${index + 1}. ${shopName}`,
                pos: new Vector(64, baseY + (index * intervalY)),
                font: new Font({
                    size: 24,
                    color: Color.White
                }),
                textAlign: 'left'
            });
            positionLabel.z = 10
            this.game.currentScene.add(positionLabel);
        });
    }
}


