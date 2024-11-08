declare module "@orbitdb/identity" {
    export interface IIdentity {
        id: string;
        publicKey: Object;
        signatures: {
            id: string;
            publicKey: string;
        };
        type: string;
        sign: (identity: IIdentity, data: string) => Promise<string>;
        verify: (
            signature: string,
            publicKey: string,
            data: string,
        ) => Promise<boolean>;
    }
}
