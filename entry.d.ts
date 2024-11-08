/// <reference path="clock.d.ts" />
/// <reference path="identities.d.ts" />
/// <reference path="identity.d.ts" />

declare module "@orbitdb/entry" {
    import type { IIdentity } from "@orbitdb/identity";
    import { Clock } from "@orbitdb/clock";
    import { IIdentities } from "@orbitdb/identities";

    // export type LogEntry<T = unknown> = {
    export type LogEntry = {
        id: string;
        // payload: { op: string; key: string | null; value?: T };
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
    };

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
