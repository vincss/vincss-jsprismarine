import Armor from '../Armor.js';
import { ItemIdsType } from '../ItemIdsType.js';

export default class LeatherLeggings extends Armor {
    public constructor() {
        super({
            name: 'minecraft:leather_leggings',
            id: ItemIdsType.LeatherPants
        });
    }

    public getMaxDurability() {
        return 75;
    }

    public getArmorDefensePoints() {
        return 2;
    }
}
