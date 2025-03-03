import { Controller, Get, Inject } from "@outwalk/firefly";
import { UsersService } from "./users.service";
import { DimoService } from "@/dimo/dimo.service";

@Controller()
export class UserController {

    @Inject() usersService: UsersService;
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
            if (granted)
                data.shared.push(vehicle);
            else
                data.notShared.push(vehicle);
        }

        return data;

        // const permissions = await this.dimoService.getVehiclePermissions();

    }

}