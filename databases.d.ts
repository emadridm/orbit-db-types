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
    export function Events(): (params: DatabaseOptions) => Promise<IEventsDB>;

    // Documents
    export interface IDocumentsDB extends IDatabase {
        put: (doc: object) => Promise<string>;
        del: (key: string) => Promise<string>;
        get: (key: string) => Promise<object>;
        query: (findFn: (arg: object) => boolean) => Promise<object[]>;
        iterator: (params?: {
            amount: string;
        }) => AsyncGenerator<
            { hash: string; key: string; doc: string },
            void,
            unknown
        >;
        indexBy: string;
        all: () => Promise<{ hash: string; key: string; doc: string }[]>;
    }
    export function Documents(param?: {
        indexBy: string;
    }): (params: DatabaseOptions) => Promise<IDocumentsDB>;

    // keyValue
    export interface IKeyValueDB extends IDatabase {
        put: (key: string, value: any) => Promise<string>;
        set: (key: string, value: any) => Promise<string>;
        del: (key: string) => Promise<string>;
        get: (key: string) => Promise<any>;
        iterator: (params?: {
            amount: string;
        }) => AsyncGenerator<
            { key: string; value: any; hash: string },
            void,
            unknown
        >;
        all: () => Promise<{ key: string; value: any; hash: string }[]>;
    }
    export function KeyValue(): (
        params: DatabaseOptions,
    ) => Promise<IKeyValueDB>;

    // keyValueIndexed
    export interface IKeyValueIndexedDB extends IKeyValueDB {
        close: () => Promise<void>;
        drop: () => Promise<void>;
    }
    export function KeyValueIndexed(): (
        params: DatabaseOptions,
    ) => Promise<IKeyValueIndexedDB>;

    export function useDatabaseType(database: IDatabase): void;
}
