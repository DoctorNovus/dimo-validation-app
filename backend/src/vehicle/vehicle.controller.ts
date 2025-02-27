import { Controller, Get, Inject } from "@outwalk/firefly";
import { VehicleService } from "./vehicle.service";

@Controller()
export class VehicleController {

    @Inject() vehicleService: VehicleService;

    @Get("/:id")
    async getVehicleById({ params }) {
        const { id } = params;

        return await this.vehicleService.getVehicleById(parseInt(id));
    }

}