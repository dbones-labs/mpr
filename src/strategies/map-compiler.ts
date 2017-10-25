import { TypeMap } from "../initializing/mappings/type-map";
import { Configuration } from "../configuration";
import { TypeConverter } from "../core/type-converter";
import { TypeMeta } from "../initializing/metas/type-meta";
import { Dictionary } from "../dictionary";
import { Setter, DefaultTypeConverter } from "../core/default-type-converter";
import { MappingContext } from "../core/mapping-context";
import { MapInformation } from "../core/map-information";

export interface MapCompiler {
    Build(map: TypeMap, typeMetas: Dictionary<TypeMeta>, config: Configuration): TypeConverter;
}

export class DefaultMapCompiler implements MapCompiler {

    Build(map: TypeMap, typeMetas: Dictionary<TypeMeta>, config: Configuration): TypeConverter {
        if (map.converter != null) return map.converter;

        let destinationMeta = typeMetas.get(map.destination);
        let sourceMeta = typeMetas.get(map.source);

        let setters: any = {};


        //create default mappings from the property names.
        destinationMeta.propertiesKeyedOnCamelCase.keys.forEach(propertyName => {

            //note that camel case will be used internally.
            let destProperty = destinationMeta.propertiesKeyedOnCamelCase.get(propertyName);
            let srcProperty = sourceMeta.propertiesKeyedOnCamelCase.get(propertyName);

            //there is no source skip setting the destination;
            if (srcProperty == null) return;

            //create delegate for the src => destination 
            setters[destProperty.name] = <Setter>((ctx: MappingContext) => {
                
                //we know the main key value, we can just create it hear.
                var info = new MapInformation(srcProperty.mapComponent,destProperty.mapComponent);

                var innerCtx = new MappingContext();
                innerCtx.source = ctx.source[srcProperty.name];
                innerCtx.destination = ctx.destination == null ? null : ctx.destination[destProperty.name];  
                innerCtx.mapInformation = info;
                innerCtx.mapper = ctx.mapper;

                //this will treat a partial source as a 'update/delta'.
                if(innerCtx.source === undefined) return;

                //map the single property.
                ctx.mapper.mapIt(innerCtx);

                //need to ensure that the destination is set.
                ctx.destination[destProperty.name] = innerCtx.destination;

            });

        });

        // map.propertyMaps.forEach(map => {
        //     map.
        // });

        let settersArray = Object.keys(setters).map(property=>{
            return setters[property];            
        });

        return new DefaultTypeConverter(sourceMeta.name, destinationMeta.name, destinationMeta.ctor, settersArray);
    }

}

