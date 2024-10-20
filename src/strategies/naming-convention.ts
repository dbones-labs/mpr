export interface NamingConvention {
    convert(name: string): string;
}

export class CamelCaseNamingConvention implements NamingConvention {

    convert(name: string): string {
        return this.camelize(name);
    }

    camelize(str: string) {
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (letter, index) {
            return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
        });//.replace(/\s+/g, '');
    }

}