import { Builder } from "./builders/builder";

export interface Setup {
    configure(builder: Builder): void;
}