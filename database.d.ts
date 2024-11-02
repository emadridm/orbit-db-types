declare module "@orbitdb/database" {
    import type { HeliaLibp2p } from "helia";
    import type { Identity } from "@orbitdb/identity";
    import type EventEmitter from "events";
    import type { AccessController } from "@orbitdb/access-controllers";
    import type { Log } from "@orbitdb/log";

    export type DatabaseOptions = {
        ipfs: HeliaLibp2p;
        identity?: Identity;
        address: string;
        name?: string;
        access?: AccessController;
        directory?: string;
        meta?: object;
        headsStorage?: Storage;
        entryStorage?: Storage;
        indexStorage?: Storage;
        referencesCount?: number;
        syncAutomatically?: boolean;
        onUpdate?: () => void;
    };

    export class Database {
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
        log: Log;
    }

    export function Database(): Promise<Database>;
}
