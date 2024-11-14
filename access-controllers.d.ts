/// <reference path="oplog.d.ts" />
/// <reference path="identities.d.ts" />
/// <reference path="storage.d.ts" />

declare module "@orbitdb/access-controllers" {
    import type { LogEntry } from "@orbitdb/oplog";
    import type { IOrbitDB } from "@orbitdb/core";
    import type { IStorage } from "@orbitdb/storage";
    import type { IIdentities } from "@orbitdb/identities";
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

    export interface IPFSAccessControllerOptions {
        orbitdb: IOrbitDB;
        identities: IIdentities;
        address: string;
    }

    export interface OrbitDBAccessControllerOptions {
        orbitdb: IOrbitDB;
        identities: IIdentities;
        address: string;
        name: string;
    }

    export function IPFSAccessController(params: {
        write: string[];
        storage?: IStorage;
    }): AccessController<IPFSAccessControllerOptions>;

    export function OrbitDBAccessController(params: {
        write: string[];
    }): AccessController<OrbitDBAccessControllerOptions>;

    export function useAccessController(
        accessController: AccessController,
    ): void;
}
