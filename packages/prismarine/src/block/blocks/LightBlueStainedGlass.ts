import StainedGlass, { StainedGlassType } from './WhiteStainedGlass.js';

export default class LightBlueStainedGlass extends StainedGlass {
    public constructor() {
        super('minecraft:light_blue_stained_glass', StainedGlassType.LightBlue);
    }
}
