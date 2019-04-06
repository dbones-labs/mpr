import { Constructor } from "../strategies/ctor-strategy";

export class Types {

    static string = "string";
    static boolean = "boolean";
    static number = "number";
    static date = "date";
    static objectArray = "object[]";
    static object = "object";
    static value = "value";

    static asArray(type: string | Constructor){
        return typeof type == "string" ? `${type}[]` : `${(<any>type).$$type}[]`;
    }
}