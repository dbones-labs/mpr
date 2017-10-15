export class Dictionary<TValue> {
    state: any = {};

    get keys(): Array<string> {
        return Object.keys(this.state);
    }

    set(key: string, value: TValue): void {
        this.state[key] = value;
    }

    get(key: string): TValue {
        let ret = this.state[key];
        return <TValue>ret;
    }

    remove(key: string): void {
        delete this.state[key];
    }
}   