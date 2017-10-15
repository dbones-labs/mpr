export interface CtorStrategy {
    createInstance(): any;
}

export class AnonCtor implements CtorStrategy {
    createInstance(): any {
        return {};
    }
}

export class TypeCtor implements CtorStrategy {
    _ctor: Function;

    constructor(ctor: Function) {
        this._ctor = ctor;
    }

    createInstance(): any {
        return this._ctor();
    }

}