import { BlockIdsType } from '../BlockIdsType.js';
import Flowable from '../Flowable.js';

export enum DoubleFlowerType {
    Sunflower = 0
}

export default class Sunflower extends Flowable {
    public constructor(
        name = 'minecraft:sunflower', // Supposed to be "double_plant"
        type: DoubleFlowerType = DoubleFlowerType.Sunflower
    ) {
        super({
            name,
            id: BlockIdsType.DoublePlant,
            hardness: 0
        });
        this.meta = type;
    }
}
