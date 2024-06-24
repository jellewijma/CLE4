import { ImageSource, SpriteSheet, Loader } from 'excalibur';
import npcImage from '../images/npc.png';
import paidnpc from '../images/paidnpc.png';
import person from '../../public/assets/images/person.png';
import {TiledResource} from "@excaliburjs/plugin-tiled";

const Resources = {
    Npc: new ImageSource(npcImage),
    paidnpc: new ImageSource(paidnpc),
    CoffeeMachineLevel1: new ImageSource('assets/images/CoffeeMachine1.png'),
    CoffeeMachineLevel2: new ImageSource('assets/images/CoffeeMachine2.png'),
    TiledMapResource: new TiledResource('assets/tilemap/cle4-map.tmx'),
    Person: new ImageSource(person)
};

Resources.bottomWalk = SpriteSheet.fromImageSource({
    image: Resources.Person,
    grid: {
        rows: 1,
        columns: 4,
        spriteWidth: 64,
        spriteHeight: 64
    }
});

Resources.leftWalk = SpriteSheet.fromImageSource({
    image: Resources.Person,
    grid: {
        rows: 1,
        columns: 4,
        spriteWidth: 64,
        spriteHeight: 64
    }
});

Resources.rightWalk = SpriteSheet.fromImageSource({
    image: Resources.Person,
    grid: {
        rows: 1,
        columns: 4,
        spriteWidth: 64,
        spriteHeight: 64
    }
});

Resources.topWalk = SpriteSheet.fromImageSource({
    image: Resources.Person,
    grid: {
        rows: 1,
        columns: 4,
        spriteWidth: 64,
        spriteHeight: 64
    }
});

const ResourceLoader = new Loader();
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res);
}

export { Resources, ResourceLoader };
