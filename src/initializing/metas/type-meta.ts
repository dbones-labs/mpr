/**
 * information about each type/class
 */
import { Dictionary } from "../../dictionary";
import { PropertyMeta } from "./property-meta";
import { CtorStrategy, AnonCtor, TypeCtor, Constructor } from "../../strategies/ctor-strategy";
import { MapComponent } from "../../core/map-information";
import { Types } from "../../core/types";

export class TypeMeta {

    isAnon: boolean = true;

    /*
    //assume a declared type will have a fixed number of properties.
    allPropertiesKnown: boolean = false;
    */

    get hasId(): boolean {
        return this.id != null;
    }



    constructor(typeName: string) {
        this.name = typeName;
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
     * the base of this class.
     */
    baseType: string;

    /**
     * the collection of properties, keyed on the name provided.
     */
    properties: Dictionary<PropertyMeta> = new Dictionary<PropertyMeta>();

    /**
     *  the collection of properties, keyed on a camelcase name.
     */
    propertiesKeyedOnCamelCase: Dictionary<PropertyMeta> = new Dictionary<PropertyMeta>();


    ctor: CtorStrategy = new AnonCtor();

    actualType: Function;
    
    setType(type: Constructor) {
        this.isAnon = false;
        this.ctor = new TypeCtor(type);
        this.actualType = type;
    }

    addProperty(name: string, processedName: string, type: string = Types.value, isId: boolean = false) {

        let property: PropertyMeta = new PropertyMeta();
        property.name = name;
        property.type = type;
        property.processedName = processedName;
        let mapComponent = new MapComponent();

        if (type.indexOf('[]') > -1) {
            type = type.replace('[]', '');
            mapComponent.isArray = true;
        }

        mapComponent.type = type;
        property.mapComponent = mapComponent;

        this.properties.set(name, property);
        this.propertiesKeyedOnCamelCase.set(processedName, property);

        if(isId) this.id = name;
    }
}