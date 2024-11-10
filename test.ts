/// <reference path="index.d.ts" />

import { createHelia } from "helia";
import { createLibp2p } from "libp2p";
import { OrbitDBOptions, createOrbitDB } from "@orbitdb/core";
import { IEventsDB } from "@orbitdb/databases";

const libp2p = await createLibp2p();
const ipfs = await createHelia({ libp2p });

const options: OrbitDBOptions = {
    ipfs: ipfs,
};

const orbitdb = await createOrbitDB(options);
const mydb = await orbitdb.open<IEventsDB>("mydb");

const all = await mydb.all();

console.log(mydb.address);
