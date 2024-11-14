/// <reference path="./orbitdb.d.ts" />
/// <reference path="./databases.d.ts" />
/// <reference path="./address.d.ts" />
/// <reference path="./oplog.d.ts" />
/// <reference path="./database.d.ts" />
/// <reference path="./key-store.d.ts" />
/// <reference path="./identities.d.ts" />
/// <reference path="./storage.d.ts" />

declare module "@orbitdb/core" {
    export {
        default as createOrbitDB,
        IOrbitDB,
        OrbitDBOptions,
    } from "@orbitdb/orbitdb";

    export {
        // --- use with OrbitDB.open<T>() ---
        IEventsDB,
        IDocumentsDB,
        IKeyValueDB,
        IKeyValueIndexedDB,
        // ---------------------------------
        Events,
        Documents,
        KeyValue,
        KeyValueIndexed,
        useDatabaseType,
    } from "@orbitdb/databases";

    export { isValidAddress, parseAddress } from "@orbitdb/address";

    export {
        Log,
        LogEntry,
        Entry,
        DefaultAccessController,
    } from "@orbitdb/oplog";

    export { default as Database } from "@orbitdb/database";

    export { default as KeyStore } from "@orbitdb/key-store";

    export {
        useAccessController,
        IPFSAccessController,
        OrbitDBAccessController,
    } from "@orbitdb/access-controllers";

    export {
        Identities,
        isIdentity,
        useIdentityProvider,
        PublicKeyIdentityProvider,
    } from "@orbitdb/identities";

    export {
        IPFSBlockStorage,
        LevelStorage,
        LRUStorage,
        MemoryStorage,
        ComposedStorage,
    } from "@orbitdb/storage";
}
