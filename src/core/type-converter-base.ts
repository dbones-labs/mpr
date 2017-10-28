
import { TypeConverter } from "./type-converter";
import { Mapper } from "../Mapper";
import { MappingContext } from "./mapping-context";

/**
 * if possible implement the TypeConverter interface directly
 */
export abstract class TypeConverterBase<TSrc, TDest> implements TypeConverter {

    abstract sourceType: string;
    abstract destinationType: string;

    execute(context: MappingContext): void {
        let result = this.convert(context.source, context.destination, context.mapper);
        context.destination = result;
    }

    abstract convert(source: TSrc, destination: TDest, mapper: Mapper) : TDest;
}