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
            vehicles(filterBy: { privileged: "0x49CdA1a1de49Bb4B52151652aF8469A0da53B678" }, first: 100) {
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