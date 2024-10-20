import { Constructor } from "../strategies/ctor-strategy";
import { Type, Property } from "./interfaces";
import { ReflectMetadata } from "./reflect";

export class ExtractMetadata {

    getProperties(type: Constructor) {
        
        let results: Property[] = [];

        let t = <Type>ReflectMetadata.getTypeData(type);
        Object.keys(t.properties).forEach(key=> {

            results.push(t.properties[key]);

        });

        return results;
    }
}