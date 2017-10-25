import { MappingContext } from './mapping-context';

import { TypeConverter } from "./type-converter";
import { Types } from './types';


export class Converts {

    getConverters() {
        return [
            <TypeConverter>new ArrayConverter(),
            <TypeConverter>new ValueArrayConverter(),

            <TypeConverter>new StringToStringConverter(),

            <TypeConverter>new NumberToNumberConverter(),
            <TypeConverter>new NumberToStringConverter(),
            <TypeConverter>new StringToNumberConverter(),

            <TypeConverter>new DateToDateConverter(),
            <TypeConverter>new StringToDateConverter(),

            <TypeConverter>new ValueToValueConverter()
        ];
    }

}

/**
 * a catch all for a collection of things.
 */
class ArrayConverter implements TypeConverter {
    sourceType: string = Types.objectArray;
    destinationType: string = Types.objectArray;
    execute(ctx: MappingContext) {

        if (ctx.destination == null) ctx.destination = [];
        
        (<any[]>ctx.source).forEach(item => {
            let value = ctx.mapper.map(item, ctx.mapInformation.destination.type);
            ctx.destination.push(value);
        });

        return ctx.destination;
    }
}


/**
 * a catch all for a collection of things.
 */
class ValueArrayConverter implements TypeConverter {
    sourceType: string = 'value[]';
    destinationType: string = 'value[]';
    execute(ctx: MappingContext) {

        if (ctx.destination == null) ctx.destination = [];

        (<any[]>ctx.source).forEach(item => {
            let value = ctx.mapper.map(item, Types.value);
            ctx.destination.push(value);
        });

        return ctx.destination;
    }
}


/**
 * this is a catch all for value types, such as boolean, number, string, datetime etc.
 */
class ValueToValueConverter implements TypeConverter {
    sourceType: string = Types.value;
    destinationType: string = Types.value;
    execute(context: MappingContext) {
        context.destination = context.source;
    }

}


class StringToStringConverter implements TypeConverter {
    sourceType: string = Types.string;
    destinationType: string = Types.string;
    execute(ctx: MappingContext) {
        ctx.destination = ctx.source;
    }
}

class NumberToNumberConverter implements TypeConverter {
    sourceType: string = Types.number;
    destinationType: string = Types.number;
    execute(ctx: MappingContext) {
        ctx.destination = ctx.source;
    }
}

class StringToNumberConverter implements TypeConverter {
    sourceType: string = Types.string;
    destinationType: string = Types.number;
    execute(ctx: MappingContext) {
        if (ctx.source == null) ctx.destination = null;
        else ctx.destination = parseInt(ctx.source);
    }
}

class NumberToStringConverter implements TypeConverter {
    sourceType: string = Types.number;
    destinationType: string = Types.string;
    execute(ctx: MappingContext) {
        if (ctx.source == null) ctx.destination = null;
        else ctx.destination = ctx.source.toString();
    }
}

class DateToDateConverter implements TypeConverter {
    sourceType: string = Types.date;
    destinationType: string = Types.date;
    execute(ctx: MappingContext) {
        ctx.destination = ctx.source;
    }
}

class StringToDateConverter implements TypeConverter {
    sourceType: string = Types.string;
    destinationType: string = Types.date;
    execute(ctx: MappingContext) {
        if (ctx.source == null) ctx.destination = null;
        else ctx.destination = new Date(ctx.source);
    }
}

