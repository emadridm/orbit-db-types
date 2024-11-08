/// <reference path="key-store.d.ts" />
/// <reference path="identity.d.ts" />
/// <reference path="storage.d.ts" />

declare module "@orbitdb/identities" {
    import type { IKeyStore } from "@orbitdb/key-store";
    import type { HeliaLibp2p } from "helia";
    import type { IIdentity } from "@orbitdb/identity";
    import type { IStorage } from "@orbitdb/storage";

    export interface IdentitiesOptions {
        keystore?: IKeyStore;
        path?: string;
        storage?: IStorage;
        ipfs?: HeliaLibp2p;
    }

    export interface IIdentities {
        createIdentity: (options: Object) => Promise<IIdentity>;
        verifyIdentity: (identity: IIdentity) => Promise<boolean>;
        getIdentity: (hash: string) => Promise<IIdentity>;
        sign: (identity: IIdentity, data: string) => Promise<string>;
        verify: (
            signature: string,
            publicKey: string,
            data: string,
        ) => Promise<boolean>;
        keystore: IKeyStore;
    }

    export function Identities(param?: IdentitiesOptions): Promise<IIdentities>;
}
