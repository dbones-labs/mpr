import { Constructor } from "../strategies/ctor-strategy";
import { Property, Type } from "./interfaces";
import { ReflectMetadata } from "./reflect";

export function mapProperty(type?: string| Constructor): PropertyDecorator {
    return (target, key) => {
        let type = ReflectMetadata.getTypeData(<Constructor>target) 
            || <Type>{
                properties: {}
            };
        
        let metaData = ReflectMetadata.getPropertyData(<Constructor>target, <string>key);
        let metaType = metaData.name.toLowerCase();

        let typeName = type == null || typeof type == "string" ? type : (<any>type).$$type;
        typeName = typeName != null ? typeName : (<any>metaData).$$type;

        if(metaType == "array"){
            typeName = typeName == null ? "object[]" : `${typeName}[]`;
        }
        if (typeName == null) {
            typeName = metaType;
        }
        
        type.properties[key] = <Property>{
            metaData: metaData,
            metaType: metaType,
            suppliedType: type,
            typeName: typeName,
            name: key
        };

        return ReflectMetadata.setTypeData(<Constructor>target, type);
    }
}