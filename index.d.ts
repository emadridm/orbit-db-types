declare module "@orbitdb/core" {
    import EventEmitter from "events";
    import type { IPFS } from "ipfs-core";
  
    export function Database(args: {
      ipfs: IPFS;
      identity?: Identity;
      address: string;
      name?: string;
      access?: AccessController;
      directory?: string;
      meta?: object;
      headsStorage?: Storage;
      entryStorage?: Storage;
      indexStorage?: Storage;
      referencesCount?: number;
      syncAutomatically?: boolean;
      onUpdate?: () => void;
    }): Promise<{
      type: string;
      addOperation: (args: {
        op: string;
        key: string | null;
        value: unknown;
      }) => Promise<string>;
      address: string;
      close(): Promise<void>;
      drop(): Promise<void>;
      events: EventEmitter;
      access: AccessController;
      log: Log;
    }>;
  
    export type Identity = {
      id: string;
      publicKey: string;
      signatures: {
        id: string;
        publicKey: string;
      };
      type: string;
      sign: (identity: Identity, data: string) => Promise<string>;
      verify: (
        signature: string,
        publicKey: string,
        data: string
      ) => Promise<boolean>;
    };
  
    export type OrbitDB = {
      id: string;
      open: (
        address: string,
        OrbitDBDatabaseOptions?
      ) => ReturnType<typeof Database>;
      stop;
      ipfs;
      directory;
      keystore;
      identity: Identity;
      peerId;
    };
    export function createOrbitDB(args: {
      ipfs: IPFS;
      directory: string;
    }): Promise<OrbitDB>;
  
    export function useAccessController(accessController: { type: string }): void;
    export function isValidAddress(address: unknown): boolean;
  
    export type Log = {
      id;
      clock: Clock;
      heads: () => Promise<Entry[]>;
      traverse: () => AsyncGenerator<Entry, void, unknown>;
    };

    export function AccessControllerGenerator({
      orbitdb,
      identities,
      address,
    }: {
      orbitdb: OrbitDB;
      identities: typeof Identities;
      address?: string;
    }): Promise<AccessController>;
  
    export class AccessController {
      type: string;
      address: string;
      canAppend: (entry: Entry) => Promise<boolean>;
    }
  
    export function useDatabaseType(type: { type: string }): void;
  
    export function IPFSAccessController(args: {
      write: string[];
      storage: Storage;
    }): (args: {
      orbitdb: OrbitDB;
      identities: typeof Identities;
      address: string;
    }) => Promise<{
      type: "ipfs";
      address: string;
      write: string[];
      canAppend: (entry: Entry) => Promise<boolean>;
    }>;
    export function Identities(args: {keystore?: KeyStoreType, path?: string, storage?: Storage, ipfs?: IPFS}): Promise<IdentitiesType>;
    export class IdentitiesType {
      createIdentity;
      getIdentity;
      verifyIdentity: (identity) => boolean;
      sign;
      verify;
      keystore;
    }
    export class Storage {
      put;
      get;
    }
    export function IPFSBlockStorage({
      ipfs: IPFS,
      pin: boolean,
    }): Promise<Storage>;
    export function LRUStorage({ size: number }): Promise<Storage>;
    export function ComposedStorage(...args: Storage[]): Promise<Storage>;
  
    export type OrbitDBDatabaseOptions = {
      type: string;
      AccessController?: typeof AccessControllerGenerator;
      syncAutomatically?: boolean;
    };
  
    export type Clock = {
      id: string;
      time: number;
    };
  
    export type Entry<T = unknown> = {
      id: string;
      payload: { op: string; key: string | null; value?: T };
      next: string[];
      refs: string[];
      clock: Clock;
      v: Number;
      key: string;
      identity: string;
      sig: string;
      hash: string;
    };

    export type KeyValue = {
        type: "keyvalue";
        address: string;
        put(key: string, value: unknown): Promise<string>;
        set: KeyValue["put"];
        del(key: string): Promise<string>;
        get(key: string): Promise<unknown | undefined>;
        all(): Promise<{ key: string; value: unknown; hash: string }[]>;
        close(): Promise<void>;
        drop(): Promise<void>;
        events: EventEmitter;
        access: AccessController;
        log: Log;
      };

      export function KeyStore (args: {storage?: Storage, path?: string}): Promise<KeyStoreType>;

      export type KeyStoreType = {
        clear,
        close,
        hasKey,
        addKey,
        createKey,
        getKey,
        getPublic
      }
  }
  