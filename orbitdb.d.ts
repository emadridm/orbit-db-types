declare module "@orbitdb/orbitdb" {
    import type { HeliaLibp2p } from "helia";
    import type { Identity } from "@orbitdb/identity";
    import type { PeerId } from "@libp2p/interface";
    import type { DatabaseOptions } from "@orbitdb/database";
    import type { Database } from "@orbitdb/database";
    import type { KeyStore } from "@orbitdb/key-store";

    export type OrbitDBOptions = {
        ipfs: HeliaLibp2p;
        id?: string;
        identity?: Identity | Object;
        identities?: Object;
        directory?: string;
    };

    export type OrbitDB = {
        id: string;
        open: (
            address: string,
            OrbitDBDatabaseOptions?: DatabaseOptions,
        ) => Promise<Database>;
        stop: Promise<void>;
        ipfs: HeliaLibp2p;
        directory: string;
        keystore: KeyStore;
        identity: Identity;
        peerId: PeerId;
    };

    export function createOrbitDB(params: OrbitDBOptions): Promise<OrbitDB>;
}
