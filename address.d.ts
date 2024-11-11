declare module "@orbitdb/address" {
    export interface IOrbitDBAddress {
        protocol: string;
        hash: string;
        address: string;
        toString: () => string;
    }

    export function isValidAddress(address: IOrbitDBAddress | string): boolean;

    export function parseAddress(
        address: IOrbitDBAddress | string,
    ): IOrbitDBAddress;

    export default function OrbitDBAddress(
        address: IOrbitDBAddress | string,
    ): IOrbitDBAddress;
}
