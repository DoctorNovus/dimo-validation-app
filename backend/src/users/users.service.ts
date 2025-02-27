import { DimoService } from "@/dimo/dimo.service";
import { Inject, Injectable } from "@outwalk/firefly";

@Injectable()
export class UsersService {
    @Inject() dimoService: DimoService;

    async getVehicles(address: string) {
        return await this.dimoService.executeIdentityQuery(this.getVehicleQuery(address));
    }

    getVehicleQuery(address: string) {
        return `
        query DevLicenseVehicles {
            vehicles(filterBy: { privileged: "${address}" }, first: 100) {
              nodes {
                syntheticDevice {
                  id
                }
                aftermarketDevice {
                  id
                }
                tokenId
                definition {
                  make
                  model
                  year
                }
              },
              totalCount
            }
          }
        `;
    }
}