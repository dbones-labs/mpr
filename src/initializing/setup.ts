import { Builder } from "./builder";

export interface Setup {
    configure(builder: Builder): void;
}