/// <reference path="access-controllers.d.ts" />
/// <reference path="identity.d.ts" />
/// <reference path="storage.d.ts" />
/// <reference path="oplog.d.ts" />

declare module "@orbitdb/database" {
    import type { HeliaLibp2p } from "helia";
    import type { IIdentity } from "@orbitdb/identity";
    import type EventEmitter from "events";
    import type { AccessController } from "@orbitdb/access-controllers";
    import type { ILog } from "@orbitdb/oplog";
    import type { IStorage } from "@orbitdb/storage";

    export interface DatabaseOptions {
        ipfs: HeliaLibp2p<any>;
        identity?: IIdentity;
        address?: string;
        name?: string;
        access?: AccessController;
        directory?: string;
        meta?: object;
        headsStorage?: IStorage;
        entryStorage?: IStorage;
        indexStorage?: IStorage;
        referencesCount?: number;
        syncAutomatically?: boolean;
        onUpdate?: () => void;
    }

    export interface IDatabase {
        type: string;
        addOperation: (args: {
            op: string;
            key: string | null;
            value: unknown;
        }) => Promise<string>;
        address: string;
        close(): Promise<void>;
        drop(): Promise<void>;
        events: EventEmitter;
        access: AccessController;
        log: ILog;
    }

    export function Database(params: DatabaseOptions): Promise<IDatabase>;
}
