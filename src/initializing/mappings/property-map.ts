/**
 * each class map should have several property maps
 */
export class PropertyMap {
    
    flattenSourceToDestination = false;
    destinationType: string;
    
    sourceName: string;
    sourceGetter: (instance: any) => any;


    destinationName: string;
    destinationSetter: (instance: any, value: any) => void;
    ignoreDestination: boolean = false;

}