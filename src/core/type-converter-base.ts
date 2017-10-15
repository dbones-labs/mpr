
import { TypeConverter } from "./type-converter";
import { Mapper } from "../Mapper";
import { MappingContext } from "./mapping-context";

export class TypeConverterBase<TSrc, TDest> implements TypeConverter {
    execute(context: MappingContext): void {
        let result = this.convert(context.source, context.destination, context.mapper);
        context.destination = result;
    }

    convert(source: TSrc, destination: TDest, mapper: Mapper) : TDest {
        throw new Error("please override this function");
    }

}