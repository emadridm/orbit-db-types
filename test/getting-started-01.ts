/// <reference path="../index.d.ts" />

import { createLibp2p } from "libp2p";
import { createHelia } from "helia";
import { createOrbitDB } from "@orbitdb/core";
import { LevelBlockstore } from "blockstore-level";
import { Libp2pOptions } from "./libp2p-config";
import { IEventsDB } from "@orbitdb/databases";

// Create an IPFS instance
const blockstore = new LevelBlockstore("./ipfs/blocks");
const libp2p = await createLibp2p(Libp2pOptions);
const ipfs = await createHelia({ libp2p, blockstore });

const orbitdb = await createOrbitDB({ ipfs });
// By default OrbitDB opens an Events database type
const db = await orbitdb.open<IEventsDB>("my-db");

console.log("my-db address: ", db.address);

// Add son records to the db
await db.add("hello world 1");
await db.add("hello world 2");

// print out the about records
console.log(await db.all());

// Close your db and stop OrbitDB and IPFS
await db.close();
await orbitdb.stop();
await ipfs.stop();
