import { AdvancedMapper } from "../mapper";
import { MapInformation } from "./map-information";

/**
 * this holds all the information about the current mapping of 2 objects
 */
export class MappingContext {
    /**
     * the instance from the source
     */
    source: any;

    /**
     * the current instance in the destination
     */
    destination: any;

    /**
     * access to the mapper instance.
     */
    mapper: AdvancedMapper;

    /**
     * information about the mapping.
     */
    mapInformation: MapInformation;
}