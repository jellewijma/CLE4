import { ImageSource, SpriteSheet, Loader } from 'excalibur';
import { TiledResource } from "@excaliburjs/plugin-tiled";

const Resources = {
    Npc: new ImageSource('assets/images/npc.png'),
    paidnpc: new ImageSource('assets/images/paidnpc.png'),
    CoffeeMachineLevel1: new ImageSource('assets/images/CoffeeMachine1.png'),
    CoffeeMachineLevel2: new ImageSource('assets/images/CoffeeMachine2.png'),
    TiledMapResource: new TiledResource('assets/tilemap/cle4-map.tmx'),
    Cafe: new TiledResource('assets/tilemap/cafelayout.tmx'),
    Backdrop: new ImageSource('assets/images/backdrop.png'),
    Button: new ImageSource('assets/images/button.png'),
    // Person: new ImageSource('assets/images/person.png'),
    // bottomWalk: new SpriteSheet().fromImageSource({
    //     image: new ImageSource('assets/images/person.png'),
    //     grid: {
    //         rows: 1,
    //         columns: 4,
    //         spriteWidth: 64,
    //         spriteHeight: 64
    //     }
    // }),
    // leftWalk: new SpriteSheet().fromImageSource({
    //     image: new ImageSource('assets/images/person.png'),
    //     grid: {
    //         rows: 1,
    //         columns: 4,
    //         spriteWidth: 64,
    //         spriteHeight: 64
    //     }
    // }),
    // rightWalk: new SpriteSheet().fromImageSource({
    //     image: new ImageSource('assets/images/person.png'),
    //     grid: {
    //         rows: 1,
    //         columns: 4,
    //         spriteWidth: 64,
    //         spriteHeight: 64
    //     }
    // }),
    // topWalk: new SpriteSheet().fromImageSource({
    //     image: new ImageSource('assets/images/person.png'),
    //     grid: {
    //         rows: 1,
    //         columns: 4,
    //         spriteWidth: 64,
    //         spriteHeight: 64
    //     }
    // })
};

const ResourceLoader = new Loader();
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res);
}

export { Resources, ResourceLoader };
