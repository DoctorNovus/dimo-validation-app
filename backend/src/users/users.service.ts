import { DimoService } from "@/dimo/dimo.service";
import { Inject, Injectable } from "@outwalk/firefly";

interface VehicleRawData {
  data: {
    vehicles: {
      nodes: VehicleData[]
    }
  }
}

interface VehicleData {
  tokenId: number;
  definition: VehicleDefinition;
}

interface VehicleDefinition {
  make: string;
  model: string;
  year: number;
}

@Injectable()
export class UsersService {

  @Inject() dimoService: DimoService;

  async getVehicles(address: string): Promise<VehicleData[]> {
      const dat = await this.dimoService.executeIdentityQuery(this.getVehicleQuery(address)) as unknown as VehicleRawData;
      return dat.data.vehicles.nodes;
  }

  getVehicleQuery(address: string) {
      return `
    query DevLicenseVehicles {
      vehicles(filterBy: { privileged: "${address}" }, first: 100) {
        nodes {
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