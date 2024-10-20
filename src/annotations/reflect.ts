import "reflect-metadata";
import { Constructor } from "../strategies/ctor-strategy";
import { AnnotationKeys } from "./annotation-keys";

//small polyfil if a Reflect has already been imported and does not support
//tne getMetadata method (ie when using with aurellia)
var getMetaData = Reflect.getMetadata || Reflect.getOwnMetadata;

//pure work around.
export class ReflectMetadata {
    static setTypeData(type: object, value: any): any {
        Reflect.defineMetadata(AnnotationKeys.mapAnnotation, value, type);
    }

    static getTypeData(type: object): any {
        return getMetaData(AnnotationKeys.mapAnnotation, type);
    }

    static getPropertyData(type: Constructor, key: string): any {
        return getMetaData("design:type", type, key);
    }
}