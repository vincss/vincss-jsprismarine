import Armor from '../Armor.js';
import { ItemIdsType } from '../ItemIdsType.js';

export default class LeatherHelmet extends Armor {
    public constructor() {
        super({
            name: 'minecraft:leather_helmet',
            id: ItemIdsType.LeatherCap
        });
    }

    public getMaxDurability() {
        return 55;
    }

    public getArmorDefensePoints() {
        return 1;
    }
}
