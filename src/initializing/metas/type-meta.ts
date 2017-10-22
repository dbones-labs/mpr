/**
 * information about each type/class
 */
import { Dictionary } from "../../dictionary";
import { PropertyMeta } from "./property-meta";
import { CtorStrategy, AnonCtor, TypeCtor } from "../../strategies/ctor-strategy";

export class TypeMeta {
    
        isAnon: boolean = false;

        /*
        //assume a declared type will have a fixed number of properties.
        allPropertiesKnown: boolean = false;
        */
        
        get hasId(): boolean {
            return this.id != null;
        }
    
    
    
        constructor(typeName: string) {
            this.name = name;
        }
    
        /**
         * the name of this type, ie 'models.todo'
         */
        name: string;
    
        /**
         * property name which is used for the Id, not the instance value.
         */
        id: string;
    
        /**
         * the collection of properties, keyed on a camelcase name
         */
        properties: Dictionary<PropertyMeta> = new Dictionary<PropertyMeta>();
        propertiesRawName: Dictionary<PropertyMeta> = new Dictionary<PropertyMeta>();
    
    
        ctor: CtorStrategy = new AnonCtor();

        actualType: Function;
        setType(type: Function) {
            this.isAnon = false;
            this.ctor = new TypeCtor(type);
            this.actualType = type;
        }
    
        addProperty(name: string, processedName: string, type: string = null) {
    
            let value = this.namingConvention.convertToTarget(name);
            let typeDetail: string = null
            let actualType: PropertyType;
            if (type = null) {
                actualType = PropertyType.value
            }
            else if (type.indexOf('[]') > -1) {
                typeDetail = type.replace('[]', '');
                actualType = PropertyType.array;
            }
            else {
                typeDetail = type;
                actualType = PropertyType.object;
            }
    
            let property: PropertyMeta = new PropertyMeta();
            property.name = value;
            property.type = actualType;
            property.typeDetail = typeDetail;
    
    
            this.properties.set(name, property);
        }
    }