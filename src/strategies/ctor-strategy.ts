export interface CtorStrategy {
    createInstance(): any;
}

export class AnonCtor implements CtorStrategy {
    createInstance(): any {
        return {};
    }
}

export class ArrayCtor implements CtorStrategy {
    createInstance(): any {
        return [];
    }
}

export class TypeCtor implements CtorStrategy {
    _ctor: Constructor;

    constructor(ctor: Constructor) {
        this._ctor = ctor;
    }

    createInstance(): any {
        return new this._ctor();
    }

}

/**
 * a class/type which has a parameter-less constructor.
 */
export interface Constructor {
    new (): any;
}