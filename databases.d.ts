/// <reference path="database.d.ts" />

declare module "@orbitdb/databases" {
    import type { DatabaseOptions, IDatabase } from "@orbitdb/database";

    // Events
    export interface IEventsDB extends IDatabase {
        add: (value: any) => Promise<string>;
        get: (hash: string) => Promise<any>;
        iterator: (params?: {
            gt?: string;
            gte?: string;
            lt?: string;
            lte?: string;
            amount?: string;
        }) => AsyncGenerator<{ hash: string; value: any }, void, unknown>;
        all: () => Promise<{ hash: string; value: any }[]>;
    }
    export function Events(params: DatabaseOptions): Promise<IEventsDB>;

    // Documents
    export interface IDocumentsDB extends IDatabase {
        put: (doc: object) => Promise<string>;
        del: (key: string) => Promise<string>;
    }

    export function Documents(params: DatabaseOptions): Promise<IDocumentsDB>;
}
