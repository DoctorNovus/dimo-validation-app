import { Controller, Get, Inject } from "@outwalk/firefly";
import { UsersService } from "./users.service";
import { DimoService } from "@/dimo/dimo.service";
import { VehicleService } from "@/vehicle/vehicle.service";

@Controller()
export class UserController {

    @Inject() usersService: UsersService;
    @Inject() vehicleService: VehicleService;
    @Inject() dimoService: DimoService;

    @Get()
    getHelloWorld() {
        return "Hello World";
    }

    @Get("/:address/vehicles")
    async getUserVehicles({ params }) {
        const { address } = params;
        
        const vehicles = await this.usersService.getVehicles(address);

        const data = {
            shared: [],
            notShared: []
        };

        for (const vehicle of vehicles) {
            const granted = await this.dimoService.isVehicleGranted(vehicle.tokenId);

            if (granted) {
                const vin = await this.vehicleService.getVehicleVIN(vehicle.tokenId, address);
                data.shared.push({ ...vehicle, vin });
            }
            else
                data.notShared.push(vehicle);
        }

        return data;

        // const permissions = await this.dimoService.getVehiclePermissions();

    }

}