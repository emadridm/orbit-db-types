declare module "@orbitdb/storage" {
    import type { HeliaLibp2p } from "helia";

    export interface IStorage {
        put;
        get;
        del;
        iterator;
        merge;
        clear;
        close;
    }

    export interface IPFSBlockStorageOptions {
        ipfs: HeliaLibp2p<any>;
        pin: boolean;
        timeout: number;
    }

    export function IPFSBlockStorage(
        param: IPFSBlockStorageOptions,
    ): Promise<IStorage>;

    export interface LevelStorageOptions {
        path: string;
        valueEncoding: string;
    }

    export function LevelStorage(param: LevelStorageOptions): Promise<IStorage>;

    export interface LRUStorageOptions {
        size: string;
    }

    export function LRUStorge(param: LRUStorageOptions): Promise<IStorage>;

    export function MemoryStorage(): Promise<IStorage>;
}
