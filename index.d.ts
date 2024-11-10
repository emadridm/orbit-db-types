/// <reference path="./orbitdb.d.ts" />
/// <reference path="./databases.d.ts" />

declare module "@orbitdb/core" {
    export {
        default as createOrbitDB,
        IOrbitDB,
        OrbitDBOptions,
    } from "@orbitdb/orbitdb";

    export {
        IEventsDB,
        IDocumentsDB,
        Events,
        Documents,
    } from "@orbitdb/databases";
}
