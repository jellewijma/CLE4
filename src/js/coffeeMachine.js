import { Machine } from './machine.js';

export class CoffeeMachine extends Machine {
    constructor(x, y, ui, spritePrefix) {
        console.log("CoffeeMachine", ui)
        super(x, y, ui, 100, "CoffeeMachine")
    }
}