import WhiteConcretePowder, { ConcretePowderColorType } from './WhiteConcretePowder.js';

export default class PinkConcrete extends WhiteConcretePowder {
    public constructor() {
        super('minecraft:pink_concrete_powder', ConcretePowderColorType.Pink);
    }
}
