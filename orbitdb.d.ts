/// <reference path="identity.d.ts" />
/// <reference path="database.d.ts" />
/// <reference path="key-store.d.ts" />

declare module "@orbitdb/orbitdb" {
    import type { HeliaLibp2p } from "helia";
    import type { Identity } from "@orbitdb/identity";
    import type { PeerId } from "@libp2p/interface";
    import type { DatabaseOptions } from "@orbitdb/database";
    import type { IDatabase } from "@orbitdb/database";
    import type { KeyStore } from "@orbitdb/key-store";

    export interface OrbitDBOptions {
        ipfs: HeliaLibp2p<any>;
        id?: string;
        identity?: Identity | Object;
        identities?: Object;
        directory?: string;
    }

    export interface IOrbitDB {
        id: string;
        open: (
            address: string,
            OrbitDBDatabaseOptions?: DatabaseOptions,
        ) => Promise<IDatabase>;
        stop: Promise<void>;
        ipfs: HeliaLibp2p<any>;
        directory: string;
        keystore: KeyStore;
        identity: Identity;
        peerId: PeerId;
    }

    export default function OrbitDB(params: OrbitDBOptions): Promise<IOrbitDB>;
}
