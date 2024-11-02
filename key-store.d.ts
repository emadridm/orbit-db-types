declare module "@orbitdb/key-store" {
    import type { Storage } from "@orbitdb/storage";

    export type KeyStoreOptions = {
        storage?: Storage;
        path?: string;
    };

    export class KeyStore {
        clear;
        close;
        hasKey;
        addKey;
        createKey;
        getKey;
        getPublic;
    }

    export function KeyStore(param?: KeyStoreOptions): Promise<KeyStore>;
}
