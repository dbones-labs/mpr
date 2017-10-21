
import { TypeConverter } from "./type-converter";
import { Mapper } from "../Mapper";
import { MappingContext } from "./mapping-context";

export abstract class TypeConverterBase<TSrc, TDest> implements TypeConverter {

    abstract sourceType: string;
    abstract destinationType: string;

    execute(context: MappingContext): any {
        let result = this.convert(context.source, context.destination, context.mapper);
        return result;
    }

    abstract convert(source: TSrc, destination: TDest, mapper: Mapper) : TDest;
}