import { MapComponent } from "../../core/map-information";

export class PropertyMeta {
    
        name: string;
    
        /**
         * if this property is an object
         * then this will be set to the object type ie 'model.person'
         */
        type: string;

        mapComponent: MapComponent;


    
    }