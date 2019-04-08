import { TypeMeta } from "../metas/type-meta";
import { Configuration } from "../../configuration";
import { Types } from "../../core/types";
import { Constructor } from "../../strategies/ctor-strategy";
import { Reflection } from "../reflection";

export class PropertyBuilder<T> {

    private _typeMeta: TypeMeta;
    private _configuration: Configuration;

    constructor(typeMeta: TypeMeta, configuration: Configuration) {
        this._typeMeta = typeMeta;
        this._configuration = configuration;
    }

    /**
     * informs the mapper of a property which it may need to map.
     * @param name the name of the property
     * @param type the type of the property, use Types class in the core to help with this. Types.value is the default.
     */
    addProperty(name: string | ((item: T) => any), type: string = Types.value): PropertyBuilder<T> {
        return this.add(name, type, false);
    }

    /**
     * informs the mapper of an id property which it may need to map.
     * @param name the name of the property
     * @param type the type of the property, use Types class in the core to help with this. Types.value is the default.
     */
    addIdProperty(name: string | ((item: T) => any) , type: string = Types.value): PropertyBuilder<T> {
        return this.add(name, type, true);
    }

    private add(name: string | ((item: T) => any) , type: string = Types.value, isId: boolean = false): PropertyBuilder<T> {

        let propertyName =  (typeof name == "string") 
            ? name
            : Reflection.getPropertyName(name);

        var processedName = this._configuration.namingConvention.convert(propertyName);

        this._typeMeta.addProperty(propertyName, processedName, type, isId);
        return this;

    }


    /**
     * annotate your class and this method will add the meta to the mapper.
     */
    scanForAttributes(): PropertyBuilder<T> {
        let type = <Constructor>this._typeMeta.actualType;
        if (type == null) throw new Error("you need to set a type to scan");

        this._configuration.extractMetadata.getProperties(type).forEach(property => {

            if (property.isId) {
                this.addIdProperty(property.name, property.typeName);
            }
            else {
                this.addProperty(property.name, property.typeName);
            }

        });

        return this;
    }

}
