import { PropertyMap } from "./mappings/property-map";

export interface MapSourceOpts {
    (opt: MapSourceOptions): void;
}

export class MapSourceOptions {

    private _propertyMap: PropertyMap;

    constructor(propertyMap: PropertyMap) {
        this._propertyMap = propertyMap;
    }

    /**
     * this source value will be ignored
     */
    flatten() {
        this._propertyMap.flattenSourceToDestination = true;
    }

    /**
     * this source value will be ignored (please use flatten instead)
     */
    flattern() {
        this._propertyMap.flattenSourceToDestination = true;
    }
}