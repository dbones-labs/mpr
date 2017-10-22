import { FluentTypeMapping } from '../fluent-type-mapping';
import { TypeMap } from "../mappings/type-map";
import { Dictionary } from "../../dictionary";
import { TypeMeta } from "../metas/type-meta";
import { PropertyBuilder } from "../builders/property-builder";
import { Configuration } from '../../configuration';

export class Builder {

    private _configuration: Configuration;

    mappings: TypeMap[] = [];
    typeMetas: Dictionary<TypeMeta> = new Dictionary<TypeMeta>();


    constructor(configuration: Configuration) {
        this._configuration = configuration;
    }

    /**
     * register the types which will be mapped.
     * @param typeName the name of the type i.e. 'models.todo'
     * @param type the types FUNCTION
     */
    addType(typeName: string, type: Function = null): PropertyBuilder {
        let meta = new TypeMeta(typeName);

        if (type != null) {
            meta.setType(type);
        }

        this.typeMetas.set(meta.name, meta);
        return new PropertyBuilder(meta, this._configuration);
    }


    /**
     * create a mapping between 2 classes.
     * @param sourceType the source type, i.e. 'models.Todo'
     * @param destinationType the destination type, i.e. 'resource.todo'
     */
    createMap<TSrc, TDest>(sourceType: string, destinationType: string): FluentTypeMapping<TSrc, TDest> {
        let map = new TypeMap(sourceType, destinationType);
        let config = new FluentTypeMapping(map);
        this.mappings.push(map);
        return config;
    }

}