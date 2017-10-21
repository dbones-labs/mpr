import { PropertyMap } from "./mappings/property-map";

export interface MapSourceOpts<TSrc, TDest> {
    (opt: MapSourceOptions<TSrc>): void;
}

export class MapSourceOptions<TSrc> {

    private _propertyMap: PropertyMap;

    constructor(propertyMap: PropertyMap) {
        this._propertyMap = propertyMap;
    }


    /**
     * this source value will be ignored
     */
    ignore() {
        this._propertyMap.ignoreSource = true;
    }
}