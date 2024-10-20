import { PropertyMap } from "./mappings/property-map";

export interface MapFromOpts<TSrc> {
    (opt: MapFromOptions<TSrc>): void;
}

export class MapFromOptions<TSrc> {

    private _propertyMap: PropertyMap;

    constructor(propertyMap: PropertyMap) {
        this._propertyMap = propertyMap;
    }

    /**
     * mapping options
     * @param source the source where we can source the value from.
     * @param sourceName the name of the source, this is only need if you passed a delegae in for the source and we a mappping to an Anon type.
     */
    mapFrom(source: string | ((srcInstance: TSrc ) => any), sourceName: string = null) {

        if (typeof source === 'string') {
            this._propertyMap.sourceGetter = (instance: any) => {
                return instance[source];
            }
            this._propertyMap.sourceName = source;
        }
        else {
            this._propertyMap.sourceGetter = source;
            this._propertyMap.sourceName = sourceName;
        }

    }

    /**
     * a function which will provide the value.
     * @param func a func which will result in a value you want.
     */
    using(func: (src: TSrc) => any): void {
        this._propertyMap.sourceGetter = (instance: any) => {
            return func(instance);
        };
    }

    /**
     * this map will IGNORE this destination value
     */
    ignore() {
        this._propertyMap.ignoreDestination = true;
    }
}


