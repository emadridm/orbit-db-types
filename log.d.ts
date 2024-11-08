/// <reference path="identity.d.ts" />
/// <reference path="storage.d.ts" />
/// <reference path="clock.d.ts" />
/// <reference path="entry.d.ts" />
/// <reference path="access-controllers.d.ts" />

declare module "@orbitdb/log" {
    import type { IIdentity } from "@orbitdb/identity";
    import type { Clock } from "@orbitdb/clock";
    import type { LogEntry } from "@orbitdb/entry";
    import type { AccessController } from "@orbitdb/access-controllers";
    import type { IStorage } from "@orbitdb/storage";

    export type LogOptions = {
        logId: IIdentity;
        logHeads: Array<LogEntry>;
        access: AccessController;
        entryStorage: IStorage;
        headsStorage: IStorage;
        indexStorage: IStorage;
        sortFn: (a: LogEntry, b: LogEntry) => Promise<number>;
    };

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
}
