/// <reference path="identity.d.ts" />
/// <reference path="storage.d.ts" />
/// <reference path="access-controllers.d.ts" />
/// <reference path="identities.d.ts" />

declare module "@orbitdb/oplog" {
    import type { IIdentity } from "@orbitdb/identity";
    import type { AccessController } from "@orbitdb/access-controllers";
    import type { IStorage } from "@orbitdb/storage";
    import { IIdentities } from "@orbitdb/identities";

    export function DefaultAccessController(): Promise<{
        canAppend: () => Promise<true>;
    }>;

    export interface LogOptions {
        logId: IIdentity;
        logHeads: Array<LogEntry>;
        access: AccessController;
        entryStorage: IStorage;
        headsStorage: IStorage;
        indexStorage: IStorage;
        sortFn: (a: LogEntry, b: LogEntry) => Promise<number>;
    }

    export interface ILog {
        id: string;
        clock: Clock;
        heads: () => Promise<LogEntry[]>;
        traverse: () => AsyncGenerator<LogEntry, void, unknown>;
    }

    export function Log(
        identiy: IIdentity,
        options?: LogOptions,
    ): Promise<ILog>;

    export interface Clock {
        id: string;
        time: number;
    }

    export interface LogEntry {
        id: string;
        payload: unknown;
        next: string[];
        refs: string[];
        clock: Clock;
        v: number;
        key: string;
        identity: string;
        sig: string;
        hash: string;
        bytes: Uint8Array;
    }

    export const Entry: {
        create: (
            identity: IIdentity,
            id: string,
            payload: unknown,
            clock?: Clock,
            next?: string[],
            refs?: string[],
        ) => Promise<LogEntry>;
        verify: (identities: IIdentities, entry: LogEntry) => Promise<boolean>;
        decode: (bytes: Uint8Array) => Promise<LogEntry>;
        isEntry: (obj: object) => boolean;
        isEqual: (a: LogEntry, b: LogEntry) => boolean;
    };
}
