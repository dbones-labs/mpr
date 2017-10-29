import "reflect-metadata";
import { Constructor } from "../strategies/ctor-strategy";
import { AnnotationKeys } from "./annotation-keys";

var reflect = Reflect;

//pure work around.
export class ReflectMetadata {
    static setTypeData(type: object, value: any): any {
        reflect.defineMetadata(AnnotationKeys.mapAnnotation, value, type);
    }

    static getTypeData(type: object): any {
        return reflect.getMetadata(AnnotationKeys.mapAnnotation, type);
    }

    static getPropertyData(type: Constructor, key: string): any {
        return reflect.getMetadata("design:type", type, key);
    }
}