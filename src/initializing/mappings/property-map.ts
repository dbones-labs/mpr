/**
 * each class map should have seval property maps
 */
export class PropertyMap {

    /**
     * this is true if the mapping engine created this map.
     */
    isCreatedByMapper: boolean = false; 

    sourceName: string;
    sourceGetter: (instance: any) => any;
    ignoreSource: boolean = false;

    destinationName: string;
    destinationSetter: (instance: any, value: any) => void;
    ignoreDestination: boolean = false;

}