import { Dictionary } from "../dictionary";
import { Types } from "../core/types";
import { TypeStrategy } from "./type-strategy";

export interface TypeReflection {
    getType(instance: any, typeStrategy: TypeStrategy): string;
}

export class DefaultTypeReflection implements TypeReflection {

    private _types: Dictionary<string> = new Dictionary<string>();
   
    constructor() {

        this._types.set("[object Date]", Types.date);
        this._types.set("[object String]", Types.string);
        this._types.set("[object Number]", Types.number);
        this._types.set("[object Boolean]", Types.boolean);
        this._types.set("[object Object]", Types.object);
        this._types.set("[object Array]", Types.objectArray);

    }


    getType(instance: any, typeStrategy: TypeStrategy): string {

        let typeName = Object.prototype.toString.call(instance); 
        let candidateType = this._types.get(typeName);

        if (candidateType != Types.object) return candidateType;

        let strongType = typeStrategy.getTypeFromTypeProperty(instance);
        return strongType == null ? candidateType : strongType;

    }

}