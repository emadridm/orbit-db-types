declare module "@orbitdb/entry" {
    import type { Identity } from "@orbitdb/identity";
    import { Clock } from "@orbitdb/clock";
    import { Identities } from "@orbitdb/identities";

    // export type LogEntry<T = unknown> = {
    export type LogEntry = {
        id: string;
        // payload: { op: string; key: string | null; value?: T };
        payload: unknown;
        next: string[];
        refs: string[];
        clock: Clock;
        v: Number;
        key: string;
        identity: string;
        sig: string;
        hash: string;
        bytes: Uint8Array;
    };

    export const Entry: {
        create: (
            identity: Identity,
            id: string,
            payload: unknown,
            clock?: Clock,
            next?: string[],
            refs?: string[],
        ) => Promise<LogEntry>;
        verify: (identities: Identities, entry: LogEntry) => Promise<boolean>;
        decode: (bytes: Uint8Array) => Promise<LogEntry>;
        isEntry: (obj: object) => boolean;
        isEqual: (a: LogEntry, b: LogEntry) => boolean;
    };
}
