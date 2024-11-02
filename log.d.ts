declare module "@orbitdb/log" {
    import type { Identity } from "@orbitdb/identity";
    import type { Clock } from "@orbitdb/clock";
    import type { LogEntry } from "@orbitdb/entry";
    import type { AccessController } from "@orbitdb/access-controllers";
    import type { Storage } from "@orbitdb/storage";

    export type LogOptions = {
        logId: Identity;
        logHeads: Array<LogEntry>;
        access: AccessController;
        entryStorage: Storage;
        headsStorage: Storage;
        indexStorage: Storage;
        sortFn: (a: LogEntry, b: LogEntry) => Promise<number>;
    };

    export class Log {
        id: string;
        clock: Clock;
        heads: () => Promise<LogEntry[]>;
        traverse: () => AsyncGenerator<LogEntry, void, unknown>;
    }

    export function Log(identiy: Identity, options?: LogOptions): Promise<Log>;
}
