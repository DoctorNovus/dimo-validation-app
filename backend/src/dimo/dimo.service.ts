import { DIMO } from "@dimo-network/data-sdk";
import { Injectable } from "@outwalk/firefly";

interface QueryResultPermissions {
    data: {
        vehicle: {
            sacds: {
                nodes: PermissionRaw[]
            }
        }
    }
};

interface PermissionRaw {
    permissions: string,
    grantee: string
}

interface Permission {
    permissions: number[],
    grantee: string
}

@Injectable()
export class DimoService {

    identityURI = "https://identity-api.dimo.zone/query";
    telemetryURI = "https://telemetry-api.dimo.zone/query";
    dimo = new DIMO("Production");

    async executeIdentityQuery(query: string) {
        return await (await fetch(this.identityURI, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                query: query
            })
        })).json();
    }

    async executeTelemetryQuery(query: string) {
        return await (await fetch(this.telemetryURI, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                operationName: "DevLicenseVehicles",
                query: query
            })
        })).json();
    }

    async getToken() {
        return await this.dimo.auth.getToken({
            client_id: process.env.DIMO_CLIENT_ID,
            domain: process.env.DIMO_REDIRECT_URI,
            private_key: process.env.DIMO_CLIENT_KEY,
        });
    }

    async isVehicleGranted(id: number) {
        const perms = await this.getVehiclePermissions(id);
        for (const perm of perms) {
            if (perm.grantee == process.env.DIMO_CLIENT_ID) {
                if (perm.permissions.includes(1) && perm.permissions.includes(6))
                    return true;
            }
        }

        return false;
    }

    async getVehiclePermissions(id: number): Promise<Permission[]> {
        const perms = await this.executeIdentityQuery(this.getPermissionsQuery(id)) as unknown as QueryResultPermissions;

        return perms.data?.vehicle.sacds.nodes.map((perm: PermissionRaw) => {
            return {
                permissions: this.decodePermissionBits(perm.permissions),
                grantee: perm.grantee
            };
        });
    }

    decodePermissionBits(permissionHex: string): number[] {
        const cleanHex = permissionHex.toLowerCase().replace("0x", "");
        const permissionBits = BigInt(`0x${cleanHex}`);

        const grantedPermissions: number[] = [];

        for (let i = 0; i < 128; i++) {
            const bitPair = (permissionBits >> BigInt(i * 2)) & BigInt(0b11);
            if (bitPair === BigInt(0b11)) {
                grantedPermissions.push(i);
            }
        }

        return grantedPermissions;
    }

    getPermissionsQuery(id: number) {
        return `
        query {
            vehicle(tokenId: ${id}) {
                sacds(first: 100) {
                    nodes {
                        permissions
                      grantee
                    }
                }
            }
        }
    `;
    }
}