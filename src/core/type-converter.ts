import { MappingContext } from "./mapping-context";

/**
 * converts the source into the destination
 */
export interface TypeConverter {
    execute(context: MappingContext): void;
}


