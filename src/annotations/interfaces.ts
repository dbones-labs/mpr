import { Constructor } from "../strategies/ctor-strategy";

export interface Type {
    type: Constructor;
    proxiedType: Constructor;
    name: string;

    properties: any;
}

export interface Property {
    metaData: any;
    metaType: string;
    typeName: string;
    suppliedType: string|Constructor;
    name: string;

}