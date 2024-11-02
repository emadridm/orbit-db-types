declare module "@orbitdb/identity" {
    export type Identity = {
        id: string;
        publicKey: Object;
        signatures: {
            id: string;
            publicKey: string;
        };
        type: string;
        sign: (identity: Identity, data: string) => Promise<string>;
        verify: (
            signature: string,
            publicKey: string,
            data: string,
        ) => Promise<boolean>;
    };
}
