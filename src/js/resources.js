import { ImageSource, Sound, Resource, Loader } from 'excalibur'
import { TiledResource } from '@excaliburjs/plugin-tiled'

// voeg hier jouw eigen resources toe
const Resources = {
    Npc: new ImageSource('assets/images/npc.png'),
    paidnpc: new ImageSource('assets/images/paidnpc.png'),
    CoffeeMachineLevel1: new ImageSource('assets/images/CoffeeMachine1.png'),
    CoffeeMachineLevel2: new ImageSource('assets/images/CoffeeMachine2.png'),
    TiledMapResource: new TiledResource('assets/tilemap/cle4-map.tmx'),
    Cafe: new TiledResource('assets/tilemap/cafelayout.tmx'),
    Backdrop: new ImageSource('assets/images/backdrop.png'),
    Button: new ImageSource('assets/images/button.png')
}

const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }