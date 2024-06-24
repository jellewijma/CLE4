import {ImageSource, Sound, Resource, Loader, SpriteSheet} from 'excalibur'
import { TiledResource } from '@excaliburjs/plugin-tiled'
import npcImage from '../images/npc.png';
import paidnpc from '../images/paidnpc.png'
import person from '../images/person.png'

// voeg hier jouw eigen resources toe
const Resources = {
    Npc: new ImageSource(npcImage),
    paidnpc: new ImageSource(paidnpc),
    CoffeeMachineLevel1: new ImageSource('assets/images/CoffeeMachine1.png'),
    CoffeeMachineLevel2: new ImageSource('assets/images/CoffeeMachine2.png'),
    TiledMapResource: new TiledResource('assets/tilemap/cle4-map.tmx'),
    Person: new ImageSource(person)
    // Cafe: new TiledResource('assets/tilemap/CafeLayout.tmx'),
}

Resources.PersonSpriteSheet = SpriteSheet.fromImageSource({
    image: Resources.Person,
    grid: {
        rows: 1,
        columns: 4,
        spriteWidth: 64,
        spriteHeight: 64
    }
});

const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }