import { TypeMeta } from "../metas/type-meta";
import { Configuration } from "../../configuration";
import { Types } from "../../core/types";

export class PropertyBuilder {

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
    addProperty(name: string, type: string = Types.value): PropertyBuilder {

        var processedName = this._configuration.namingConvention.convert(name);

        this._typeMeta.addProperty(name, processedName, type);
        return this;
    }

    //TODO: implement
    /**
     * not implemented yet
     * annotate your class and this method will add the meta to the mapper.
     */
    scanForAttributes(): PropertyBuilder {
        throw new Error('not implemented yet, scanForAttributes');
        //return this;
    }

}
