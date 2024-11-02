declare module "@orbitdb/identities" {
    import type { KeyStore } from "@orbitdb/key-store";
    import type { HeliaLibp2p } from "helia";
    import type { Identity } from "@orbitdb/identity";

    export type IdentitiesOptions = {
        keystore?: KeyStore;
        path?: string;
        storage?: Storage;
        ipfs?: HeliaLibp2p;
    };

    export class Identities {
        createIdentity: (options: Object) => Promise<Identity>;
        verifyIdentity: (identity: Identity) => Promise<boolean>;
        getIdentity: (hash: string) => Promise<Identity>;
        sign: (identity: Identity, data: string) => Promise<string>;
        verify: (
            signature: string,
            publicKey: string,
            data: string,
        ) => Promise<boolean>;
        keystore: KeyStore;
    }

    export function Identities(param?: IdentitiesOptions): Promise<Identities>;
}
