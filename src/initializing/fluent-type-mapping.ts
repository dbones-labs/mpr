import { TypeConverter } from "../core/type-converter";
import { PropertyMap } from "./mappings/property-map";
import { TypeMap } from "./mappings/type-map";
import { MapFromOpts, MapFromOptions } from "./map-from-options";

export class FluentTypeMapping<TSrc, TDest> {

    converter: TypeConverter;

    private _typeMapping: TypeMap;

    constructor(mapping: TypeMap) {
        this._typeMapping = mapping;
        this._typeMapping
    }

    /**
     * provide explict mapping instunction for a simple propty ie value type or string.
     * @param destinationProperty the name of the property
     * @param opts mapping instuctions.
     */
    forMember(destinationProperty: string, opts: MapFromOpts<TSrc>): FluentTypeMapping<TSrc, TDest> {
        //let result = this.forMemberDetailed(destinationProperty, opts);
        return this;
    }


    forSource(sourceProperty: string, opts: MapFromOpts<TSrc>): FluentTypeMapping<TSrc, TDest> {
        let propertyMap = new PropertyMap();
        let options = new MapFromOptions(propertyMap);
        opts(options);
        this._typeMapping.sourcePropertyMaps.push(propertyMap);
        return this;
    }

    /**
     * supply a TypeConverter to use.
     * @param typeConverter the converter to use
     */
    using(typeConverter: TypeConverter): void {
        this._typeMapping.converter = typeConverter;
    }

}