import { Actor, Vector, CollisionType, Color, GraphicsGroup, Line } from "excalibur";

export class Path extends Actor {
    constructor(points) {
        super({
            pos: new Vector(0, 0),
            width: 0,
            height: 0,
            collisionType: CollisionType.PreventCollision
        });

        this.points = points;
    }

    onInitialize(engine) {
        // Create the path
        const lines = this.points.slice(1).map((point, index) => {
            const line = new Line({
                start: this.points[index],
                end: point,
                color: Color.Brown,
                thickness: 5
            });
            // Set line opacity to 0 to make it invisible
            line.opacity = 0;
            return line;
        });

        // Add the lines to a graphics group and set it to the actor
        this.graphics.use(new GraphicsGroup({ members: lines }));
    }
}
