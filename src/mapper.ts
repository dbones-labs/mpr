import { Constructor } from './strategies/ctor-strategy';
import { MappingContext } from "./core/mapping-context";
import { Configuration } from './configuration';

/**
 * a mapper which will map source to destination
 */
export interface Mapper {

    /**
     * maps a source state to a new instance
     * @param source instance of the source
     * @param destinationType the name of the destination type
     */
    map(source: any, destinationType: string | Constructor): any;

    mapUsingTypes(source: any, sourceType: string | Constructor, destinationType: string | Constructor) : any;

    /**
     * (under development) maps the source state to an existing destination instance
     * @param source instance of the source
     * @param destination instance of the destination
     */
    mapTo(source: any, destination: any): void;


    mapToUsingTypes(source: any, sourceType: string | Constructor, destination: any, destinationType: string | Constructor): void;
}

/**
 * internals of the mapper
 */
export interface AdvancedMapper extends Mapper {

    /**
     * executes a mapping context
     */
    mapIt(context: MappingContext): void;

    /**
     * the configuration of the mapper, do not use this to alter its state.
     */
    configuration(): Configuration;
}