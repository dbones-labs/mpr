import { TypeMap } from "../initializing/mappings/type-map";
import { Configuration } from "../configuration";
import { TypeConverter } from "../core/type-converter";
import { TypeMeta } from "../initializing/metas/type-meta";
import { Dictionary } from "../dictionary";

export interface MapCompiler {
    Build(map: TypeMap, typeMetas: Dictionary<TypeMeta>, config: Configuration): TypeConverter;
}

export class DefaultMapCompiler implements MapCompiler { 
    
    Build(map: TypeMap, typeMetas: Dictionary<TypeMeta>, config: Configuration): TypeConverter {
        if(map.converter != null) return map.converter;

        return null;
    }

}