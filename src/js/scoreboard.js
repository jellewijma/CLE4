import { Actor, Label, Font, FontUnit, TextAlign, Color, Vector } from "excalibur";

export class ScoreBoard extends Actor {
    constructor(x, y) {
        super({
            pos: new Vector(x, y),
        });
    }
}
