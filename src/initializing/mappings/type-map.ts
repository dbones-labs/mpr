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
     * any propery mappings
     * destination from source
     */
    propertyMaps: PropertyMap[] = [];
    
    /**
     * any propery mappings
     * source to destination
     */
    sourcePropertyMaps: PropertyMap[] = [];
    
    /**
     * the type converter if it was supplied directly
     */
    converter: TypeConverter;

    /**
     * create a mappping
     * @param source the source type
     * @param target the target type
     */
    constructor(source: string, target: string) {
        this.source = source;
        this.destination = target;
    }

}