import { AdvancedMapper } from "../mapper";
import { MapInformation } from "./map-information";

/**
 * this holds all the infmoration about the current maping of 2 objects
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
     * informaton about the mapping.
     */
    mapInformation: MapInformation;
}