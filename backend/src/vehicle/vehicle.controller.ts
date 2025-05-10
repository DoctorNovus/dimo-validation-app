import { Controller, Get, Inject } from "@outwalk/firefly";
import { VehicleService } from "./vehicle.service";
import { Unauthorized } from "@outwalk/firefly/errors";

@Controller()
export class VehicleController {

    @Inject() vehicleService: VehicleService;

    @Get("/:id")
    async getVehicleById({ params, query }) {
        const { id } = params;
        const { walletAddress, region } = query;

        if (!this.vehicleService.isAuthenticated(id, walletAddress)) throw new Unauthorized();

        return await this.vehicleService.getVehicleById(parseInt(id), region);
    }

    @Get("/:id/image")
    async getVehicleImageById({ params, query }) {
        const { id } = params;
        const { walletAddress } = query;

        if (!this.vehicleService.isAuthenticated(id, walletAddress)) throw new Unauthorized();

        return await this.vehicleService.getVehicleImage(parseInt(id));
    }

    @Get("/:id/vin")
    async getVehicleVIN({ params, query }) {
        const { id } = params;
        const { walletAddress } = query;

        if (!this.vehicleService.isAuthenticated(id, walletAddress)) throw new Unauthorized();

        return await this.vehicleService.getVehicleVIN(parseInt(id));
    }
}