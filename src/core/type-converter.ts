import { MappingContext } from "./mapping-context";

/**
 * converts the source into the destination
 */
export interface TypeConverter {
    
    sourceType: string;
    destinationType: string;

    execute(context: MappingContext): any;
}


