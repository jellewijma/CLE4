import { ImageSource, Sound, Resource, Loader } from 'excalibur'
import { TiledResource } from '@excaliburjs/plugin-tiled'
// import thinking from '../images/thinking.png'

// voeg hier jouw eigen resources toe
const Resources = {
    Npc: new ImageSource('assets/images/npc.png'),
    paidnpc: new ImageSource('assets/images/paidnpc.png'),
    // thinking: new ImageSource(thinking),
    CoffeeMachineLevel1: new ImageSource('assets/images/CoffeeMachine1.png'),
    CoffeeMachineLevel2: new ImageSource('assets/images/CoffeeMachine2.png'),
    TiledMapResource: new TiledResource('assets/tilemap/cle4-map.tmx'),
    // Cafe: new TiledResource('assets/tilemap/CafeLayout.tmx'),
}

const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }