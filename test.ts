import { createHelia } from "helia";
import { createLibp2p } from "libp2p";
import { OrbitDBOptions } from "@orbitdb/core";
import { createOrbitDB } from "@orbitdb/core";

const libp2p = await createLibp2p();
const ipfs = await createHelia({ libp2p });

const options: OrbitDBOptions = {
    ipfs: ipfs,
};

const orbitdb = await createOrbitDB(options);
const mydb = await orbitdb.open("mydb");
console.log(mydb.address);
await mydb.addOperation({ op: "add", key: null, value: "hola" });
