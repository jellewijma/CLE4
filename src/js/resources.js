import { ImageSource, Loader } from 'excalibur';
import npcImage from '../images/npc.png';

// Define resources
const Resources = {
    Npc: new ImageSource(npcImage)
};

// Create a new loader and add resources to it
const ResourceLoader = new Loader(Object.values(Resources));

export { Resources, ResourceLoader };

