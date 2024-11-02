declare module "@orbitdb/storage" {
    import type { HeliaLibp2p } from "helia";

    export interface Storage {
        put;
        get;
        del;
        iterator;
        merge;
        clear;
        close;
    }

    export type IPFSBlockStorageOptions = {
        ipfs: HeliaLibp2p;
        pin: boolean;
        timeout: number;
    };

    export function IPFSBlockStorage(
        param: IPFSBlockStorageOptions,
    ): Promise<Storage>;

    export type LevelStorageOptions = {
        path: string;
        valueEncoding: string;
    };

    export function LevelStorage(param: LevelStorageOptions): Promise<Storage>;

    export type LRUStorageOptions = {
        size: string;
    };

    export function LRUStorge(param: LRUStorageOptions): Promise<Storage>;

    export function MemoryStorage(): Promise<Storage>;
}
