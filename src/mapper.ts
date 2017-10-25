import { MappingContext } from "./core/mapping-context";

/**
 * a mapper which will map source to destination
 */
export interface Mapper {
    
    /**
     * maps a source state to a new instance
     * @param source instance of the source
     * @param destinationType the name of the destination type
     */
    map(source: any, destinationType: string) : any;

    /**
     * (under development) maps the source state to an existing desintation instance
     * @param source instance of the source
     * @param destination instance of the destination
     */
    mapTo(source: any, destination: any): void;
}

/**
 * internals of the mapper
 */
export interface AdvancedMapper extends Mapper {
    
    /**
     * executes a mapping context
     */
    mapIt(context: MappingContext): void;
}