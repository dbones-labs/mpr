import { Constructor } from "../strategies/ctor-strategy";
import { Type } from "./interfaces";
import { ReflectMetadata } from "./reflect";

/**
 * indicate this class for mpr to map against.
 * @param typeName the type of this class, ie 'models.todo'
 */
export function mapClass(typeName: string): ClassDecorator {
    return (target: Function) => {

        let t2 = classDecorator<any>(target, typeName);

        let type: Type = ReflectMetadata.getTypeData(<Constructor>target)
            || ReflectMetadata.getTypeData(t2)
            || <Type>{};


        type.type = <Constructor>target;
        type.proxiedType = t2;
        type.name = typeName;

        ReflectMetadata.setTypeData(<Constructor>target, type);
        ReflectMetadata.setTypeData(t2, type);
        return t2;
    }
}



function classDecorator<T extends { new(...args: any[]): {} }>(constructor: T, typeName: string) {
    return class extends constructor {
        static $$type = typeName;
        $type = typeName;
    }
}


