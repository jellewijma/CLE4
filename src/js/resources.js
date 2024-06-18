import { ImageSource, Sound, Resource, Loader } from 'excalibur'
import { TiledResource } from '@excaliburjs/plugin-tiled'

// voeg hier jouw eigen resources toe
const Resources = {

    TiledMapResource: new TiledResource('public/assets/tilemap/cle4-map.tmx')
}

const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }