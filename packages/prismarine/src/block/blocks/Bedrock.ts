import { BlockIdsType } from '../BlockIdsType.js';
import Solid from '../Solid.js';

export default class Bedrock extends Solid {
    public constructor() {
        super({
            name: 'minecraft:bedrock',
            id: BlockIdsType.Bedrock,
            hardness: -1
        });
    }

    public isBreakable() {
        return false;
    }

    public getBlastResistance() {
        return 18_000_000;
    }
}
