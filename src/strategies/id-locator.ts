import { Dictionary } from "../dictionary";

/**
 * has a cache of how to get and id for known types
 */
export interface IdLocator {

    /**
     * gets the id from the instance or return null
     * @param instance the instance to which we need the id value
     * @param type the instance type
     */
    getId(instance: any, type: string): string;

    setId(type: string, getter: (instance: any) => string): void;
}

export class DefaultIdLocator implements IdLocator {

    _idGetters = new Dictionary<(instance: any) => string>();

    setId(type: string, getter: (instance: any) => string): void {
        if(getter == null) return;
        this._idGetters.set(type, getter);
    }

    getId(instance: any, type: string): string {

        let getter = this._idGetters.get(type);
        if (getter == null) return null;
        return getter(instance);

    }
}