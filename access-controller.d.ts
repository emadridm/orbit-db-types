declare module "@orbitdb/access-controllers" {
    import type { LogEntry } from "@orbitdb/entry";
    import type { OrbitDB, Storage } from "@orbitdb/core";
    import type { Identities } from "@orbitdb/identities";
    import type EventEmitter from "events";

    export type AccessController<T = void> = (options?: T) => Promise<{
        type: "ipfs" | "orbitdb";
        address: string;
        write: string[];
        canAppend: (entry: LogEntry) => Promise<boolean>;
        capabilities: () => Promise<string[]>;
        get: (capacility: string) => Promise<any>;
        grant: (capability: string, key: string) => Promise<string>;
        revoke: (capability: string, key: string) => Promise<string>;
        close: () => Promise<void>;
        drop: () => Promise<void>;
        events: EventEmitter;
    }>;

    export type IPFSAccessControllerOptions = {
        orbitdb: OrbitDB;
        identities: Identities;
        address: string;
    };

    export type OrbitDBAccessControllerOptions = {
        orbitdb: OrbitDB;
        identities: Identities;
        address: string;
        name: string;
    };

    export function IPFSAccessController(params: {
        write: string[];
        storage: Storage;
    }): AccessController<IPFSAccessControllerOptions>;

    export function OrbitDBAccessController(params: {
        write: string[];
    }): AccessController<OrbitDBAccessControllerOptions>;
}
