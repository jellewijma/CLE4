import { ImageSource, Sound, Resource, Loader } from 'excalibur'
import { TiledResource } from '@excaliburjs/plugin-tiled'
import npcImage from '../images/npc.png';
import paidnpc from '../images/paidnpc.png'
import thinking from '../images/thinking.png'

// voeg hier jouw eigen resources toe
const Resources = {
    Npc: new ImageSource(npcImage),
    paidnpc: new ImageSource(paidnpc),
    thinking: new ImageSource(thinking),


    TiledMapResource: new TiledResource('public/assets/tilemap/cle4-map.tmx')
}

const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }