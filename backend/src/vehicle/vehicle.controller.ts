import { Controller, Get, Inject } from "@outwalk/firefly";
import { VehicleService } from "./vehicle.service";

@Controller()
export class VehicleController {

    @Inject() vehicleService: VehicleService;

    @Get("/:id")
    async getVehicleById({ params, query }) {
        const { id } = params;
        const { walletAddress, localizedUnit } = query;
        
        return await this.vehicleService.getVehicleById(parseInt(id), walletAddress, localizedUnit);
    }

    @Get("/:id/image")
    async getVehicleImageById({ params, query }) {
        const { id } = params;
        const { walletAddress } = query;

        return await this.vehicleService.getVehicleImage(parseInt(id), walletAddress);
    }

}