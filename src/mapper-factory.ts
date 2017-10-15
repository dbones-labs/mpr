import { Builder } from "./initializing/builder";
import { Setup } from "./initializing/setup";
import { JsMapper } from "./js-mapper";
import { Mapper } from "./Mapper";
import { Configuration } from "./configuration";

export class MapperFactor {

    private _builder: Builder = new Builder();
    private _config: Configuration = new Configuration();

    addSetup(setup: Setup) {
        setup.configure(this._builder);
        return this;
    }

    setConfiguration(setupConfig: (config: Configuration) => void) {
        setupConfig(this._config);
        return this;
    }


    createMapper(): Mapper {
        return new JsMapper(this._config, this._builder.mappings, this._builder.typeMetas);
    }
}