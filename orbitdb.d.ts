/// <reference path="identity.d.ts" />
/// <reference path="database.d.ts" />
/// <reference path="key-store.d.ts" />
/// <reference path="databases.d.ts" />

declare module "@orbitdb/orbitdb" {
    import type { HeliaLibp2p } from "helia";
    import type { IIdentity } from "@orbitdb/identity";
    import type { PeerId } from "@libp2p/interface";
    import type { IDatabase } from "@orbitdb/database";
    import type { IKeyStore } from "@orbitdb/key-store";

    export interface OrbitDBOptions {
        ipfs: HeliaLibp2p<any>;
        id?: string;
        identity?: IIdentity | Object;
        identities?: Object;
        directory?: string;
    }

    export interface IOrbitDB {
        id: string;
        open: <T extends IDatabase>(
            address: string,
            params?: {
                type?: "events" | "documents" | "keyvalue";
                meta?: any;
                sync?: boolean;
                Database?: IDatabase;
                AccessController?: any;
                headsStorage?: any;
                entryStorage?: any;
                indexStorage?: any;
                referencesCount?: any;
            },
        ) => Promise<T>;
        stop: () => Promise<void>;
        ipfs: HeliaLibp2p<any>;
        directory: string;
        keystore: IKeyStore;
        identity: IIdentity;
        peerId: PeerId;
    }

    export default function OrbitDB(params: OrbitDBOptions): Promise<IOrbitDB>;
}
