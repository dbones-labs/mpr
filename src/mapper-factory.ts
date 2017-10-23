import { Setup } from "./initializing/setup";
import { JsMapper } from "./js-mapper";
import { Mapper } from "./Mapper";
import { Configuration } from "./configuration";
import { DefaultMapCompiler, MapCompiler } from "./strategies/map-compiler";
import { Builder } from "./initializing/builders/builder";

export class MapperFactor {

    private _builder: Builder;
    private _config: Configuration = new Configuration();
    mapCompiler: MapCompiler = new DefaultMapCompiler();

    constructor() {
        this._builder = new Builder(this._config);        
    }


    addSetup(setup: Setup) {
        setup.configure(this._builder);
        return this;
    }

    setConfiguration(setupConfig: (config: Configuration) => void) {
        setupConfig(this._config);
        return this;
    }


    createMapper(): Mapper {

        let converters = this._builder.mappings.map(mapping => {
            return this.mapCompiler.Build(mapping, this._builder.typeMetas, this._config);
        });


        return new JsMapper(this._config, converters);
    }
}