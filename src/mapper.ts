import { MappingContext } from "./core/mapping-context";

export interface Mapper {
    map(source: any, destinationType: string) : any;
    mapTo(source: any, destination: any): void;
}


export interface AdvancedMapper extends Mapper {
    mapIt(context: MappingContext): void;
}