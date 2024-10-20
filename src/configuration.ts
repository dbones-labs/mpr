import {TypeConverterLocator, DefaultTypeConverterLocator} from './core/type-converter-locator';

import { TypeStrategy, DefaultTypeStrategy } from "./strategies/type-strategy";
import { NamingConvention, CamelCaseNamingConvention } from "./strategies/naming-convention";
import { TypeConverter } from './core/type-converter';
import { Converts } from './core/converters';
import { ExtractMetadata } from './annotations/extract-metadata';
import { IdStrategy, DefaultIdStrategy } from './strategies/id-strategy';
import { IdLocator, DefaultIdLocator } from './strategies/id-locator';

export class Configuration {

    namingConvention: NamingConvention = new CamelCaseNamingConvention();
    typeStrategy: TypeStrategy = new DefaultTypeStrategy();
    typeConverterLocator: TypeConverterLocator = new DefaultTypeConverterLocator();
    typeConverters: TypeConverter[] = new Converts().getConverters();
    extractMetadata: ExtractMetadata = new ExtractMetadata();
    idStrategy: IdStrategy = new DefaultIdStrategy();
    idLocator: IdLocator = new DefaultIdLocator();

}