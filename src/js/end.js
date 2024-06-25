import { Scene, Color } from "excalibur";
import { Leaderboard } from './leaderboard'; // Zorg dat het pad correct is
import { Competitor } from './competitor'; // Zorg dat het pad correct is

class End extends Scene {
    constructor(game) {
        super();
        this.game = game;
        this.backgroundColor = Color.Black; // Stel een achtergrondkleur in

    }

    onActivate() {
        this.setupLeaderboard();
    }

    setupLeaderboard() {
        const leaderboard = new Leaderboard(this.game, Competitor.bankruptShops);
        leaderboard.display();
    }
}

export { End };
