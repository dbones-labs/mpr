import { TypeMeta } from "../initializing/metas/type-meta";

/**
 * this will be used to find the id property on any object
 */
export interface IdStrategy {

    /**
     * try's to find the id, and then returns the delegate which will be used to get the value for an instance of this type.
     * @param meta the property meta to which we want to get the id getter delegate
     */
    getIdGetter(meta: TypeMeta): (item: any) => string;
}

export class DefaultIdStrategy implements IdStrategy {
      
    getIdGetter(meta: TypeMeta): (item: any) => string {
        
        let metaClosure = meta;
        let idProperty: any;
        
        //check meta to see if we have been informed of the property
        if(meta.hasId) return (item:any) => item[metaClosure.id];

        //is there a property called id
        idProperty = meta.properties.get('id');
        if(idProperty) return (item:any) => item[idProperty.name];

        //lets try and find a property which ends in id
        for (let index = 0; index < meta.properties.keys.length; index++) {
            let prop = meta.properties.keys[index];

            let isIdProperty = prop.toLowerCase().endsWith('id');
            if (isIdProperty) return (item: any) => item[prop];
        }

        //there is no property id
        return null;

    }
  
}