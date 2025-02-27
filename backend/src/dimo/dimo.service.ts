import { DIMO } from "@dimo-network/data-sdk";
import { Injectable } from "@outwalk/firefly";

@Injectable()
export class DimoService {
    apiURI = "https://identity-api.dimo.zone/query";
    dimo = new DIMO('Production');

    async executeIdentityQuery(query: string) {
        return await (await fetch(this.apiURI, {
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
}