import { BlockIdsType } from '../BlockIdsType.js';
import Solid from '../Solid.js';

export enum SlabType {
    Stone = 0,
    Sand,
    Cobble,
    Wood,
    Brick,
    SmoothStoneBrick,
    Quartz,
    NetherBrick
}

export default class StoneSlab extends Solid {
    public constructor(name = 'minecraft:stone_slab', type: SlabType = SlabType.Stone) {
        super({
            name,
            id: BlockIdsType.StoneSlab,
            hardness: 2
        });
        this.meta = type;
    }
}
