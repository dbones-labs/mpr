import { TypeConverter } from '../../core/type-converter';
import { PropertyMap } from "./property-map";

/**    [x: string]: any;

 * store information about the mapping
 */
export class TypeMap {

    /**
     * the target type name
     */
    destination: string; 

    /**
     * the source's type name
     */
    source: string;


    /**
     * any property mappings
     * destination from source
     */
    propertyMaps: PropertyMap[] = [];
    
    /**
     * any property mappings
     * source to destination
     */
    sourcePropertyMaps: PropertyMap[] = [];
    
    /**
     * the type converter if it was supplied directly
     */
    converter: TypeConverter;

    /**
     * create a mapping
     * @param source the source type
     * @param destination the target type
     */
    constructor(source: string, destination: string) {
        if(source == null || source == '') throw new Error('source must be provided');
        if(destination == null || destination == '') throw new Error('destination must be provided');
        this.source = source;
        this.destination = destination;
    }

}