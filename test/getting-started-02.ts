/// <reference path="../index.d.ts" />

import { createLibp2p } from "libp2p";
import { createHelia } from "helia";
import { createOrbitDB, IPFSAccessController } from "@orbitdb/core";
import { LevelBlockstore } from "blockstore-level";
import { Libp2pOptions } from "./libp2p-config";
import { IEventsDB } from "@orbitdb/databases";
import { LogEntry } from "@orbitdb/oplog";

const main = async () => {
    let randDir = (Math.random() + 1).toString(36).substring(2);

    const blockstore = new LevelBlockstore(`${randDir}/ipfs/blocks`);
    const libp2p = await createLibp2p(Libp2pOptions);
    const ipfs = await createHelia({ libp2p, blockstore });

    console.log(`ipfs.libp2p.peerId = ${ipfs.libp2p.peerId}`);

    const orbitdb = await createOrbitDB({
        ipfs,
        directory: `./${randDir}/orbitdb`,
    });

    let db: IEventsDB;

    if (process.argv[2]) {
        console.log(`Opeing database ${process.argv[2]}`);
        db = await orbitdb.open(process.argv[2]);
    } else {
        db = await orbitdb.open("my-db", {
            AccessController: IPFSAccessController({ write: ["*"] }),
        });

        console.log(
            "my-db address",
            "(copy my db address and use when launching peer 2)",
            db.address,
        );
    }

    db.events.on("update", async (entry: LogEntry) => {
        //@ts-ignore payload a type of dag-cbor. View https://ipld.io/, https://github.com/ipld/js-dag-cbor, https://www.npmjs.com/package/@types/cbor-js
        console.log("update", entry.payload.value);
    });

    if (process.argv[2]) {
        await db.add("hello from second peer");
        await db.add("hello again from second peer");
    } else {
        await db.add("hello from first peer");
        await db.add("hello again from first peer");
    }

    process.on("SIGINT", async () => {
        console.log((await db.all()).map((e) => e.value));
        await db.close();
        await orbitdb.stop();
        await ipfs.stop();
    });
};

main();
