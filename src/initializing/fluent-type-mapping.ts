import { TypeConverter } from "../core/type-converter";
import { PropertyMap } from "./mappings/property-map";
import { TypeMap } from "./mappings/type-map";
import { MapFromOpts, MapFromOptions } from "./map-from-options";
import { MapSourceOpts, MapSourceOptions } from "./map-source-options";
import { Reflection } from "./reflection";

export class FluentTypeMapping<TSrc, TDest> {

    converter: TypeConverter;

    private _typeMapping: TypeMap;

    constructor(mapping: TypeMap) {
        this._typeMapping = mapping;
    }

    /**
     * provide explicit mapping instruction for a simple property ie value type or string.
     * @param destinationProperty the name of the property
     * @param opts mapping instruction.
     */
    forMember(destinationProperty: string | ((dest: TDest) => any), opts: MapFromOpts<TSrc>): FluentTypeMapping<TSrc, TDest> {
        let propertyMap = new PropertyMap();

        propertyMap.destinationName = (typeof destinationProperty == "string") 
            ? destinationProperty
            : Reflection.getPropertyName(destinationProperty);
        
        propertyMap.destinationSetter = (instance, value) => instance[propertyMap.destinationName] = value;
        let options = new MapFromOptions<TSrc>(propertyMap);
        opts(options);
        this._typeMapping.propertyMaps.push(propertyMap);
        return this;
    }

    /**
     * apply source directive mapping
     * @param sourceProperty the source property of interest
     * @param opts what you want to do with the source.
     */
    withSource(sourceProperty: string | ((src: TSrc) => any), opts: MapSourceOpts): FluentTypeMapping<TSrc, TDest> {

        let propertyMap = new PropertyMap();

        propertyMap.sourceGetter = (typeof sourceProperty == "string")
            ? (instance: any) => instance[<string>sourceProperty]
            : sourceProperty;

        propertyMap.destinationType = this._typeMapping.destination;

        let options = new MapSourceOptions(propertyMap);
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