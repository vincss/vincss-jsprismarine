import WhiteConcretePowder, { ConcretePowderColorType } from './WhiteConcretePowder.js';

export default class MagentaConcrete extends WhiteConcretePowder {
    public constructor() {
        super('minecraft:magenta_concrete_powder', ConcretePowderColorType.Magenta);
    }
}
