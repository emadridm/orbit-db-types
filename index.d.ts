/// <reference path="./orbitdb.d.ts" />
/// <reference path="./databases.d.ts" />
/// <reference path="./address.d.ts" />

declare module "@orbitdb/core" {
    export {
        default as createOrbitDB,
        IOrbitDB,
        OrbitDBOptions,
    } from "@orbitdb/orbitdb";

    export {
        IEventsDB,
        IDocumentsDB,
        IKeyValueDB,
        IKeyValueIndexedDB,
        Events,
        Documents,
        KeyValue,
        KeyValueIndexed,
        useDatabaseType,
    } from "@orbitdb/databases";

    export { isValidAddress, parseAddress } from "@orbitdb/address";
}
