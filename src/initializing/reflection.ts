//trialing out this idea.
//https://stackoverflow.com/a/50950972/47642
type ValueOf<T> = T[keyof T];
function getMethodName<T, V extends T[keyof T]>(
    f: (x: T) => V
): ValueOf<{ [K in keyof T]: T[K] extends V ? K : never }>;
function getMethodName(f: (x: any) => any): keyof any {
    var p = new Proxy({}, {
        get(target, prop) { return prop }
    })
    return f(p);
}

export class Reflection {

    static getPropertyName<T>(property: ((item: T) => any)): string {
        return getMethodName(property).toString();
    }

}