import { Scene, Label, Color, FontUnit, Font, Vector, Actor } from 'excalibur';

export class StartScreen extends Scene {
    onInitialize(engine) {
        // Create a label for the title
        const title = new Label({
            text: 'My Awesome Game',
            pos: new Vector(engine.drawWidth / 2, engine.drawHeight / 2 - 100),
            color: Color.White,
            font: new Font({
                size: 40,
                unit: FontUnit.Px,
                family: 'Arial'
            })
        });
        title.anchor.setTo(0.5, 0.5); // Center the label

        // Create a button for starting the game
        const startButton = new Actor({
            pos: new Vector(engine.drawWidth / 2, engine.drawHeight / 2),
            width: 200,
            height: 50,
            color: Color.Green
        });

        // Add text to the button
        const buttonText = new Label({
            text: 'Start Game',
            pos: new Vector(0, 0),
            color: Color.White,
            font: new Font({
                size: 20,
                unit: FontUnit.Px,
                family: 'Arial'
            })
        });
        buttonText.anchor.setTo(0.5, 0.5); // Center the text
        startButton.addChild(buttonText);

        // Add an event handler for button clicks
        startButton.on('pointerup', () => {
            engine.goToScene('game');
        });

        this.add(title);
        this.add(startButton);
    }
}
