/// <reference path="storage.d.ts" />

declare module "@orbitdb/key-store" {
    import type { IStorage } from "@orbitdb/storage";

    export interface KeyStoreOptions {
        storage?: IStorage;
        path?: string;
    }

    export interface IKeyStore {
        clear;
        close;
        hasKey;
        addKey;
        createKey;
        getKey;
        getPublic;
    }

    export function KeyStore(param?: KeyStoreOptions): Promise<IKeyStore>;
}
